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
  selector: 'app-rr-offload-karkard',
  templateUrl: './rr-offload-karkard.component.html',
  styleUrls: ['./rr-offload-karkard.component.scss'],
  animations: [transitionAnimation]
})
export class RrOffloadKarkardComponent extends FactoryONE {
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

  classWrapper = async () => {
    if (this.closeTabService.saveDataForRROffloadedKarkard) {
      this.setGetRanges();
    }
    this.closeTabService.getSearchInOrderTo();
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
    this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionaryByZoneAndKind(this.closeTabService.karkardOffloadReq.zoneId, +this.closeTabService.karkardOffloadReq._selectedKindId);
  }
  validation = (): boolean => {
    return this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.karkardOffloadReq, this.closeTabService._isOrderByDate);
  }
  verification = async () => {
    if (this.validation())
      this.connectToServer();
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRROffloadedKarkard = await this.readingReportManagerService.portRRTest(ENInterfaces.ListKarkardOffloaded, this.closeTabService.karkardOffloadReq);
    this.setGetRanges();
  }
  private setGetRanges = () => {
    this.closeTabService.saveDataForRROffloadedKarkard.forEach(item => {
      item.duration = parseFloat(MathS.getRange(item.duration));
    })
  }


}
