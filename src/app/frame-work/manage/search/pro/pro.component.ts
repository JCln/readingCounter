import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
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

  dataSource: IOnOffLoadFlat[] = [];
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
  fragmentMasterIds: any[] = [];
  masrafState: ITHV[] = []
  _selectedZone: any;
  _years: ITitleValue[] = [];

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
      this.dataSource = await this.searchService.doSearch(ENInterfaces.ListSearchPro, this.closeTabService.saveDataForSearchProReq);
      this.listManagerService.makeHadPicturesToBoolean(this.dataSource);
      this.closeTabService.saveDataForSearchPro = this.dataSource;
      this.getNesseseriesByZone();
    }
    else {
      this.listManagerService.showSnackWarn(EN_messages.insert_zone);
    }
  }
  getNesseseriesByZone = async () => {
    if (!this._selectedZone) {
      if (this.closeTabService.saveDataForSearchProReq.zoneId) {
        this._selectedZone = this.closeTabService.saveDataForSearchProReq.zoneId;
      }
    }
    if (this._selectedZone) {
      // add latest zone value to "_selectedZone"
      this.closeTabService.saveDataForSearchProReq.zoneId = this._selectedZone;
      this.fragmentMasterIds = await this.searchService.getFragmentMasterDictionary(this._selectedZone);
      this.counterReportDictionary = await this.searchService.getCounterReportByZoneDictionary(this._selectedZone);
      this.counterStateByZoneIdDictionary = await this.searchService.getCounterStateByZoneDictionary(this._selectedZone);
      this.counterStateDictionary = await this.searchService.getCounterStateByZoneDictionary(this._selectedZone);
      this.counterStateByCodeDictionary = await this.searchService.getCounterStateByCodeDictionary(this._selectedZone);
      Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
    }
    else {
      this.counterStateDictionary = await this.searchService.getCounterStateDictionary();
    }
    this.deleteDictionary = this.listManagerService.getDeleteDictionary();
    this.zoneDictionary = await this.searchService.getZoneDictionary();
    this.readingPeriodKindDictionary = await this.searchService.getReadingPeriodKindDictionary();
    this.karbariDictionaryCode = await this.searchService.getKarbariDictionaryCode();
    this.karbariDictionary = await this.searchService.getKarbariDictionaryCode();
    this.qotrDictionary = await this.searchService.getQotrDictionary();

    Converter.convertIdToTitle(this.dataSource, this.deleteDictionary, 'hazf');
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'possibleKarbariCode');
    Converter.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');
    Converter.convertIdToTitle(this.dataSource, this.counterStateDictionary, 'counterStateId');

    this.searchService.setDynamicPartRanges(this.dataSource);
    this.searchService.makeHadPicturesToBoolean(this.dataSource);
    this.masrafState = this.searchService.getMasrafStates();
    this._years = this.searchService.getYears();
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForSearchPro = null;
      this.closeTabService.saveDataForSearchProReq = null;
    }
    if (this.closeTabService.saveDataForSearchPro) {
      this.dataSource = this.closeTabService.saveDataForSearchPro;
      this._selectedZone = this.closeTabService.saveDataForSearchProReq.zoneId;
    }
    this.getNesseseriesByZone();
    this.searchService.getSearchInOrderTo();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.searchService.getReadingPeriodDictionary(this.closeTabService.saveDataForSearchProReq._selectedKindId);
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