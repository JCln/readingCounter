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
  selector: 'app-rr-offload-karkard',
  templateUrl: './rr-offload-karkard.component.html',
  styleUrls: ['./rr-offload-karkard.component.scss'],
  animations: [transitionAnimation]
})
export class RrOffloadKarkardComponent extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];
  fragmentByZoneDictionary: IDictionaryManager[] = [];
  provinceHierarchy: IProvinceHierarchy[] = [];

  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  @ViewChild('myTreeSelect', { static: false }) myTreeSelect!: TreeSelect;


  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService
  ) {
    super();
  }

  classWrapper = async () => {
    if (this.closeTabService.saveDataForRROffloadedKarkard) {
      this.setGetRanges();
    }
    this.closeTabService.getSearchInOrderTo();
    this.provinceHierarchy = await this.readingReportManagerService.dictionaryWrapperService.getProvinceHierarchy();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
    this.getFragmentByZone();
  }
  getFragmentByZone = async () => {
    if (this.closeTabService.karkardOffloadReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getFragmentMasterByZoneIdDictionary(this.closeTabService.karkardOffloadReq.zoneId);
  }
  afterZoneChanged() {
    // TODO: CLEAR period dictionaries and selected periodId and kindId values
    this.closeTabService.karkardOffloadReq.fragmentMasterIds = [];
    this.readingPeriodDictionary = [];
    this.closeTabService.karkardOffloadReq.readingPeriodId = null;
    this.closeTabService.karkardOffloadReq._selectedKindId = null;
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.closeTabService.karkardOffloadReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    if (this.closeTabService.karkardOffloadReq._selectedKindId)
      this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionary(this.closeTabService.karkardOffloadReq._selectedKindId);
  }
  validation = (): boolean => {
    return this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.karkardOffloadReq, this.closeTabService._isOrderByDate);
  }
  verification = async () => {
    this.closeTabService.karkardOffloadReq.zoneIds = this.readingReportManagerService.utilsService.getZoneHierarical(this.myTreeSelect.value);
    if (this.validation())
      this.connectToServer();
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRROffloadedKarkard = await this.readingReportManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ListKarkardOffloaded, this.closeTabService.karkardOffloadReq);
    this.setGetRanges();
  }
  private setGetRanges = () => {
    this.closeTabService.saveDataForRROffloadedKarkard.forEach(item => {
      item.duration = parseFloat(MathS.getRange(item.duration));
    })
  }


}
