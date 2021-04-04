import { Component, Input, OnInit } from '@angular/core';
import { IReadingReportDetails } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { OutputManagerService } from 'src/app/services/output-manager.service';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';

@Component({
  selector: 'app-details-res',
  templateUrl: './details-res.component.html',
  styleUrls: ['./details-res.component.scss']
})
export class DetailsResComponent implements OnInit {
  @Input() dataSource: IReadingReportDetails[] = [];
  karbariDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
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
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.postRRDetailsManager();
    if (!this.dataSource.length) {
      this.readingReportManagerService.emptyMessage();
      return;
    }
    this.karbariDictionary = await this.readingReportManagerService.getKarbariDictionary();
  }

  insertSelectedColumns = () => {
    this._selectCols = this.readingReportManagerService.columnSelectedRRDetails();
    this._selectedColumns = this.customizeSelectedColumns();
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
    const exportColumns = this._selectCols.map(col => ({title: col.header, dataKey: col.field}));
    this.outputManagerService.exportPdf(this.dataSource, exportColumns);
  }
  exportXLSX = () => {
    this.outputManagerService.exportExcel(this.dataSource);
  }
}
