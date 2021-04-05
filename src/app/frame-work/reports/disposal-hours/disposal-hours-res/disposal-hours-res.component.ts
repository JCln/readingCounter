import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { IReadingReportDisposalHours } from 'src/app/Interfaces/imanage';
import { OutputManagerService } from 'src/app/services/output-manager.service';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';

@Component({
  selector: 'app-disposal-hours-res',
  templateUrl: './disposal-hours-res.component.html',
  styleUrls: ['./disposal-hours-res.component.scss']
})
export class DisposalHoursResComponent implements OnInit {
  @Input() dataSource: IReadingReportDisposalHours[] = [];
  subscription: Subscription[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private readingReportManagerService: ReadingReportManagerService,
    public outputManagerService: OutputManagerService
  ) {
  }

  customizeSelectedColumns = () => {
    return this._selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.postRRDisposalHoursManager();
    if (!this.dataSource.length) {
      this.readingReportManagerService.emptyMessage();
      return;
    }
  }
  insertSelectedColumns = () => {
    this._selectCols = this.readingReportManagerService.columnSelectedRRKarkard();
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
  
}
