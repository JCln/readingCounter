import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
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

  _empty_message: string = '';

  dataSource: IOnOffLoadFlat[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  
  readingPeriodDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  counterStateByZoneIdDictionary: IDictionaryManager[] = [];
  counterReportDictionary: IDictionaryManager[] = [];
  fragmentMasterIds: any[] = [];
  masrafState: ITHV[] = []

  _years: ITitleValue[] = [];
  _isOrderByDate: boolean = true;
  _selectedKindId: string = '';
  searchByText: string = '';


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

  converts = async () => {
    if (this.closeTabService.saveDataForSearchProReq.zoneId) {
      // this._empty_message = EN_messages.notFound;
      this.counterStateDictionary = await this.searchService.getCounterStateByZoneDictionary(this.closeTabService.saveDataForSearchProReq.zoneId);
      this.counterStateByCodeDictionary = await this.searchService.getCounterStateByCodeDictionary(this.closeTabService.saveDataForSearchProReq.zoneId);
      this.karbariDictionary = await this.searchService.getKarbariDictionary();
      this.karbariDictionaryCode = await this.searchService.getKarbariDictionaryCode();
      this.qotrDictionary = await this.searchService.getQotrDictionary();

      Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
      Converter.convertIdToTitle(this.dataSource, this.counterStateDictionary, 'counterStateId');
      Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
      Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'counterStateCode');
      Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
      Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'karbariCode');
      Converter.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');
      this.searchService.setDynamicPartRanges(this.dataSource);
      this.searchService.makeHadPicturesToBoolean(this.dataSource);
    }
  }
  formDefinition = async () => {
    this.zoneDictionary = await this.searchService.getZoneDictionary();
    this.readingPeriodKindDictionary = await this.searchService.getReadingPeriodKindDictionary();
    this.masrafState = this.searchService.getMasrafStates();
    this.searchService.receiveYear();
    this.getMasterInZone();
  }
  callApi = async () => {
    if (this.closeTabService.saveDataForSearchProReq.zoneId && this.closeTabService.saveDataForSearchProReq) {
      this.dataSource = await this.searchService.doSearch(ENInterfaces.ListSearchPro, this.closeTabService.saveDataForSearchProReq);
      this.closeTabService.saveDataForSearchPro = this.dataSource;
      this.converts();
    }
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForSearchPro = null;
      this.closeTabService.saveDataForSearchProReq = null;
    }
    if (this.closeTabService.saveDataForSearchPro) {
      this.dataSource = this.closeTabService.saveDataForSearchPro;
    }
    else {
      this.callApi();
    }
    this.formDefinition();
  }

  getMasterInZone = async () => {
    if (this.closeTabService.saveDataForSearchProReq.zoneId) {
      this.fragmentMasterIds = await this.searchService.getFragmentMasterDictionary(this.closeTabService.saveDataForSearchProReq.zoneId);
      this.counterReportDictionary = await this.searchService.getCounterReportByZoneDictionary(this.closeTabService.saveDataForSearchProReq.zoneId);
      this.karbariDictionary = await this.searchService.getKarbariDictionaryCode();
      this.counterStateByZoneIdDictionary = await this.searchService.getCounterStateByZoneDictionary(this.closeTabService.saveDataForSearchProReq.zoneId);
    }
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.searchService.getReadingPeriodDictionary(this._selectedKindId);
  }
  async connectToServer() {
    if (this.searchService.verificationPro(this.closeTabService.saveDataForSearchProReq, this._isOrderByDate)) {
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