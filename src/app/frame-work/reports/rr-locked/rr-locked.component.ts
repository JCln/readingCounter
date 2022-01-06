import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IDictionaryManager, ISearchInOrderTo, ITitleValue } from 'interfaces/ioverall-config';
import { SortEvent } from 'primeng/api';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-rr-locked',
  templateUrl: './rr-locked.component.html',
  styleUrls: ['./rr-locked.component.scss']
})
export class RrLockedComponent extends FactoryONE {
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
  rowIndex: number = 0;
  woumInfosDataSource: IOnOffLoadFlat;
  showWouImages: boolean = false;
  _isOrderByDate: boolean = true;
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];

  zoneDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];

  dataSource: IOnOffLoadFlat[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    private closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.verification();
    }
    if (this.closeTabService.saveDataForRRLocked) {
      this.dataSource = this.closeTabService.saveDataForRRLocked;
      this.converts();
    }
    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
    this.receiveYear();
  }
  converts = async () => {
    const tempZone: number = parseInt(this.dataSource[0].zoneId.toString());
    if (tempZone) {
      this.counterStateDictionary = await this.readingReportManagerService.getCounterStateByZoneDictionary(tempZone);
      this.counterStateByCodeDictionary = await this.readingReportManagerService.getCounterStateByCodeDictionary(tempZone);
    }
    this.karbariDictionary = await this.readingReportManagerService.getKarbariDictionary();
    this.karbariDictionaryCode = await this.readingReportManagerService.getKarbariDictionaryCode();
    this.qotrDictionary = await this.readingReportManagerService.getQotrDictionary();

    // Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    Converter.convertIdToTitle(this.dataSource, this.counterStateDictionary, 'counterStateId');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'counterStateCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');

    this.setDynamicRages();
  }
  receiveYear = () => {
    this._years = this.readingReportManagerService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.getReadingPeriodDictionary(this._selectedKindId);
  }
  verification = async () => {
    this._isOrderByDate ? (this.readingReportManagerService.lockedReq.readingPeriodId = null, this.readingReportManagerService.lockedReq.year = 0) : (this.readingReportManagerService.lockedReq.fromDate = '', this.readingReportManagerService.lockedReq.toDate = '');
    const temp = this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.lockedReq, this._isOrderByDate);
    if (temp)
      this.connectToServer();
  }

  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.portRRTest(ENInterfaces.ListRRLocked, this.readingReportManagerService.lockedReq);
    this.converts();
    this.closeTabService.saveDataForRRLocked = this.dataSource;
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  getReadingReportTitles = async ($event) => {
    const a = await this.readingReportManagerService.postById(ENInterfaces.ReadingReportTitles, $event)
    if (a.length) {
      this.readingReportManagerService.showResDialog(a, false, EN_messages.insert_rrDetails);
      return;
    }
    this.readingReportManagerService.snackEmptyValue();
  }
  setDynamicRages = () => {
    this.dataSource.forEach(item => {
      item.preAverage = +MathS.getRange(item.preAverage);
      item.x = MathS.getRange(item.x);
      item.y = MathS.getRange(item.y);
      item.gisAccuracy = MathS.getRange(item.gisAccuracy);
      item.newRate = +MathS.getRange(item.newRate);
    })
  }
  carouselCancelClicked = () => {
    this.showWouImages = false;
  }
  routeToWoui = (object: any) => {
    this.woumInfosDataSource = object['dataSource'];
    this.rowIndex = object['ri'];
    this.showWouImages = true;
    scrollTo(0, 0);
  }
  carouselWOUMNextItem = () => {
    this.rowIndex > this.dataSource.length - 1 ? this.rowIndex = 0 : this.rowIndex++;
    this.woumInfosDataSource = this.dataSource[this.rowIndex];
  }
  carouselWOUMPrevItem = () => {
    this.rowIndex < 1 ? this.rowIndex = this.dataSource.length : this.rowIndex--;
    this.woumInfosDataSource = this.dataSource[this.rowIndex];
  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }
}
