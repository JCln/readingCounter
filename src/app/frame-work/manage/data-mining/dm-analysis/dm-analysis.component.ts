import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ISearchInOrderTo, ITitleValue } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { DataMiningAnalysesService } from 'services/data-mining-analyses.service';
import { InteractionService } from 'services/interaction.service';
import { UtilsService } from 'services/utils.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { IReadingTimeRes } from 'src/app/Interfaces/data-mining';

@Component({
  selector: 'app-dm-analysis',
  templateUrl: './dm-analysis.component.html',
  styleUrls: ['./dm-analysis.component.scss']
})
export class DmAnalysisComponent extends FactoryONE {
  isCollapsed: boolean = false;
  searchInOrderTo: ISearchInOrderTo[] = [
    {
      title: 'تاریخ',
      isSelected: true
    },
    {
      title: 'دوره',
      isSelected: false
    }
  ]
  _isOrderByDate: boolean = true;
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  dataSource: IReadingTimeRes[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    public dataMiningAnalysesService: DataMiningAnalysesService,
    public interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private utilsService: UtilsService
  ) {
    super(interactionService);
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForDMAAnalyze = null;
      this.verification();
    }
    if (this.closeTabService.saveDataForDMAAnalyze) {
      this.dataSource = this.closeTabService.saveDataForDMAAnalyze;
      this.insertSelectedColumns();
      this.setRanges();
    }

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
    this._isOrderByDate ? (this.dataMiningAnalysesService.dataMiningReq.readingPeriodId = null, this.dataMiningAnalysesService.dataMiningReq.year = 0) : (this.dataMiningAnalysesService.dataMiningReq.fromDate = '', this.dataMiningAnalysesService.dataMiningReq.toDate = '')
    const temp = this.dataMiningAnalysesService.verification(this.dataMiningAnalysesService.dataMiningReq, this._isOrderByDate);
    if (temp)
      this.connectToServer();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.dataMiningAnalysesService.columnDataMiningAnalyses();
    this._selectedColumns = Converter.customizeSelectedColumns(this._selectCols);
  }
  connectToServer = async () => {
    this.dataSource = await this.dataMiningAnalysesService.postDMManager(ENInterfaces.dataMiningReadingTime, this.dataMiningAnalysesService.dataMiningReq);
    if (this.utilsService.isNull(this.dataSource))
      return;
    this.zoneDictionary = await this.dataMiningAnalysesService.getZoneDictionary();
    this.insertSelectedColumns();
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    this.setRanges();
    this.closeTabService.saveDataForDMAAnalyze = this.dataSource;
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  private setRanges = () => {
    this.dataSource.forEach(item => {
      item.averageBetweenTwoMinute = parseFloat(this.utilsService.getRange(item.averageBetweenTwoMinute));
      item.disconnectRate = parseFloat(this.utilsService.getRange(item.disconnectRate));
      item.medianBetweenTwoMinute = parseFloat(this.utilsService.getRange(item.medianBetweenTwoMinute));
      item.closedPercent = parseFloat(this.utilsService.getRange(item.closedPercent));
    })
  }

}
