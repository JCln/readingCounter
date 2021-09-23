import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IReadingReportMaster, IReadingReportReq } from 'interfaces/imanage';
import { IDictionaryManager, ISearchInOrderTo, ITitleValue } from 'interfaces/ioverall-config';
import { ENReadingReports } from 'interfaces/reading-reports';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent extends FactoryONE {
  readingReportReq: IReadingReportReq = {
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: 1400
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
    public interactionService: InteractionService,
    private closeTabService: CloseTabService
  ) {
    super(interactionService);
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
      this.insertSelectedColumns();
    }
    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.receiveYear();
  }
  receiveFromDateJalali = ($event: string) => {
    this.readingReportManagerService.masterReq.fromDate = $event;
  }
  receiveToDateJalali = ($event: string) => {
    if (this.readingReportManagerService.masterReq.toDate.length == 0) {
      this.readingReportReq.toDate = $event;
      this.readingReportManagerService.masterReq.toDate = $event;
    }
    else
      this.readingReportReq.toDate = this.readingReportManagerService.masterReq.toDate;
    console.log($event);
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
      this.readingReportManagerService.insertToReadingReport(ENReadingReports.master, this.readingReportReq);
      this.connectToServer();
    }
  }

  insertSelectedColumns = () => {
    this._selectCols = this.readingReportManagerService.columnRRMaster();
    this._selectedColumns = this.readingReportManagerService.customizeSelectedColumns(this._selectCols);
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.portRRTest(ENInterfaces.ReadingReportMasterWithParam, this.readingReportReq);
    this.insertSelectedColumns();
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
