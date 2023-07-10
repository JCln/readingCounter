import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardTimed } from 'interfaces/idashboard-map';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-dash-request-rate',
  templateUrl: './dash-request-rate.component.html',
  styleUrls: ['./dash-request-rate.component.scss']
})
export class DashRequestRateComponent {
  _col_requestRate: IObjectIteratation[] = [];
  requestRate: IDashboardTimed;

  constructor(
    private dashboardService: DashboardService
  ) { }

  classWrapper = async () => {
    this.requestRate = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardRequestRate);
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this._col_requestRate = this.dashboardService.columnDashboards();
  }
}