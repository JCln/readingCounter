import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
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
  fragmentByZoneDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForRRFragment = null;
      this.verification();
    }
    if (this.closeTabService.saveDataForRRFragment) {
      this.setGetRanges();
    }
    this.readingReportManagerService.getSearchInOrderTo();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
    this.getFragmentByZone();
  }
  afterZoneChanged() {
    // TODO: CLEAR period dictionaries and selected periodId and kindId values
    this.readingReportManagerService.rrFragmentKarkardReq.fragmentMasterIds = [];
    this.readingPeriodDictionary = [];
    this.readingReportManagerService.rrFragmentKarkardReq.readingPeriodId = null;
    this.readingReportManagerService.rrFragmentKarkardReq._selectedKindId = null;
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.readingReportManagerService.rrFragmentKarkardReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    if (this.readingReportManagerService.rrFragmentKarkardReq._selectedKindId)
      this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionaryByZoneAndKind(this.readingReportManagerService.rrFragmentKarkardReq.zoneId, +this.readingReportManagerService.rrFragmentKarkardReq._selectedKindId);
  }
  getFragmentByZone = async () => {
    if (this.readingReportManagerService.rrFragmentKarkardReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getFragmentMasterByZoneIdDictionary(this.readingReportManagerService.rrFragmentKarkardReq.zoneId);
  }
  validation = (): boolean => {
    return this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.rrFragmentKarkardReq, this.readingReportManagerService._isOrderByDate);
  }
  verification = async () => {
    if (this.validation())
      this.connectToServer();
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRRFragment = await this.readingReportManagerService.portRRTest(ENInterfaces.ListKarkardByFragment, this.readingReportManagerService.rrFragmentKarkardReq);
    this.setGetRanges();
  }
  refreshTable = () => {
    if (this.validation())
      this.connectToServer();
  }
  private setGetRanges = () => {
    this.closeTabService.saveDataForRRFragment.forEach(item => {
      item.duration = parseFloat(MathS.getRange(item.duration));
    })
  }


}