import { Component, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, IProvinceHierarchy } from 'interfaces/ioverall-config';
import { TreeSelect } from 'primeng/treeselect';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-rr-fragment',
  templateUrl: './rr-fragment.component.html',
  styleUrls: ['./rr-fragment.component.scss'],
  animations: [transitionAnimation]
})
export class RrFragmentComponent extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];
  provinceHierarchy: IProvinceHierarchy[] = [];
  fragmentByZoneDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  @ViewChild('myTreeSelect', { static: false }) myTreeSelect!: TreeSelect;
  selectedZoneIds = [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService
  ) {
    super();
  }

  classWrapper = async () => {
    this.provinceHierarchy = await this.readingReportManagerService.dictionaryWrapperService.getProvinceHierarchy();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.closeTabService.getSearchInOrderTo();
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
    this.getFragmentByZone();
    this.setGetRanges();
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.closeTabService.rrFragmentKarkardReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    if (this.closeTabService.rrFragmentKarkardReq._selectedKindId)
      this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionary(this.closeTabService.rrFragmentKarkardReq._selectedKindId);
  }
  getFragmentByZone = async () => {
    if (this.myTreeSelect.value)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.getFragmentMastersInZones(this.myTreeSelect.value);
  }
  validation = (): boolean => {
    return this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.rrFragmentKarkardReq, this.closeTabService._isOrderByDate);
  }
  verification = async () => {
    this.closeTabService.rrFragmentKarkardReq.zoneIds = this.readingReportManagerService.utilsService.getZoneHierarical(this.myTreeSelect.value);
    if (this.validation())
      this.connectToServer();
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRRFragment = await this.readingReportManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ListKarkardByFragment, this.closeTabService.rrFragmentKarkardReq);
    this.setGetRanges();
  }
  refreshTable = () => {
    if (this.validation())
      this.connectToServer();
  }
  private setGetRanges = () => {
    if (this.closeTabService.saveDataForRRFragment) {
      this.setGetRanges();
    }
    this.closeTabService.saveDataForRRFragment.forEach(item => {
      item.duration = parseFloat(MathS.getRange(item.duration));
    })
  }


}