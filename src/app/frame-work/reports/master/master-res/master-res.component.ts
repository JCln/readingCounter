import { Component, Input, OnInit } from '@angular/core';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { IReadingReportMaster } from 'src/app/Interfaces/imanage';
import { OutputManagerService } from 'src/app/services/output-manager.service';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';
import { UtilsService } from 'src/app/services/utils.service';

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