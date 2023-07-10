import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IReadingConfigDefault } from 'interfaces/iimports';
import { IDictionaryManager, ITHV } from 'interfaces/ioverall-config';
import { DialogService } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { ListManagerService } from 'services/list-manager.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { transitionAnimation } from 'src/app/directives/animation.directive';

import { MapDgComponent } from '../../manage/list-manager/all/map-dg/map-dg.component';

@Component({
  selector: 'app-assess-pre',
  templateUrl: './assess-pre.component.html',
  styleUrls: ['./assess-pre.component.scss'],
  animations: [transitionAnimation]
})
export class AssessPreComponent extends AllListsFactory {

  readingConfigDefault: IReadingConfigDefault;
  masrafState: ITHV[] = []

  zoneDictionary: IDictionaryManager[] = [];
  deleteDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  counterReportDictionary: IDictionaryManager[] = [];

  userCounterReaderDictionary: IDictionaryManager[] = [];
  _canShowAssessButton: boolean = true;

  constructor(
    public closeTabService: CloseTabService,
    public importDynamicService: ImportDynamicService,
    public listManagerService: ListManagerService,
    public dialogService: DialogService,
  ) {
    super(dialogService, listManagerService);
  }

  insertReadingConfigDefaults = (rcd: IReadingConfigDefault) => {
    this.importDynamicService._assessAddReq.hasPreNumber = rcd.defaultHasPreNumber;
    this.importDynamicService._assessAddReq.displayBillId = rcd.displayBillId;
    this.importDynamicService._assessAddReq.displayRadif = rcd.displayRadif;
    this.importDynamicService._assessAddReq.alalHesabPercent = rcd.defaultAlalHesab;
    this.importDynamicService._assessAddReq.imagePercent = rcd.defaultImagePercent;
  }
  converts = () => {
    this.closeTabService.saveDataForAssessPre =
      Converter.convertIdsToTitles(
        this.closeTabService.saveDataForAssessPre,
        {
          deleteDictionary: this.deleteDictionary,
          zoneDictionary: this.zoneDictionary,
          counterStateDictionary: this.counterStateDictionary,
          counterStateByCodeDictionary: this.counterStateByCodeDictionary,
          karbariDictionaryCode: this.karbariDictionaryCode,
          qotrDictionary: this.qotrDictionary,
        },
        {
          hazf: 'hazf',
          zoneId: 'zoneId',
          counterStateId: 'counterStateId',
          preCounterStateCode: 'preCounterStateCode',
          possibleKarbariCode: 'possibleKarbariCode',
          qotrCode: 'qotrCode'
        })
    Converter.convertIdToTitle(this.closeTabService.saveDataForAssessPre, this.karbariDictionaryCode, 'karbariCode');

    this.importDynamicService.setDynamicPartRanges(this.closeTabService.saveDataForAssessPre);
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForAssessPre = await this.importDynamicService.postBodyServer(ENInterfaces.postSimafaAssessPre, this.closeTabService.saveDataForAssessPreReq);
    this.makeDataSourceOptionsChecked();

    this.karbariDictionaryCode = await this.importDynamicService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.qotrDictionary = await this.importDynamicService.dictionaryWrapperService.getQotrDictionary();

    this.getMasterInZone();
    this.converts();
    this.insertReadingConfigDefaults(this.readingConfigDefault);
    this.importDynamicService.makeHadPicturesToBoolean(this.closeTabService.saveDataForAssessPre);
  }
  refreshTable = () => {
    this.connectToServer();
  };
  nullSavedSource = () => this.closeTabService.saveDataForAssessPre = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForAssessPre = null;
    }
    this.getMasterInZone();
  }
  getMasterInZone = async () => {
    this.deleteDictionary = this.listManagerService.getDeleteDictionary();
    this.zoneDictionary = await this.importDynamicService.dictionaryWrapperService.getZoneDictionary();
    this.masrafState = this.importDynamicService.getMasrafStates();
    this.karbariDictionary = await this.importDynamicService.dictionaryWrapperService.getkarbariCodeDictionary();

    if (this.closeTabService.saveDataForAssessPreReq.zoneId) {
      this.userCounterReaderDictionary = await this.importDynamicService.dictionaryWrapperService.getUserCounterReaderDictionary(this.closeTabService.saveDataForAssessPreReq.zoneId);
      this.readingConfigDefault = await this.importDynamicService.dictionaryWrapperService.getReadingConfigDefaultByZoneIdDictionary(this.closeTabService.saveDataForAssessPreReq.zoneId);
      this.counterStateDictionary = await this.importDynamicService.dictionaryWrapperService.getCounterStateByZoneIdDictionary(this.closeTabService.saveDataForAssessPreReq.zoneId);
      this.counterStateByCodeDictionary = await this.importDynamicService.dictionaryWrapperService.getCounterStateByCodeDictionary(this.closeTabService.saveDataForAssessPreReq.zoneId);
      this.counterReportDictionary = await this.importDynamicService.dictionaryWrapperService.getCounterReportByZoneIdDictionary(this.closeTabService.saveDataForAssessPreReq.zoneId);
    }
  }
  editCloseData() {
    this.closeTabService.saveDataForAssessPreReq.listNumber = MathS.trimation(this.closeTabService.saveDataForAssessPreReq.listNumber);
    if (this.importDynamicService.verificationAssessPre(this.closeTabService.saveDataForAssessPreReq))
      this.connectToServer();
  }
  getOnOffLoadIdsFromDataSource = () => {
    let a: any[] = [];
    this.closeTabService.saveDataForAssessPre.map(item => {
      if (item.isSelected)
        a.push(item.id);
    })
    this.importDynamicService._assessAddReq.onOffLoadIds = a;
  }
  registerAssessAdd = async () => {
    if (this.importDynamicService.verificationReadingConfigDefault(this.readingConfigDefault, this.importDynamicService._assessAddReq)) {
      this.getOnOffLoadIdsFromDataSource();
      if (this.importDynamicService.verificationAssessAdd(this.importDynamicService._assessAddReq)) {
        this.importDynamicService.showResDialog(await this.importDynamicService.postBodyServer(ENInterfaces.postSimafaAssessAdd, this.importDynamicService._assessAddReq), false, EN_messages.importDynamic_created);
        this._canShowAssessButton = false;
      }
    }
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
    this.closeTabService.saveDataForAssessPre.forEach(item => {
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
  emptyPreviousValuesFromSelectOptions() {
    this.closeTabService.saveDataForAssessPreReq.masrafStates = [];
    this.closeTabService.saveDataForAssessPreReq.reportIds = [];
    this.closeTabService.saveDataForAssessPreReq.counterStateIds = [];
    this.closeTabService.saveDataForAssessPreReq.karbariCodes = [];
  }

}
