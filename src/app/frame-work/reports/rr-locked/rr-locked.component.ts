import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IDictionaryManager, ISearchInOrderTo, ITitleValue } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

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
  _isOrderByDate: boolean = true;
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];

  dataSource: IOnOffLoadFlat[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    private dialog: MatDialog,
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
      this.insertSelectedColumns();
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
    this._isOrderByDate ? (this.readingReportManagerService.lockedReq.readingPeriodId = null, this.readingReportManagerService.lockedReq.year = 0) : (this.readingReportManagerService.lockedReq.fromDate = '', this.readingReportManagerService.lockedReq.toDate = '');
    const temp = this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.lockedReq, this._isOrderByDate);
    if (temp)
      this.connectToServer();
  }

  insertSelectedColumns = () => {
    this._selectCols = this.readingReportManagerService.columnRRLocked();
    this._selectedColumns = this.readingReportManagerService.customizeSelectedColumns(this._selectCols);
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.portRRTest(ENInterfaces.ListRRLocked, this.readingReportManagerService.lockedReq);
    this.insertSelectedColumns();
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

}
