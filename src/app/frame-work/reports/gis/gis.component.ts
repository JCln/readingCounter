import { Component } from '@angular/core';
import { IDictionaryManager, ISearchInOrderTo, ITitleValue } from 'interfaces/ioverall-config';
import { IReadingReportGISResponse } from 'interfaces/ireports';
import { InteractionService } from 'services/interaction.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-gis',
  templateUrl: './gis.component.html',
  styleUrls: ['./gis.component.scss']
})
export class GisComponent extends FactoryONE {
  gisResponse: IReadingReportGISResponse[] = [];
  searchInOrderTo: IDictionaryManager[] = [
    {
      id: 'isCounterState',
      title: 'وضعیت کنتور',
      isSelected: false
    },
    {
      id: 'isForbidden',
      title: 'غیر مجاز',
      isSelected: false
    },
    {
      id: 'isAhadChange',
      title: 'تغییر آحاد',
      isSelected: false
    },
    {
      id: 'isKarbariChange',
      title: 'تغییر کاربری',
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
  _isOrderByDate: boolean = true;
  _orderBy: string = '';
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];


  zoneDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public interactionService: InteractionService
  ) {
    super();
  }

  getCounterStateByZoneId = async () => {
    this.counterStateDictionary = await this.readingReportManagerService.getCounterStateByZoneIdDictionary(this.readingReportManagerService.gisReq.zoneId);
  }
  classWrapper = async (canRefresh?: boolean) => {
    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.karbariDictionary = await this.readingReportManagerService.getKarbariDictionary();
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
    this.getCounterStateByZoneId();
    this.receiveYear();
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
        this.readingReportManagerService.gisReq[item.id] = false;
      else
        this.readingReportManagerService.gisReq[item.id] = true;
    })
    console.log(event.value);

    event.value === 'isForbidden' ? this._isOrderByDate = true : ''
    event.value === 'isCounterState' ? this.readingReportManagerService.gisReq.isCounterState = true : ''
  }
  makeObject = () => {
    this._isOrderByDate ? (this.readingReportManagerService.gisReq.readingPeriodId = null, this.readingReportManagerService.gisReq.year = 0) : (this.readingReportManagerService.gisReq.fromDate = '', this.readingReportManagerService.gisReq.toDate = '');
  }
  verification = async () => {
    this.makeObject();
    const temp = this.readingReportManagerService.verificationRRGIS(this.readingReportManagerService.gisReq, this._isOrderByDate);
    if (temp)
      this.readingReportManagerService.routeToMapGIS(this.readingReportManagerService.gisReq);
  }

}
