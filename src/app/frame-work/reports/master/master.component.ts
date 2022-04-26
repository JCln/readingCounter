import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ISearchInOrderTo, ITitleValue } from 'interfaces/ioverall-config';
import { IReadingReportMaster, IReadingReportReq } from 'interfaces/ireports';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent extends FactoryONE {
  isCollapsed: boolean = false;
  readingReportReq: IReadingReportReq = {
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: 1401
  }
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
  dataSource: IReadingReportMaster[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  _isOrderByDate: boolean = true;
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];


  constructor(
    public readingReportManagerService: ReadingReportManagerService,

    private closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForRRMaster = null;
      this.verification();
    }
    this.readingReportReq = this.readingReportManagerService.masterReq;
    // console.log(this.readingReportReq);

    if (this.closeTabService.saveDataForRRMaster) {
      this.dataSource = this.closeTabService.saveDataForRRMaster;
    }
    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.receiveYear();
  }
  receiveYear = () => {
    this._years = this.readingReportManagerService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.getReadingPeriodDictionary(this._selectedKindId);
  }
  verification = async () => {
    this._isOrderByDate ? (this.readingReportReq.readingPeriodId = null, this.readingReportReq.year = 0) : (this.readingReportReq.fromDate = '', this.readingReportReq.toDate = '')
    const temp = this.readingReportManagerService.verificationRRShared(this.readingReportReq, this._isOrderByDate);
    if (temp) {
      this.connectToServer();
    }
  }

  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.portRRTest(ENInterfaces.ReadingReportMasterWithParam, this.readingReportReq);
    this.closeTabService.saveDataForRRMaster = this.dataSource;
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
}
