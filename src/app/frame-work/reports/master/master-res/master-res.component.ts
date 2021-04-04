import { Component, Input, OnInit } from '@angular/core';
import { IReadingReportMaster } from 'src/app/Interfaces/imanage';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { OutputManagerService } from 'src/app/services/output-manager.service';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';

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
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private readingReportManagerService: ReadingReportManagerService,
    private outputManagerService: OutputManagerService
  ) {
  }

  customizeSelectedColumns = () => {
    return this._selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  insertSelectedColumns = () => {
    this._selectCols = this.readingReportManagerService.columnSelectedRRMaster();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.postRRMasterManager();
    if (!this.dataSource.length)
      this.readingReportManagerService.emptyMessage();
  }
  ngOnInit(): void {
    this.connectToServer();
    this.insertSelectedColumns();
  }
  refreshTable = () => {
    this.ngOnInit();
  }
  backToPrevious = () => {
    this.readingReportManagerService.backToPreviousPage();
  }
  exportPDF = () => {
    this.outputManagerService.exportPdf(this.dataSource);
  }
}