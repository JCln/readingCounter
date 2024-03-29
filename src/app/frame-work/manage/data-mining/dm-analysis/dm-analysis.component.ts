import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-dm-analysis',
  templateUrl: './dm-analysis.component.html',
  styleUrls: ['./dm-analysis.component.scss'],
  animations: [transitionAnimation]
})
export class DmAnalysisComponent extends FactoryONE {
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public dataMiningAnalysesService: ReadingReportManagerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForDMAAnalyze = null;
      this.verification();
    }
    if (this.closeTabService.saveDataForDMAAnalyze) {
      // this.insertSelectedColumns(); /* TO CHECKOUT THIS FUNC */
      this.setRanges();
    }
    this.dataMiningAnalysesService.getSearchInOrderTo();
    this.zoneDictionary = await this.dataMiningAnalysesService.dictionaryWrapperService.getZoneDictionary();
    this.readingPeriodKindDictionary = await this.dataMiningAnalysesService.dictionaryWrapperService.getPeriodKindDictionary();
  }
  afterZoneChanged() {
    // TODO: CLEAR period dictionaries and selected periodId and kindId values
    this.readingPeriodDictionary = [];
    this.dataMiningAnalysesService.dataMiningReq.readingPeriodId = null;
    this.dataMiningAnalysesService.dataMiningReq._selectedKindId = null;
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.dataMiningAnalysesService.dataMiningReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.dataMiningAnalysesService.dictionaryWrapperService.getReadingPeriodDictionaryByZoneAndKind(this.dataMiningAnalysesService.dataMiningReq.zoneId, +this.dataMiningAnalysesService.dataMiningReq._selectedKindId);
  }
  verification = async () => {
    const temp = this.dataMiningAnalysesService.verificationRRShared(this.dataMiningAnalysesService.dataMiningReq, this.dataMiningAnalysesService._isOrderByDate);
    if (temp)
      this.connectToServer();
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForDMAAnalyze = await this.dataMiningAnalysesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.dataMiningReadingTime, this.dataMiningAnalysesService.dataMiningReq);
    if (!MathS.isNull(this.closeTabService.saveDataForDMAAnalyze)) {
      this.zoneDictionary = await this.dataMiningAnalysesService.dictionaryWrapperService.getZoneDictionary();
      Converter.convertIdToTitle(this.closeTabService.saveDataForDMAAnalyze, this.zoneDictionary, 'zoneId');
      this.setRanges();
    }
  }

  private setRanges = () => {
    this.closeTabService.saveDataForDMAAnalyze.forEach(item => {
      item.averageBetweenTwoMinute = parseFloat(MathS.getRange(item.averageBetweenTwoMinute));
      item.disconnectRate = parseFloat(MathS.getRange(item.disconnectRate));
      item.medianBetweenTwoMinute = parseFloat(MathS.getRange(item.medianBetweenTwoMinute));
      item.closedPercent = parseFloat(MathS.getRange(item.closedPercent));
    })
  }

}
