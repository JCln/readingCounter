import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { transitionAnimation } from 'src/app/directives/animation.directive';


@Component({
  selector: 'app-karkard-dayly',
  templateUrl: './karkard-dayly.component.html',
  styleUrls: ['./karkard-dayly.component.scss'],
  animations: [transitionAnimation]
})
export class KarkardDaylyComponent extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  fragmentByZoneDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async () => {
    if (this.closeTabService.saveDataForRRkarkardDaily) {
      this.setGetRanges();
    }
    this.closeTabService.getSearchInOrderTo();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
    this.getFragmentByZone();
  }
  getFragmentByZone = async () => {
    if (this.closeTabService.karkardDailyReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getFragmentMasterByZoneIdDictionary(this.closeTabService.karkardDailyReq.zoneId);
  }
  afterZoneChanged() {
    // TODO: CLEAR period dictionaries and selected periodId and kindId values
    this.closeTabService.karkardDailyReq.fragmentMasterIds = [];
    this.readingPeriodDictionary = [];
    this.closeTabService.karkardDailyReq.readingPeriodId = null;
    this.closeTabService.karkardDailyReq._selectedKindId = null;
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.closeTabService.karkardDailyReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionaryByZoneAndKind(this.closeTabService.karkardDailyReq.zoneId, +this.closeTabService.karkardDailyReq._selectedKindId);
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.karkardDailyReq, this.closeTabService._isOrderByDate);
    if (temp)
      this.connectToServer();
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRRkarkardDaily = await this.readingReportManagerService.portRRTest(ENInterfaces.ListKarkardDaily, this.closeTabService.karkardDailyReq);
    this.setGetRanges();
  }
  private setGetRanges = () => {
    this.closeTabService.saveDataForRRkarkardDaily.forEach(item => {
      item.duration = parseFloat(MathS.getRange(item.duration));
    })
  }
}
