import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ITHV, ITitleValue } from 'interfaces/ioverall-config';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { OutputManagerService } from 'services/output-manager.service';
import { SearchService } from 'services/search.service';

@Component({
  selector: 'app-search-dg-component',
  templateUrl: './search-dg-component.component.html',
  styleUrls: ['./search-dg-component.component.scss']
})
export class SearchDgComponentComponent implements OnInit {
  readingPeriodDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  counterStateByZoneIdDictionary: IDictionaryManager[] = [];
  counterReportDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  fragmentMasterIds: any[] = [];
  masrafState: ITHV[] = []

  _years: ITitleValue[] = [];
  _isOrderByDate: boolean = true;
  _selectedKindId: string = '';
  searchByText: string = '';

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public searchService: SearchService,
    public closeTabService: CloseTabService,
    private outputManagerService: OutputManagerService,
    private dateJalaliService: DateJalaliService
  ) {
  }
  classWrapper = async () => {

    console.log(1);
    this.zoneDictionary = await this.searchService.getZoneDictionary();
    this.readingPeriodKindDictionary = await this.searchService.getReadingPeriodKindDictionary();
    this.masrafState = this.searchService.getMasrafStates();
    this.receiveYear();
    this.getMasterInZone();
    // this.closeTabService.saveDataForSearchProReq = this.searchService.columnGetSearchPro();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  receiveFromDateJalali = ($event: string) => {
    this.closeTabService.saveDataForSearchProReq.fromDate = $event;
  }
  receiveToDateJalali = ($event: string) => {
    this.closeTabService.saveDataForSearchProReq.toDate = $event;
  }
  receiveYear = () => {
    this._years = this.searchService.getYears();
  }
  getMasterInZone = async () => {
    if (!this.closeTabService.saveDataForSearchProReq.zoneId)
      return;

    this.fragmentMasterIds = await this.searchService.getByQuoteId(ENInterfaces.fragmentMasterInZone, this.closeTabService.saveDataForSearchProReq.zoneId);
    this.counterReportDictionary = await this.searchService.getCounterReportByZoneDictionary(this.closeTabService.saveDataForSearchProReq.zoneId);
    this.karbariDictionary = await this.searchService.getKarbariDictionaryCode();
    this.counterStateByZoneIdDictionary = await this.searchService.getCounterStateByZoneDictionary(this.closeTabService.saveDataForSearchProReq.zoneId);
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.searchService.getReadingPeriodDictionary(this._selectedKindId);
  }
  async editCloseData() {
    if (!this.searchService.verificationPro(this.closeTabService.saveDataForSearchProReq, this._isOrderByDate))
      return;
    if (document.activeElement.id == 'excel_download') {
      this.outputManagerService.saveAsExcelABuffer(await this.searchService.getProExcel(ENInterfaces.ListGetProExcel, this.closeTabService.saveDataForSearchProReq), this.dateJalaliService.getCurrentDate());
      this.ref.close(false);
      return;
    }
    this.ref.close(this.closeTabService.saveDataForSearchProReq);
  }
}
