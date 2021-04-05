import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { IDictionaryManager, ISearchInOrderTo, ITitleValue } from 'src/app/Interfaces/ioverall-config';
import { InteractionService } from 'src/app/services/interaction.service';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';

import { IReadingReportGISReq, IReadingReportGISResponse } from './../../../Interfaces/imanage';

@Component({
  selector: 'app-gis',
  templateUrl: './gis.component.html',
  styleUrls: ['./gis.component.scss']
})
export class GisComponent implements OnInit {
  gisResponse: IReadingReportGISResponse[] = [];
  readingReportGISReq: IReadingReportGISReq = {
    zoneId: 0,
    isCounterState: true,
    counterStateId: 0,
    isKarbariChange: false,
    isAhadChange: false,
    isForbidden: false,
    fromDate: '',
    toDate: '',
    readingPeriodId: null,
    year: 1400,
    isCluster: true
  }
  searchInOrderTo: IDictionaryManager[] = [
    {
      id: 'isCounterState',
      title: 'وضعیت کنتور',
      isSelected: true
    },
    {
      id: 'isForbidden',
      title: 'غیر مجاز',
      isSelected: false
    },
    {
      id: 'isAhadChange',
      title: 'آحاد',
      isSelected: false
    },
    {
      id: 'isKarbariChange',
      title: 'کاربری',
      isSelected: false
    }
  ]
  dateEvaluate: ISearchInOrderTo[] = [
    {
      title: 'تاریخ',
      isSelected: true
    },
    {
      title: 'دوره',
      isSelected: false
    },

  ]
  _isOrderByDate: boolean = false;
  _orderBy: string = '';
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];
  subscription: Subscription[] = [];

  zoneDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];

  constructor(
    private readingReportManagerService: ReadingReportManagerService,
    private interactionService: InteractionService,
    // public route: ActivatedRoute
  ) { }

  classWrapper = async () => {
    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.getKarbariDictionary();
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
    this.receiveYear();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/rpts/mam/Gis') {
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
  receiveFromDateJalali = ($event: string) => {
    this.readingReportGISReq.fromDate = $event;
  }
  receiveToDateJalali = ($event: string) => {
    this.readingReportGISReq.toDate = $event;
  }
  receiveYear = () => {
    this._years = this.readingReportManagerService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.getReadingPeriodDictionary(this._selectedKindId);
  }

  changeRadio = (event: any) => {
    this.searchInOrderTo.forEach(item => {
      if (item.id !== event.value)
        this.readingReportGISReq[item.id] = false;
      else
        this.readingReportGISReq[item.id] = true;
    })
    event.value === 'isForbidden' ? this._isOrderByDate = true : ''
  }
  makeObject = () => {
    this._isOrderByDate ? (this.readingReportGISReq.readingPeriodId = null, this.readingReportGISReq.year = 0) : (this.readingReportGISReq.fromDate = '', this.readingReportGISReq.toDate = '');
  }
  verification = async () => {
    this.makeObject();
    const temp = this.readingReportManagerService.verificationRRGIS(this.readingReportGISReq, this._isOrderByDate);
    if (temp)
      this.readingReportManagerService.routeToMapGIS();
  }

}
