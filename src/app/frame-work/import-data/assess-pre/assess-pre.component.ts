import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IReadingConfigDefault } from 'interfaces/iimports';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IDictionaryManager, ITHV } from 'interfaces/ioverall-config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { ListManagerService } from 'services/list-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

import { MapDgComponent } from '../../manage/list-manager/all/map-dg/map-dg.component';

@Component({
  selector: 'app-assess-pre',
  templateUrl: './assess-pre.component.html',
  styleUrls: ['./assess-pre.component.scss']
})
export class AssessPreComponent extends FactoryONE {

  readingConfigDefault: IReadingConfigDefault;
  masrafState: ITHV[] = []
  dataSource: IOnOffLoadFlat[] = [];
  ref: DynamicDialogRef;

  zoneDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  counterReportDictionary: IDictionaryManager[] = [];
  counterStateByZoneIdDictionary: IDictionaryManager[] = [];

  userCounterReaderDictionary: IDictionaryManager[] = [];
  _canShowAssessButton: boolean = true;

  constructor(
    public closeTabService: CloseTabService,
    public importDynamicService: ImportDynamicService,
    private listManagerService: ListManagerService,
    private dialogService: DialogService,
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
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    Converter.convertIdToTitle(this.dataSource, this.counterStateDictionary, 'counterStateId');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'counterStateCode');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'possibleKarbariCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');

    this.importDynamicService.setDynamicPartRanges(this.dataSource);
  }
  connectToServer = async () => {
    this.dataSource = await this.importDynamicService.postAssess(ENInterfaces.postSimafaAssessPre, this.closeTabService.saveDataForAssessPreReq);
    this.makeDataSourceOptionsChecked();

    this.karbariDictionaryCode = await this.importDynamicService.getKarbariByCodeDictionary();
    this.qotrDictionary = await this.importDynamicService.getQotrDictionary();

    this.getMasterInZone();
    this.converts();
    this.insertReadingConfigDefaults(this.readingConfigDefault);
    this.importDynamicService.makeHadPicturesToBoolean(this.dataSource);

    this.closeTabService.saveDataForAssessPre = this.dataSource;
  }
  nullSavedSource = () => this.closeTabService.saveDataForAssessPre = null;
  canOpenSearchDialog = () => {
    if (MathS.isNull(this.closeTabService.saveDataForAssessPreReq.listNumber)) {
      this.importDynamicService.snackMessage(EN_messages.insert_listNumber);
      return false;
    }
    this.closeTabService.saveDataForAssessPreReq.listNumber = MathS.trimation(this.closeTabService.saveDataForAssessPreReq.listNumber);
    return true;
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForAssessPre = null;
      this.closeTabService.saveDataForAssessPreReq = null;
    }
    if (this.closeTabService.saveDataForAssessPre) {
      this.dataSource = this.closeTabService.saveDataForAssessPre;
    }

    this.getMasterInZone();
  }
  getMasterInZone = async () => {
    this.zoneDictionary = await this.importDynamicService.getZoneDictionary();
    this.masrafState = this.importDynamicService.getMasrafStates();
    this.karbariDictionary = await this.importDynamicService.getKarbariDictionary();

    if (this.closeTabService.saveDataForAssessPreReq.zoneId) {
      this.userCounterReaderDictionary = await this.importDynamicService.getUserCounterReaders(this.closeTabService.saveDataForAssessPreReq.zoneId);
      this.readingConfigDefault = await this.importDynamicService.getReadingConfigDefaults(this.closeTabService.saveDataForAssessPreReq.zoneId);
      this.counterStateDictionary = await this.importDynamicService.getCounterStateByZoneDictionary(this.closeTabService.saveDataForAssessPreReq.zoneId);
      this.counterStateByCodeDictionary = await this.importDynamicService.getCounterStateByCodeDictionary(this.closeTabService.saveDataForAssessPreReq.zoneId);
      this.counterReportDictionary = await this.importDynamicService.getCounterReportByZoneDictionary(this.closeTabService.saveDataForAssessPreReq.zoneId);
      this.counterStateByZoneIdDictionary = await this.importDynamicService.getCounterStateByZoneDictionary(this.closeTabService.saveDataForAssessPreReq.zoneId);
    }
  }
  editCloseData() {
    this.closeTabService.saveDataForAssessPreReq.listNumber = MathS.trimation(this.closeTabService.saveDataForAssessPreReq.listNumber);
    if (this.importDynamicService.verificationAssessPre(this.closeTabService.saveDataForAssessPreReq))
      this.connectToServer();
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
      this.importDynamicService.showCheckboxDialog(a, false, EN_messages.insert_rrDetails);
      return;
    }
    this.importDynamicService.snackEmptyValue();
  }
  makeDataSourceOptionsChecked = () => {
    this.dataSource.forEach(item => {
      item.isSelected = true;
    })
  }
  openMapDialog = (dataSource: any) => {
    if (this.listManagerService.showInMapSingleValidation(dataSource))
      this.ref = this.dialogService.open(MapDgComponent, {
        data: dataSource,
        rtl: true,
        width: '70%'
      })
    this.ref.onClose.subscribe(async res => {
      if (res)
        this.refreshTable();
    });
  }

}
