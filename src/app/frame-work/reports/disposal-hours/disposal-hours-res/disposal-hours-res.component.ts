import { Component, Input, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IReadingReportDisposalHours } from 'interfaces/imanage';
import { OutputManagerService } from 'services/output-manager.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { UtilsService } from 'services/utils.service';

@Component({
  selector: 'app-disposal-hours-res',
  templateUrl: './disposal-hours-res.component.html',
  styleUrls: ['./disposal-hours-res.component.scss']
})
export class DisposalHoursResComponent implements OnInit {
  @Input() dataSource: IReadingReportDisposalHours[] = [];
 

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public outputManagerService: OutputManagerService,
    private utilsService: UtilsService
  ) {
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.postRRManager('wr/rpts/mam/dh', ENInterfaces.ListDispersalHours, 'readingReportReq');
    if (this.utilsService.isNull(this.dataSource))
      return;

    this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.readingReportManagerService.columnRRDisposalHours();
    this._selectedColumns = this.readingReportManagerService.customizeSelectedColumns(this._selectCols);
  }
  ngOnInit(): void {
    this.connectToServer();
  }
  refreshTable = () => {
    this.ngOnInit();
  }
  backToPrevious = () => {
    this.readingReportManagerService.backToPreviousPage();
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
}
