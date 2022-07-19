import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IAnalyzeRes } from 'interfaces/idashboard-map';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent extends FactoryONE {
  isCollapsed: boolean = false;
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  dataSource: IAnalyzeRes[] = [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,

    private closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForRRPerformance = null;
      this.verification();
      this.setGetRanges();
    }
    if (this.closeTabService.saveDataForRRPerformance) {
      this.dataSource = this.closeTabService.saveDataForRRPerformance;
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
    this.readingReportManagerService._isOrderByDate ? (this.readingReportManagerService.anlzPrfmReq.readingPeriodId = null, this.readingReportManagerService.anlzPrfmReq.year = 0) : (this.readingReportManagerService.anlzPrfmReq.fromDate = '', this.readingReportManagerService.anlzPrfmReq.toDate = '')
    const temp = this.readingReportManagerService.verificationRRAnalyzePerformance(this.readingReportManagerService.anlzPrfmReq, this.readingReportManagerService._isOrderByDate);
    if (temp)
      this.connectToServer();
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.portRRTest(ENInterfaces.trackingAnalyzeByParam, this.readingReportManagerService.anlzPrfmReq);
    if (MathS.isNull(this.dataSource))
      return;
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    this.setGetRanges();
    this.closeTabService.saveDataForRRPerformance = this.dataSource;
  }
  private setGetRanges = () => {
    this.dataSource.forEach(item => {
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
