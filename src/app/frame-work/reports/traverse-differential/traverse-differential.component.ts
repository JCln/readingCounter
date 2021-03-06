import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ISearchInOrderTo, ITitleValue } from 'interfaces/ioverall-config';
import { IReadingReportTraverseDifferentialRes } from 'interfaces/ireports';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { EN_Routes } from 'src/app/Interfaces/routes.enum';

@Component({
  selector: 'app-traverse-differential',
  templateUrl: './traverse-differential.component.html',
  styleUrls: ['./traverse-differential.component.scss']
})
export class TraverseDifferentialComponent extends FactoryONE {
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
  dataSource: IReadingReportTraverseDifferentialRes[] = [];
  karbariDictionaryByCode: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  _isOrderByDate: boolean = true;
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  traverseDiffrentialDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];


  constructor(
    public readingReportManagerService: ReadingReportManagerService,

    public route: ActivatedRoute,
    private closeTabService: CloseTabService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForRRTraverseDifferential = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
      this.verification();
    }
    if (this.closeTabService.saveDataForRRTraverseDifferential) {
      this.dataSource = this.closeTabService.saveDataForRRTraverseDifferential;
    }
    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.traverseDiffrentialDictionary = await this.readingReportManagerService.getTraverseDiffrentialDictionary();
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
    this.receiveYear();
  }
  routeToChartView = () => {
    this.readingReportManagerService.routeTo(EN_Routes.wrrptsmamtrvchchart);
  }
  receiveYear = () => {
    this._years = this.readingReportManagerService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.getReadingPeriodDictionary(this._selectedKindId);
  }
  validation = (): boolean => {
    this._isOrderByDate ? (this.readingReportManagerService.trvchReq.readingPeriodId = null, this.readingReportManagerService.trvchReq.year = 0) : (this.readingReportManagerService.trvchReq.fromDate = '', this.readingReportManagerService.trvchReq.toDate = '');
    return this.readingReportManagerService.verificationRRTraverseDifferential(this.readingReportManagerService.trvchReq, this._isOrderByDate);
  }
  verification = async () => {
    if (this.validation())
      document.activeElement.id == 'grid_view' ? this.connectToServer() : this.routeToChartView();
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.portRRTest(ENInterfaces.ListTraverseDifferential, this.readingReportManagerService.trvchReq);
    this.karbariDictionaryByCode = await this.readingReportManagerService.getKarbariDictionaryCode();

    if (this.readingReportManagerService.trvchReq.traverseType == 0) {
      Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryByCode, 'newValue');
      Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryByCode, 'value');
    }
    this.closeTabService.saveDataForRRTraverseDifferential = this.dataSource;
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

}
