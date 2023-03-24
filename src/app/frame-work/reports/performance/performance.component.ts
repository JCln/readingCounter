import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss'],
  animations: [transitionAnimation]
})
export class PerformanceComponent extends FactoryONE {
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForRRPerformance = null;
      this.verification();
      this.setGetRanges();
    }
    this.readingReportManagerService.getSearchInOrderTo();
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.receiveYear();
  }
  receiveYear = () => {
    this._years = this.readingReportManagerService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.getReadingPeriodDictionary(this._selectedKindId);
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationRRAnalyzePerformance(this.readingReportManagerService.anlzPrfmReq, this.readingReportManagerService._isOrderByDate);
    if (temp)
      this.connectToServer();
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRRPerformance = await this.readingReportManagerService.portRRTest(ENInterfaces.trackingAnalyzeByParam, this.readingReportManagerService.anlzPrfmReq);
    if (MathS.isNull(this.closeTabService.saveDataForRRPerformance))
      return;
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRPerformance, this.zoneDictionary, 'zoneId');
    this.setGetRanges();
    this.closeTabService.saveDataForRRPerformance = this.closeTabService.saveDataForRRPerformance;
  }
  private setGetRanges = () => {
    this.closeTabService.saveDataForRRPerformance.forEach(item => {
      item.average = parseFloat(MathS.getRange(item.average));
      item.max = parseFloat(MathS.getRange(item.max));
      item.median = parseFloat(MathS.getRange(item.median));
      item.min = parseFloat(MathS.getRange(item.min));
      item.mode = parseFloat(MathS.getRange(item.mode));
      item.variance = parseFloat(MathS.getRange(item.variance));
      item.standardDeviation = parseFloat(MathS.getRange(item.standardDeviation));
    })
  }
}
