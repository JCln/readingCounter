import { Component } from '@angular/core';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { IReadingReportGISResponse } from 'interfaces/ireports';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-gis',
  templateUrl: './gis.component.html',
  styleUrls: ['./gis.component.scss']
})
export class GisComponent extends FactoryONE {
  gisResponse: IReadingReportGISResponse[] = [];
  searchInOrderTo: any[] = [
    {
      id: 'isCounterState',
      title: 'وضعیت کنتور',
      isSelected: true,
      key: 'A'
    },
    {
      id: 'isForbidden',
      title: 'غیر مجاز',
      isSelected: false,
      key: 'B'
    },
    {
      id: 'isAhadChange',
      title: 'تغییر آحاد',
      isSelected: false,
      key: 'C'
    },
    {
      id: 'isKarbariChange',
      title: 'تغییر کاربری',
      isSelected: false,
      key: 'D'
    }
  ]
  _orderBy: string = '';
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];


  zoneDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  fragmentByZoneDictionary: IDictionaryManager[] = [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService
  ) {
    super();
  }

  getCounterStateByZoneId = async () => {
    this.counterStateDictionary = await this.readingReportManagerService.getCounterStateByZoneIdDictionary(this.readingReportManagerService.gisReq.zoneId);
  }
  getFragmentByZone = async () => {
    if (this.readingReportManagerService.gisReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.getFragmentMasterByZoneDictionary(this.readingReportManagerService.gisReq.zoneId);
  }
  classWrapper = async (canRefresh?: boolean) => {
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.getCounterStateByZoneId();
    this.receiveYear();
    this.readingReportManagerService.getSearchInOrderTo();
    this.getFragmentByZone();
  }

  receiveYear = () => {
    this._years = this.readingReportManagerService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.getReadingPeriodDictionary(this._selectedKindId);
  }

  changeRadio = (event: any) => {
    console.log(event);
    console.log(this._orderBy);
    
    
    this.searchInOrderTo.forEach(item => {
      if (item.id !== event)
        this.readingReportManagerService.gisReq[item.id] = false;
      else
        this.readingReportManagerService.gisReq[item.id] = true;
    })
    
    event == 'isForbidden' ? this.readingReportManagerService._isOrderByDate = true : ''
    event == 'isCounterState' ? this.readingReportManagerService.gisReq.isCounterState = true : ''
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationRRGIS(this.readingReportManagerService.gisReq, this.readingReportManagerService._isOrderByDate);
    if (temp)
      this.readingReportManagerService.routeToMapGIS(this.readingReportManagerService.gisReq);
  }

}
