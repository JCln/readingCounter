import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IDictionaryManager, ISearchInOrderTo, ITitleValue } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';

import { IReadingReportTraverseDifferentialReq } from './../../../Interfaces/imanage';

@Component({
  selector: 'app-traverse-differential',
  templateUrl: './traverse-differential.component.html',
  styleUrls: ['./traverse-differential.component.scss']
})
export class TraverseDifferentialComponent implements OnInit, AfterViewInit, OnDestroy {
  readingReportReq: IReadingReportTraverseDifferentialReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    readingPeriodId: null,
    year: 1400,
    traverseType: 0,
    zoneIds: null
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
  _isOrderByDate: boolean = false;
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  traverseDiffrentialDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  subscription: Subscription[] = [];

  constructor(
    private readingReportManagerService: ReadingReportManagerService,
    private interactionService: InteractionService,
    public route: ActivatedRoute,
    private closeTabService: CloseTabService
  ) { }

  nullSavedSource = () => this.closeTabService.saveDataForRRTraverseDifferential = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForRRTraverseDifferential) {
      this.readingReportReq = this.closeTabService.saveDataForRRTraverseDifferential;
    }
    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.traverseDiffrentialDictionary = await this.readingReportManagerService.getTraverseDiffrentialDictionary();
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
    this.receiveYear();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/rpts/mam/trvch') {
          this.classWrapper(true);
        }
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  routeToGridView = () => {
    this.readingReportManagerService.routeTo('/wr/rpts/mam/trvch/res');
  }
  routeToChartView = () => {
    this.readingReportManagerService.routeTo('/wr/rpts/mam/trvch/chart');
  }
  receiveFromDateJalali = ($event: string) => {
    this.readingReportReq.fromDate = $event;
  }
  receiveToDateJalali = ($event: string) => {
    this.readingReportReq.toDate = $event;
  }
  receiveYear = () => {
    this._years = this.readingReportManagerService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.getReadingPeriodDictionary(this._selectedKindId);
  }
  verification = async () => {
    this._isOrderByDate ? (this.readingReportReq.readingPeriodId = null, this.readingReportReq.year = 0) : (this.readingReportReq.fromDate = '', this.readingReportReq.toDate = '');
    const temp = this.readingReportManagerService.verificationRRTraverseDifferential(this.readingReportReq, this._isOrderByDate);
    if (temp)
      document.activeElement.id == 'grid_view' ? this.routeToGridView() : this.routeToChartView();
  }

}
