import { CloseTabService } from 'services/close-tab.service';
import { Component } from '@angular/core';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-gis',
  templateUrl: './gis.component.html',
  styleUrls: ['./gis.component.scss']
})
export class GisComponent extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  fragmentByZoneDictionary: IDictionaryManager[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public readingReportManagerService: ReadingReportManagerService
  ) {
    super();
  }

  getCounterStateByZoneId = async () => {
    if (this.readingReportManagerService.gisReq.zoneId)
      this.counterStateDictionary = await this.readingReportManagerService.dictionaryWrapperService.getCounterStateByZoneIdDictionary(this.readingReportManagerService.gisReq.zoneId);
  }
  getFragmentByZone = async () => {
    if (this.readingReportManagerService.gisReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getFragmentMasterByZoneIdDictionary(this.readingReportManagerService.gisReq.zoneId);
  }
  classWrapper = async (canRefresh?: boolean) => {
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.getCounterStateByZoneId();
    this.readingReportManagerService.getSearchInOrderTo();
    this.getFragmentByZone();
  }

  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionary(this.readingReportManagerService.gisReq._selectedKindId);
  }

  changeRadio = (event: any) => {
    this.readingReportManagerService.showGisInOrderTo.forEach(item => {
      if (item.id == event)
        this.readingReportManagerService.gisReq[item.id] = true;
      else
        this.readingReportManagerService.gisReq[item.id] = false;
    })
    event == 'isForbidden' ? this.readingReportManagerService._isOrderByDate = true : ''
    console.log(this.readingReportManagerService.gisReq);
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationRRGIS(this.readingReportManagerService.gisReq, this.readingReportManagerService._isOrderByDate);
    if (temp)
      this.readingReportManagerService.routeToMapGIS(this.readingReportManagerService.gisReq);
  }

}
