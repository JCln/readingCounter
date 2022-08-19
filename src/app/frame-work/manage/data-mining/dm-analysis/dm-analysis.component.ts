import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { DataMiningAnalysesService } from 'services/data-mining-analyses.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { IReadingTimeRes } from 'src/app/interfaces/data-mining';

@Component({
  selector: 'app-dm-analysis',
  templateUrl: './dm-analysis.component.html',
  styleUrls: ['./dm-analysis.component.scss']
})
export class DmAnalysisComponent extends FactoryONE {  
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  dataSource: IReadingTimeRes[] = [];

  constructor(
    public dataMiningAnalysesService: DataMiningAnalysesService,
    private closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForDMAAnalyze = null;
      this.verification();
    }
    if (this.closeTabService.saveDataForDMAAnalyze) {
      this.dataSource = this.closeTabService.saveDataForDMAAnalyze;
      // this.insertSelectedColumns(); /* TO CHECKOUT THIS FUNC */
      this.setRanges();
    }
    this.dataMiningAnalysesService.getSearchInOrderTo();
    this.zoneDictionary = await this.dataMiningAnalysesService.getZoneDictionary();
    this.readingPeriodKindDictionary = await this.dataMiningAnalysesService.getReadingPeriodKindDictionary();
    this.receiveYear();
  }
  receiveYear = () => {
    this._years = this.dataMiningAnalysesService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.dataMiningAnalysesService.getReadingPeriodDictionary(this._selectedKindId);
  }
  verification = async () => {
    const temp = this.dataMiningAnalysesService.verification(this.dataMiningAnalysesService.dataMiningReq, this.dataMiningAnalysesService._isOrderByDate);
    if (temp)
      this.connectToServer();
  }
  connectToServer = async () => {
    this.dataSource = await this.dataMiningAnalysesService.postDMManager(ENInterfaces.dataMiningReadingTime, this.dataMiningAnalysesService.dataMiningReq);
    if (MathS.isNull(this.dataSource))
      return;
    this.zoneDictionary = await this.dataMiningAnalysesService.getZoneDictionary();
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    this.setRanges();
    this.closeTabService.saveDataForDMAAnalyze = this.dataSource;
  }

  private setRanges = () => {
    this.dataSource.forEach(item => {
      item.averageBetweenTwoMinute = parseFloat(MathS.getRange(item.averageBetweenTwoMinute));
      item.disconnectRate = parseFloat(MathS.getRange(item.disconnectRate));
      item.medianBetweenTwoMinute = parseFloat(MathS.getRange(item.medianBetweenTwoMinute));
      item.closedPercent = parseFloat(MathS.getRange(item.closedPercent));
    })
  }

}
