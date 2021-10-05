import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IReadingReportKarkard } from 'interfaces/imanage';
import { IDictionaryManager, ISearchInOrderTo, ITitleValue } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { UtilsService } from 'services/utils.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';


@Component({
  selector: 'app-karkard',
  templateUrl: './karkard.component.html',
  styleUrls: ['./karkard.component.scss']
})
export class KarkardComponent extends FactoryONE {
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
    private utilsService: UtilsService,
    public route: ActivatedRoute
  ) {
    super(interactionService)
  }

  routeToChartView = () => {
    this.readingReportManagerService.routeTo('/wr/rpts/mam/karkard/chart');
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForRRKarkard = null;
      this.verification();
    }
    if (this.closeTabService.saveDataForRRKarkard) {
      this.dataSource = this.closeTabService.saveDataForRRKarkard;
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
    // this._isOrderByDate ? (this.readingReportManagerService.karkardReq.readingPeriodId = null, this.readingReportManagerService.karkardReq.year = 0) : (this.readingReportManagerService.karkardReq.fromDate = '', this.readingReportManagerService.karkardReq.toDate = '');
    return this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.karkardReq, this._isOrderByDate);
  }
  verification = async () => {
    if (this.validation())
      document.activeElement.id === 'grid_view' ? this.connectToServer() : this.routeToChartView();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.readingReportManagerService.columnRRKarkard();
    this._selectedColumns = this.readingReportManagerService.customizeSelectedColumns(this._selectCols);
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.portRRTest(ENInterfaces.ListOFFKarkard, this.readingReportManagerService.karkardReq);
    this.karbariDictionary = await this.readingReportManagerService.getKarbariDictionary();
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    this.insertSelectedColumns();
    this.setGetRanges();
    this.closeTabService.saveDataForRRKarkard = this.dataSource;
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
      item.duration = parseFloat(this.utilsService.getRange(item.duration));
    })
  }

}
