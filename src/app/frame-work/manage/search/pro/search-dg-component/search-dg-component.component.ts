import { Component, OnInit } from '@angular/core';
import { ISearchProReportInput } from 'interfaces/imanage';
import { IDictionaryManager, ISearchInOrderTo, ITHV, ITitleValue } from 'interfaces/ioverall-config';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SearchService } from 'services/search.service';

@Component({
  selector: 'app-search-dg-component',
  templateUrl: './search-dg-component.component.html',
  styleUrls: ['./search-dg-component.component.scss']
})
export class SearchDgComponentComponent implements OnInit {
  searchReq: ISearchProReportInput = {
    zoneId: null,
    fromDate: '',
    toDate: '',
    readingPeriodId: null,
    zoneIds: [],
    year: 1400,
    reportIds: [],
    counterStateIds: [],
    masrafStates: [],
    karbariCodes: [],
    fragmentMasterIds: []
  }
  searchInOrderTo: ISearchInOrderTo[] = [
    {
      title: 'تاریخ',
      isSelected: true
    },
    {
      title: 'دوره',
      isSelected: false
    }
  ]

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
    private searchService: SearchService
  ) {
  }
  classWrapper = async () => {
    this.zoneDictionary = await this.searchService.getZoneDictionary();
    this.readingPeriodKindDictionary = await this.searchService.getReadingPeriodKindDictionary();
    this.masrafState = this.searchService.getMasrafStates();
    this.receiveYear();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  receiveFromDateJalali = ($event: string) => {
    this.searchReq.fromDate = $event;
  }
  receiveToDateJalali = ($event: string) => {
    this.searchReq.toDate = $event;
  }
  receiveYear = () => {
    this._years = this.searchService.getYears();
  }
  getMasterInZone = async () => {
    console.log(this.searchReq.zoneId);
    if (!this.searchReq.zoneId)
      return;

    this.fragmentMasterIds = await this.searchService.getFragmentMasterInZone(this.searchReq.zoneId);
    this.counterReportDictionary = await this.searchService.getCounterReportByZoneDictionary(this.searchReq.zoneId);
    this.karbariDictionary = await this.searchService.getKarbariDictionary();
    this.counterStateByZoneIdDictionary = await this.searchService.getCounterStateByZoneDictionary(this.searchReq.zoneId);
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.searchService.getReadingPeriodDictionary(this._selectedKindId);
  }
  editCloseData() {
    if (!this.searchService.verificationPro(this.searchReq, this._isOrderByDate))
      return;
    this.ref.close(this.searchReq);
  }
}
