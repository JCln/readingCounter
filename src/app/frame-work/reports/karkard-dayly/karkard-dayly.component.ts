import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';


@Component({
  selector: 'app-karkard-dayly',
  templateUrl: './karkard-dayly.component.html',
  styleUrls: ['./karkard-dayly.component.scss']
})
export class KarkardDaylyComponent extends FactoryONE {
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];
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

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForRRkarkardDaily = null;
      this.verification();
    }
    if (this.closeTabService.saveDataForRRkarkardDaily) {
      this.setGetRanges();
    }
    this.readingReportManagerService.getSearchInOrderTo();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
    this.getFragmentByZone()
    this.receiveYear();
  }
  getFragmentByZone = async () => {
    if (this.readingReportManagerService.karkardDailyReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.getFragmentMasterByZoneDictionary(this.readingReportManagerService.karkardDailyReq.zoneId);
  }
  receiveYear = () => {
    this._years = this.readingReportManagerService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.getReadingPeriodDictionary(this._selectedKindId);
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.karkardDailyReq, this.readingReportManagerService._isOrderByDate);
    if (temp)
      this.connectToServer();
  }

  connectToServer = async () => {
    this.closeTabService.saveDataForRRkarkardDaily = await this.readingReportManagerService.portRRTest(ENInterfaces.ListKarkardDaily, this.readingReportManagerService.karkardDailyReq);
    this.setGetRanges();
  }
  private setGetRanges = () => {
    this.closeTabService.saveDataForRRkarkardDaily.forEach(item => {
      item.duration = parseFloat(MathS.getRange(item.duration));
    })
  }
}
