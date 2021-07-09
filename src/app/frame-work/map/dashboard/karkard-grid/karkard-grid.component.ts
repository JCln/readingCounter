import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-karkard-grid',
  templateUrl: './karkard-grid.component.html',
  styleUrls: ['./karkard-grid.component.scss']
})
export class KarkardGridComponent implements OnInit {
  @Input() dataSource: any[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private dashboardService: DashboardService
  ) {
  }

  customizeSelectedColumns = () => {
    return this._selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }

  insertSelectedColumns = () => {
    // this._selectCols = this.readingReportManagerService.columnSelectedRRTraverseDifferential();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  connectToServer = async () => {

    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.connectToServer();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    // this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  refreshTable = () => {
    this.ngOnInit();
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
}
