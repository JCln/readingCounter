import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IDictionaryManager, ITHV, ITitleValue } from 'interfaces/ioverall-config';
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
  styleUrls: ['./pro.component.scss']
})
export class ProComponent extends AllListsFactory {

  zoneDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  deleteDictionary: IDictionaryManager[] = [];

  readingPeriodDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  counterStateByZoneIdDictionary: IDictionaryManager[] = [];
  counterReportDictionary: IDictionaryManager[] = [];
  fragmentMasterIds: IDictionaryManager[] = [];
  masrafState: ITHV[] = []
  _years: ITitleValue[] = [];
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
      this.closeTabService.saveDataForSearchPro = await this.searchService.doSearch(ENInterfaces.ListSearchPro, this.closeTabService.saveDataForSearchProReq);
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
      this.counterStateDictionary = await this.searchService.getCounterStateDictionary();
    }
    else {
      this.fragmentMasterIds = await this.searchService.getFragmentMasterDictionary(_zone);
      this.counterReportDictionary = await this.searchService.getCounterReportByZoneDictionary(_zone);
      this.counterStateByZoneIdDictionary = await this.searchService.getCounterStateByZoneDictionary(_zone);
      this.counterStateDictionary = await this.searchService.getCounterStateByZoneDictionary(_zone);
      this.counterStateByCodeDictionary = await this.searchService.getCounterStateByCodeDictionary(_zone);
    }

    this.deleteDictionary = this.listManagerService.getDeleteDictionary();
    this.masrafState = this.searchService.getMasrafStates();
    this.qotrDictionary = await this.searchService.getQotrDictionary();
    this.karbariDictionaryCode = await this.searchService.getKarbariDictionaryCode();

    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.deleteDictionary, 'hazf');
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.zoneDictionary, 'zoneId');
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.karbariDictionaryCode, 'possibleKarbariCode');
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.qotrDictionary, 'qotrCode');
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.counterStateDictionary, 'counterStateId');
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.eslahType, 'eslahType');
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.counterStateByCodeDictionary, 'preCounterStateCode');

    this.searchService.setDynamicPartRanges(this.closeTabService.saveDataForSearchPro);
    this.searchService.makeHadPicturesToBoolean(this.closeTabService.saveDataForSearchPro);
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForSearchPro = null;
    }
    if (this.closeTabService.saveDataForSearchMoshtarakin) {
      this.getNesseseriesByZone();
    }
    this._years = this.searchService.getYears();
    this.getReadingPeriod();
    this.zoneDictionary = await this.searchService.getZoneDictionary();
    this.karbariDictionary = await this.searchService.getKarbariDictionaryCode();
    this.readingPeriodKindDictionary = await this.searchService.getReadingPeriodKindDictionary();
    this.searchService.getSearchInOrderTo();
    this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this.eslahType = this.listManagerService.getOffloadModifyTypeSimple();
  }
  getReadingPeriod = async () => {
    const a = this.closeTabService.saveDataForSearchProReq._selectedKindId;
    if (a)
      this.readingPeriodDictionary = await this.searchService.getReadingPeriodDictionary(a);
  }
  async connectToServer() {
    if (this.searchService.verificationPro(this.closeTabService.saveDataForSearchProReq, this.searchService._isOrderByDate)) {
      if (document.activeElement.id == 'excel_download') {
        this.outputManagerService.saveAsExcelABuffer(await this.searchService.getProExcel(ENInterfaces.ListGetProExcel, this.closeTabService.saveDataForSearchProReq), this.dateJalaliService.getCurrentDate());
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