import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardTimed } from 'interfaces/idashboard-map';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-dash-query-rate',
  templateUrl: './dash-query-rate.component.html',
  styleUrls: ['./dash-query-rate.component.scss']
})
export class DashQueryRateComponent {
  _col_queryRate: IObjectIteratation[] = [];
  queryRate: IDashboardTimed;

  constructor(
    private dashboardService: DashboardService
  ) { }

  classWrapper = async () => {
    this.queryRate = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardQueryRate);
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this._col_queryRate = this.dashboardService.columnDashboards();
  }
}