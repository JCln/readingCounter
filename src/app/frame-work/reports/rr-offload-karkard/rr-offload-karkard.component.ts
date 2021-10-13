import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ISearchInOrderTo, ITitleValue } from 'interfaces/ioverall-config';
import { IReadingReportKarkard } from 'interfaces/ireports';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { UtilsService } from 'services/utils.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-rr-offload-karkard',
  templateUrl: './rr-offload-karkard.component.html',
  styleUrls: ['./rr-offload-karkard.component.scss']
})
export class RrOffloadKarkardComponent extends FactoryONE {
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

  dataSource: IReadingReportKarkard[] = [];
  karbariDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];
  _isOrderByDate: boolean = true;
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];

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
      this.closeTabService.saveDataForRROffloadedKarkard = null;
      this.verification();
    }
    if (this.closeTabService.saveDataForRROffloadedKarkard) {
      this.dataSource = this.closeTabService.saveDataForRROffloadedKarkard;
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
  validation = (): boolean => {
    // this._isOrderByDate ? (this.readingReportManagerService.karkardOffloadReq.readingPeriodId = null, this.readingReportManagerService.karkardOffloadReq.year = 0) : (this.readingReportManagerService.karkardOffloadReq.fromDate = '', this.readingReportManagerService.karkardOffloadReq.toDate = '');
    return this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.karkardOffloadReq, this._isOrderByDate);
  }
  verification = async () => {
    if (this.validation())
      this.connectToServer();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.readingReportManagerService.columnRRKarkardOffloaded();
    this._selectedColumns = this.readingReportManagerService.customizeSelectedColumns(this._selectCols);
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.portRRTest(ENInterfaces.ListKarkardOffloaded, this.readingReportManagerService.karkardOffloadReq);
    this.karbariDictionary = await this.readingReportManagerService.getKarbariDictionary();
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    this.insertSelectedColumns();
    this.setGetRanges();
    this.closeTabService.saveDataForRROffloadedKarkard = this.dataSource;
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  refreshTable = () => {
    if (this.validation())
      this.connectToServer();
  }
  private setGetRanges = () => {
    this.dataSource.forEach(item => {
      item.duration = parseFloat(MathS.getRange(item.duration));
    })
  }


}
