import { transitionAnimation } from 'src/app/directives/animation.directive';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IDictionaryManager, ITHV } from 'interfaces/ioverall-config';
import { DialogService } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { ListManagerService } from 'services/list-manager.service';
import { OutputManagerService } from 'services/output-manager.service';
import { SearchService } from 'services/search.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';

@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.scss'],
  animations: [transitionAnimation]
})
export class ProComponent extends AllListsFactory {

  zoneDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  deleteDictionary: IDictionaryManager[] = [];
  highLowStateDictionary: IDictionaryManager[] = [];

  readingPeriodDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  counterStateByZoneIdDictionary: IDictionaryManager[] = [];
  counterReportDictionary: IDictionaryManager[] = [];
  fragmentMasterIds: IDictionaryManager[] = [];
  masrafState: ITHV[] = []
  eslahType: any[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public searchService: SearchService,
    private outputManagerService: OutputManagerService,
    private dateJalaliService: DateJalaliService,
    public dialogService: DialogService,
    public listManagerService: ListManagerService
  ) {
    super(dialogService, listManagerService);
  }

  callApi = async () => {
    if (this.closeTabService.saveDataForSearchProReq.zoneId) {
      this.closeTabService.saveDataForSearchPro = await this.searchService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ListSearchPro, this.closeTabService.saveDataForSearchProReq);
      this.listManagerService.makeHadPicturesToBoolean(this.closeTabService.saveDataForSearchPro);
      this.getNesseseriesByZone();
    }
    else {
      this.listManagerService.showSnackWarn(EN_messages.insert_zone);
    }
  }
  emptyPreviousValuesFromSelectOptions = () => {
    this.closeTabService.saveDataForSearchProReq.masrafStates = [];
    this.closeTabService.saveDataForSearchProReq.reportIds = [];
    this.closeTabService.saveDataForSearchProReq.counterStateIds = [];
    this.closeTabService.saveDataForSearchProReq.karbariCodes = [];
    this.closeTabService.saveDataForSearchProReq.fragmentMasterIds = [];
  }
  getNesseseriesByZone = async () => {
    const _zone = this.closeTabService.saveDataForSearchProReq.zoneId;
    if (!_zone) {
      this.counterStateDictionary = await this.searchService.dictionaryWrapperService.getCounterStateDictionary();
    }
    else {
      this.fragmentMasterIds = await this.searchService.dictionaryWrapperService.getFragmentMasterByZoneIdDictionary(_zone);
      this.counterReportDictionary = await this.searchService.dictionaryWrapperService.getCounterReportByZoneIdDictionary(_zone);
      this.counterStateByZoneIdDictionary = await this.searchService.dictionaryWrapperService.getCounterStateByZoneIdDictionary(_zone);
      this.counterStateDictionary = await this.searchService.dictionaryWrapperService.getCounterStateByZoneIdDictionary(_zone);
      this.counterStateByCodeDictionary = await this.searchService.dictionaryWrapperService.getCounterStateByCodeDictionary(_zone);
    }

    this.deleteDictionary = this.listManagerService.getDeleteDictionary();
    this.highLowStateDictionary = this.listManagerService.getHighLowDictionary();
    this.masrafState = this.searchService.getMasrafStates();
    this.qotrDictionary = await this.searchService.dictionaryWrapperService.getQotrDictionary();
    this.karbariDictionaryCode = await this.searchService.dictionaryWrapperService.getkarbariCodeDictionary();

    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.deleteDictionary, 'hazf');
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.zoneDictionary, 'zoneId');
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.karbariDictionaryCode, 'possibleKarbariCode');
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.qotrDictionary, 'qotrCode');
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.counterStateDictionary, 'counterStateId');
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.eslahType, 'eslahType');
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.counterStateByCodeDictionary, 'preCounterStateCode');
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchMoshtarakin, this.highLowStateDictionary, 'highLowStateId');

    this.listManagerService.setDynamicPartRanges(this.closeTabService.saveDataForSearchPro);
    this.searchService.makeHadPicturesToBoolean(this.closeTabService.saveDataForSearchPro);
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForSearchPro = null;
    }
    if (this.closeTabService.saveDataForSearchMoshtarakin) {
      this.getNesseseriesByZone();
    }
    this.getNesseseriesByZone();
    this.getReadingPeriod();
    this.zoneDictionary = await this.searchService.dictionaryWrapperService.getZoneDictionary();
    this.karbariDictionary = await this.searchService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.readingPeriodKindDictionary = await this.searchService.dictionaryWrapperService.getPeriodKindDictionary();
    this.closeTabService.getSearchInOrderTo();
    this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this.eslahType = this.listManagerService.getOffloadModifyTypeSimple();
  }
  getReadingPeriod = async () => {
    const a = this.closeTabService.saveDataForSearchProReq._selectedKindId;
    if (a)
      this.readingPeriodDictionary = await this.searchService.dictionaryWrapperService.getReadingPeriodDictionaryByZoneAndKind(this.closeTabService.saveDataForSearchProReq.zoneId, +a);
  }
  async connectToServer() {
    if (this.searchService.verificationPro(this.closeTabService.saveDataForSearchProReq, this.closeTabService._isOrderByDate)) {
      if (document.activeElement.id == 'excel_download') {
        this.outputManagerService.saveAsExcelABuffer(await this.searchService.ajaxReqWrapperService.postBlob(ENInterfaces.ListGetProExcel, this.closeTabService.saveDataForSearchProReq), this.dateJalaliService.getCurrentDate());
      }
      else {
        this.callApi();
      }
    }
  }
  receiveFromDateJalali = ($event: string) => {
    this.closeTabService.saveDataForSearchProReq.fromDate = $event;
  }
  receiveToDateJalali = ($event: string) => {
    this.closeTabService.saveDataForSearchProReq.toDate = $event;
  }


}
