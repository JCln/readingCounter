import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { Component, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, IProvinceHierarchy } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { transitionAnimation } from 'src/app/directives/animation.directive';
import { TreeSelect } from 'primeng/treeselect';

@Component({
  selector: 'app-dm-analysis',
  templateUrl: './dm-analysis.component.html',
  styleUrls: ['./dm-analysis.component.scss'],
  animations: [transitionAnimation]
})
export class DmAnalysisComponent extends FactoryONE {
  @ViewChild('myTreeSelect', { static: false }) myTreeSelect!: TreeSelect;
selectedZoneIds= [];
  
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  provinceHierarchy: IProvinceHierarchy[] = [];

  constructor(
    public dataMiningAnalysesService: ReadingReportManagerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async () => {
    if (!MathS.isNull(this.closeTabService.saveDataForDMAAnalyze)) {
      // this.insertSelectedColumns(); /* TO CHECKOUT THIS FUNC */
      this.setRanges();
    }
    this.closeTabService.getSearchInOrderTo();
    this.provinceHierarchy = await this.dataMiningAnalysesService.dictionaryWrapperService.getProvinceHierarchy();
    this.readingPeriodKindDictionary = await this.dataMiningAnalysesService.dictionaryWrapperService.getPeriodKindDictionary();
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.closeTabService.dataMiningReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    if (this.closeTabService.dataMiningReq._selectedKindId)
      this.readingPeriodDictionary = await this.dataMiningAnalysesService.dictionaryWrapperService.getReadingPeriodDictionary(this.closeTabService.dataMiningReq._selectedKindId);
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForDMAAnalyze = await this.dataMiningAnalysesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.dataMiningReadingTime, this.closeTabService.dataMiningReq);
    if (!MathS.isNull(this.closeTabService.saveDataForDMAAnalyze)) {
      this.zoneDictionary = await this.dataMiningAnalysesService.dictionaryWrapperService.getZoneDictionary();
      Converter.convertIdToTitle(this.closeTabService.saveDataForDMAAnalyze, this.zoneDictionary, 'zoneId');
      this.setRanges();
    }
  }
  verification = async () => {
    this.closeTabService.dataMiningReq.zoneIds = this.dataMiningAnalysesService.utilsService.getZoneHierarical(this.myTreeSelect.value);
    const temp = this.dataMiningAnalysesService.verificationService.verificationRRShared(this.closeTabService.dataMiningReq, this.closeTabService._isOrderByDate);
    if (temp)
      this.connectToServer();
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
