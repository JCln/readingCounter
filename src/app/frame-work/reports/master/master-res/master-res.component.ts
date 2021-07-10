import { Component, Input, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IReadingReportMaster } from 'interfaces/imanage';
import { OutputManagerService } from 'services/output-manager.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { UtilsService } from 'services/utils.service';

@Component({
  selector: 'app-master-res',
  templateUrl: './master-res.component.html',
  styleUrls: ['./master-res.component.scss']
})
export class MasterResComponent implements OnInit {
  @Input() dataSource: IReadingReportMaster[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public outputManagerService: OutputManagerService,
    private utilsService: UtilsService
  ) {
  }

  insertSelectedColumns = () => {
    this._selectCols = this.readingReportManagerService.columnRRMaster();
    this._selectedColumns = this.readingReportManagerService.customizeSelectedColumns(this._selectCols);
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.postRRManager('wr/rpts/exm/master', ENInterfaces.ReadingReportMasterWithParam, 'readingReportReq');
    if (this.utilsService.isNull(this.dataSource))
      return;

    this.insertSelectedColumns();
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