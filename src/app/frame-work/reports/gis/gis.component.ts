import { CloseTabService } from 'services/close-tab.service';
import { Component, ViewChild } from '@angular/core';
import { IDictionaryManager, IProvinceHierarchy } from 'interfaces/ioverall-config';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { TreeSelect } from 'primeng/treeselect';

@Component({
  selector: 'app-gis',
  templateUrl: './gis.component.html',
  styleUrls: ['./gis.component.scss']
})
export class GisComponent extends FactoryONE {
  provinceHierarchy: IProvinceHierarchy[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  fragmentByZoneDictionary: IDictionaryManager[] = [];
  @ViewChild('myTreeSelect', { static: false }) myTreeSelect!: TreeSelect;
  selectedZoneIds = [];

  constructor(
    public closeTabService: CloseTabService,
    public readingReportManagerService: ReadingReportManagerService
  ) {
    super();
  }

  getCounterStateByZoneId = async () => {
    if (this.closeTabService.gisReq.zoneId)
      this.counterStateDictionary = await this.readingReportManagerService.dictionaryWrapperService.getCounterStateByZoneIdDictionary(this.closeTabService.gisReq.zoneId);
  }
  getFragmentByZone = async () => {
    if (this.closeTabService.gisReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getFragmentMasterByZoneIdDictionary(this.closeTabService.gisReq.zoneId);
    if (!this.closeTabService.gisReq.isSingleZone && this.myTreeSelect.value)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.getFragmentMastersInZones(this.myTreeSelect.value);
  }
  classWrapper = async () => {
    this.provinceHierarchy = await this.readingReportManagerService.dictionaryWrapperService.getProvinceHierarchy();
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.getCounterStateByZoneId();
    this.closeTabService.getSearchInOrderTo();
    this.getFragmentByZone();
  }
  afterZoneChanged() {
    // TODO: CLEAR period dictionaries and selected periodId and kindId values
    this.closeTabService.gisReq.fragmentMasterIds = [];
    this.closeTabService.gisReq.counterStateId = null;
    this.readingPeriodDictionary = [];
    this.closeTabService.gisReq.readingPeriodId = null;
    this.closeTabService.gisReq._selectedKindId = null;
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.closeTabService.gisReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionaryByZoneAndKind(this.closeTabService.gisReq.zoneId, +this.closeTabService.gisReq._selectedKindId);
  }
  changeRadio = (event: any) => {
    this.readingReportManagerService.showGisInOrderTo.forEach(item => {
      if (item.id == event)
        this.closeTabService.gisReq[item.id] = true;
      else
        this.closeTabService.gisReq[item.id] = false;
    })

    event == 'isCounterState' ? this.closeTabService.gisReq.isSingleZone = true : this.closeTabService.gisReq.isSingleZone = false
    event == 'isForbidden' ? this.closeTabService._isOrderByDate = true : ''
  }
  verification = async () => {
    if (!this.closeTabService.gisReq.isSingleZone) {
      this.closeTabService.gisReq.zoneId = 0;
      this.closeTabService.gisReq.zoneIds = this.readingReportManagerService.utilsService.getZoneHierarical(this.myTreeSelect.value);
    }
    const temp = this.readingReportManagerService.verificationService.verificationRRGIS(this.closeTabService.gisReq, this.closeTabService._isOrderByDate);
    if (temp)
      this.readingReportManagerService.routeToMapGIS(this.closeTabService.gisReq);
  }

}
