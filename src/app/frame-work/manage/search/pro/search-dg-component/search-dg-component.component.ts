import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ITHV, ITitleValue } from 'interfaces/ioverall-config';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
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
    private outputManagerService: OutputManagerService,
    private dateJalaliService: DateJalaliService
  ) {
  }
  classWrapper = async () => {
    this.zoneDictionary = await this.searchService.getZoneDictionary();
    this.readingPeriodKindDictionary = await this.searchService.getReadingPeriodKindDictionary();
    this.masrafState = this.searchService.getMasrafStates();
    this.receiveYear();
    this.searchService.searchReqPro = this.searchService.columnGetSearchPro();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  receiveFromDateJalali = ($event: string) => {
    this.searchService.searchReqPro.fromDate = $event;
  }
  receiveToDateJalali = ($event: string) => {
    this.searchService.searchReqPro.toDate = $event;
  }
  receiveYear = () => {
    this._years = this.searchService.getYears();
  }
  getMasterInZone = async () => {
    if (!this.searchService.searchReqPro.zoneId)
      return;

    this.fragmentMasterIds = await this.searchService.getByQuoteId(ENInterfaces.fragmentMasterInZone, this.searchService.searchReqPro.zoneId);
    this.counterReportDictionary = await this.searchService.getCounterReportByZoneDictionary(this.searchService.searchReqPro.zoneId);
    this.karbariDictionary = await this.searchService.getKarbariDictionary();
    this.counterStateByZoneIdDictionary = await this.searchService.getCounterStateByZoneDictionary(this.searchService.searchReqPro.zoneId);
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.searchService.getReadingPeriodDictionary(this._selectedKindId);
  }
  async editCloseData() {
    if (!this.searchService.verificationPro(this.searchService.searchReqPro, this._isOrderByDate))
      return;
    if (document.activeElement.id == 'excel_download') {
      this.outputManagerService.saveAsExcelABuffer(await this.searchService.getProExcel(ENInterfaces.ListGetProExcel, this.searchService.searchReqPro), this.dateJalaliService.getCurrentDate());
      this.ref.close(false);
      return;
    }
    this.ref.close(this.searchService.searchReqPro);
  }
}
