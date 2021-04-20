import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IReadingReportReq } from 'src/app/Interfaces/imanage';
import { IDictionaryManager, ISearchInOrderTo, ITitleValue } from 'src/app/Interfaces/ioverall-config';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';


@Component({
  selector: 'app-karkard',
  templateUrl: './karkard.component.html',
  styleUrls: ['./karkard.component.scss']
})
export class KarkardComponent implements OnInit {
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
  _isOrderByDate: boolean = false;
  _canRouteToChild: boolean = true;
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  subscription: Subscription[] = [];

  constructor(
    private readingReportManagerService: ReadingReportManagerService,
    // private interactionService: InteractionService,
    public route: ActivatedRoute
  ) { }

  routeToGridView = () => {
    this.readingReportManagerService.routeTo('/wr/rpts/mam/karkard/res');
  }
  routeToChartView = () => {
    this.readingReportManagerService.routeTo('/wr/rpts/mam/karkard/chart');
  }
  classWrapper = async () => {
    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
    this.receiveYear();
  }
  ngOnInit() {
    this.classWrapper();
  }
  receiveFromDateJalali = ($event: string) => {
    this.readingReportReq.fromDate = $event;
  }
  receiveToDateJalali = ($event: string) => {
    this.readingReportReq.toDate = $event;
  }
  receiveYear = () => {
    this._canRouteToChild = true;
    this._years = this.readingReportManagerService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.getReadingPeriodDictionary(this._selectedKindId);
  }
  verification = async () => {
    this._isOrderByDate ? (this.readingReportReq.readingPeriodId = null, this.readingReportReq.year = 0) : (this.readingReportReq.fromDate = '', this.readingReportReq.toDate = '');
    const temp = this.readingReportManagerService.verificationRRKarkard(this.readingReportReq, this._isOrderByDate);
    if (temp)
      document.activeElement.id == 'grid_view' ? this.routeToGridView() : this.routeToChartView();
  }
}
