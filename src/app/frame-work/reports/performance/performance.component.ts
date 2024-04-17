import { Component, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, IProvinceHierarchy } from 'interfaces/ioverall-config';
import { TreeSelect } from 'primeng/treeselect';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
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
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  provinceHierarchy: IProvinceHierarchy[] = [];
  @ViewChild('myTreeSelect', { static: false }) myTreeSelect!: TreeSelect;


  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async () => {
    this.closeTabService.getSearchInOrderTo();
    this.provinceHierarchy = await this.readingReportManagerService.dictionaryWrapperService.getProvinceHierarchy();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
  }
  getReadingPeriod = async () => {
    if (this.closeTabService.anlzPrfmReq._selectedKindId)
      this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionary(this.closeTabService.anlzPrfmReq._selectedKindId);
  }
  afterZoneChanged() {
    // TODO: CLEAR period dictionaries and selected periodId and kindId values
    this.readingPeriodDictionary = [];
    this.closeTabService.anlzPrfmReq.readingPeriodId = null;
    this.closeTabService.anlzPrfmReq._selectedKindId = null;
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.closeTabService.anlzPrfmReq.readingPeriodId = null;
  }
  verification = async () => {
    this.closeTabService.anlzPrfmReq.zoneIds = this.readingReportManagerService.utilsService.getZoneHierarical(this.myTreeSelect.value);
    const temp = this.readingReportManagerService.verificationService.verificationRRAnalyzePerformance(this.closeTabService.anlzPrfmReq, this.closeTabService._isOrderByDate);
    if (temp)
      this.connectToServer();
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRRPerformance = await this.readingReportManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.trackingAnalyzeByParam, this.closeTabService.anlzPrfmReq);
    if (MathS.isNull(this.closeTabService.saveDataForRRPerformance))
      return;
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
