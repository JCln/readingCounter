import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardTimed } from 'interfaces/idashboard-map';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-dash-query-count',
  templateUrl: './dash-query-count.component.html',
  styleUrls: ['./dash-query-count.component.scss']
})
export class DashQueryCountComponent {
  _col_queryCount: IObjectIteratation[] = [];
  queryCount: IDashboardTimed;

  constructor(
    private dashboardService: DashboardService
  ) { }

  classWrapper = async () => {
    this.queryCount = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardQueryCount);
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this._col_queryCount = this.dashboardService.columnDashboards();
  }
}
