import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ISearchProReportInput } from 'src/app/Interfaces/imanage';
import { IDictionaryManager, ISearchInOrderTo, ITHV, ITitleValue } from 'src/app/Interfaces/ioverall-config';
import { SearchService } from 'src/app/services/search.service';

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
    zoneIds: [null],
    year: 1400,
    reportIds: [null],
    counterStateIds: [null],
    masrafStates: [null],
    karbariCodes: [null],
    fragmentMasterIds: ['']
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
    this.karbariDictionary = await this.searchService.getKarbariDictionary();
    this.counterStateByZoneIdDictionary = await this.searchService.getCounterStateByZoneDictionary(this.searchReq.zoneId);
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.searchService.getReadingPeriodDictionary(this._selectedKindId);
  }
  editCloseData() {
    console.log(this.searchReq);

    if (!this.searchService.verificationPro(this.searchReq))
      return;
    this.ref.close(this.searchReq);
  }
}
