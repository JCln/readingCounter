import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ISearchInOrderTo, ITitleValue } from 'interfaces/ioverall-config';
import { IReadingReportKarkard } from 'interfaces/ireports';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { UtilsService } from 'services/utils.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';


@Component({
  selector: 'app-karkard-dayly',
  templateUrl: './karkard-dayly.component.html',
  styleUrls: ['./karkard-dayly.component.scss']
})
export class KarkardDaylyComponent extends FactoryONE {
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
  zoneDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];

  dataSource: IReadingReportKarkard[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private utilsService: UtilsService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForRRkarkardDaily = null;
      this.verification();
    }
    if (this.closeTabService.saveDataForRRkarkardDaily) {
      this.dataSource = this.closeTabService.saveDataForRRkarkardDaily;
      this.insertSelectedColumns();
      this.setGetRanges();
    }
    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
    this.receiveYear();
  }
  receiveYear = () => {
    this._years = this.readingReportManagerService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.getReadingPeriodDictionary(this._selectedKindId);
  }
  verification = async () => {
    this._isOrderByDate ? (this.readingReportManagerService.karkardDailyReq.readingPeriodId = null, this.readingReportManagerService.karkardDailyReq.year = 0) : (this.readingReportManagerService.karkardDailyReq.fromDate = '', this.readingReportManagerService.karkardDailyReq.toDate = '');
    const temp = this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.karkardDailyReq, this._isOrderByDate);
    if (temp)
      this.connectToServer();
  }

  insertSelectedColumns = () => {
    this._selectCols = this.readingReportManagerService.columnRRKarkardDaly();
    this._selectedColumns = this.readingReportManagerService.customizeSelectedColumns(this._selectCols);
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.portRRTest(ENInterfaces.ListKarkardDaily, this.readingReportManagerService.karkardDailyReq);
    this.insertSelectedColumns();
    this.setGetRanges();
    this.closeTabService.saveDataForRRkarkardDaily = this.dataSource;
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  private setGetRanges = () => {
    this.dataSource.forEach(item => {
      item.duration = parseFloat(MathS.getRange(item.duration));
    })
  }
}
