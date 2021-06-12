import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IDictionaryManager, ISearchInOrderTo } from 'src/app/Interfaces/ioverall-config';
import { InteractionService } from 'src/app/services/interaction.service';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';

import { IReadingReportReq } from './../../../Interfaces/imanage';
import { ITitleValue } from './../../../Interfaces/ioverall-config';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  readingReportReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: 1400
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
  _isOrderByDate: boolean = true;
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  subscription: Subscription[] = [];

  constructor(
    private readingReportManagerService: ReadingReportManagerService,
    private interactionService: InteractionService,
    public route: ActivatedRoute
  ) { }

  classWrapper = async () => {
    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.receiveYear();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/rpts/exm/master') {
          this.classWrapper();
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
  routeToChild = () => {
    this.readingReportManagerService.routeTo('/wr/rpts/exm/master/res');
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
    this._isOrderByDate ? (this.readingReportReq.readingPeriodId = null, this.readingReportReq.year = 0) : (this.readingReportReq.fromDate = '', this.readingReportReq.toDate = '')
    const temp = this.readingReportManagerService.verificationRRMaster(this.readingReportReq, this._isOrderByDate);
    if (temp)
      this.routeToChild();
  }
}
