import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IAssessPreDisplayDtoSimafa, IReadingConfigDefault } from 'interfaces/iimports';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

import { AssesspreDgComponent } from './assesspre-dg/assesspre-dg.component';

@Component({
  selector: 'app-assess-pre',
  templateUrl: './assess-pre.component.html',
  styleUrls: ['./assess-pre.component.scss']
})
export class AssessPreComponent extends FactoryONE {

  _empty_message: string = '';

  _selectCols: any[] = [];
  _selectedColumns: any[];

  readingConfigDefault: IReadingConfigDefault;
  dataSource: IOnOffLoadFlat[] = [];
  assessPreReq: IAssessPreDisplayDtoSimafa;
  zoneDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  userCounterReaderDictionary: IDictionaryManager[] = [];
  ref: DynamicDialogRef;
  _canShowAssessButton: boolean = true;

  constructor(
    private closeTabService: CloseTabService,
    public importDynamicService: ImportDynamicService,
    private dialogService: DialogService
  ) {
    super();
  }

  insertReadingConfigDefaults = (rcd: IReadingConfigDefault) => {
    this.importDynamicService._assessAddReq.hasPreNumber = rcd.defaultHasPreNumber;
    this.importDynamicService._assessAddReq.displayBillId = rcd.displayBillId;
    this.importDynamicService._assessAddReq.displayRadif = rcd.displayRadif;
    this.importDynamicService._assessAddReq.alalHesabPercent = rcd.defaultAlalHesab;
    this.importDynamicService._assessAddReq.imagePercent = rcd.defaultImagePercent;
  }
  converts = () => {
    this._empty_message = EN_messages.notFound;
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    Converter.convertIdToTitle(this.dataSource, this.counterStateDictionary, 'counterStateId');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'counterStateCode');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');

    this.importDynamicService.setDynamicPartRanges(this.dataSource);
  }
  connectToServer = async () => {
    this.dataSource = await this.importDynamicService.postAssess(ENInterfaces.postSimafaAssessPre, this.assessPreReq);
    this.makeDataSourceOptionsChecked();
    this.userCounterReaderDictionary = await this.importDynamicService.getUserCounterReaders(this.assessPreReq.zoneId);
    this.readingConfigDefault = await this.importDynamicService.getReadingConfigDefaults(this.assessPreReq.zoneId);
    this.counterStateDictionary = await this.importDynamicService.getCounterStateByZoneDictionary(this.assessPreReq.zoneId);
    this.counterStateByCodeDictionary = await this.importDynamicService.getCounterStateByCodeDictionary(this.assessPreReq.zoneId);
    this.karbariDictionary = await this.importDynamicService.getKarbariDictionary();
    this.karbariDictionary = await this.importDynamicService.getKarbariByCodeDictionary();
    this.qotrDictionary = await this.importDynamicService.getQotrDictionary();

    this.converts();
    this.insertReadingConfigDefaults(this.readingConfigDefault);
    this.importDynamicService.makeHadPicturesToBoolean(this.dataSource);

    this.closeTabService.saveDataForAssessPre = this.dataSource;
  }
  nullSavedSource = () => this.closeTabService.saveDataForAssessPre = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
      // is there any value to call apis
      if (this.importDynamicService.AssessPreReq.listNumber !== '') {
        this.connectToServer();
        return;
      }
    }
    if (MathS.isNull(this.closeTabService.saveDataForAssessPre)) {
      this.showSearchOptionsDialog();
    }
    else {
      this.dataSource = this.closeTabService.saveDataForAssessPre;
    }
    this.converts();
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  toDefaultVals = () => {
    this.dataSource = [];
  }

  showSearchOptionsDialog = () => {
    this.ref = this.dialogService.open(AssesspreDgComponent, {
      rtl: true,
      width: '90%'
    })
    this.ref.onClose.subscribe((res: IAssessPreDisplayDtoSimafa) => {
      if (res) {
        this.assessPreReq = res;
        this.connectToServer();
      }
    });
  }
  getOnOffLoadIdsFromDataSource = () => {
    let a: any[] = [];
    this.dataSource.map(item => {
      if (item.isSelected)
        a.push(item.id);
    })
    this.importDynamicService._assessAddReq.onOffLoadIds = a;
  }
  registerAssessAdd = async () => {
    if (!this.importDynamicService.verificationReadingConfigDefault(this.readingConfigDefault, this.importDynamicService._assessAddReq))
      return;
    this.getOnOffLoadIdsFromDataSource();
    if (!this.importDynamicService.verificationAssessAdd(this.importDynamicService._assessAddReq))
      return;
    this.importDynamicService.showResDialog(await this.importDynamicService.postAssess(ENInterfaces.postSimafaAssessAdd, this.importDynamicService._assessAddReq), false, EN_messages.importDynamic_created);
    this._canShowAssessButton = false;
  }
  getReadingReportTitles = async ($event) => {
    const a = await this.importDynamicService.postById(ENInterfaces.ReadingReportTitles, $event)
    if (a.length) {
      this.importDynamicService.showResDialog(a, false, EN_messages.insert_rrDetails);
      return;
    }
    this.importDynamicService.snackEmptyValue();
  }
  makeDataSourceOptionsChecked = () => {
    this.dataSource.forEach(item => {
      item.isSelected = true;
    })
  }
}
