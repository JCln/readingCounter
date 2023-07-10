import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardTimed } from 'interfaces/idashboard-map';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-dash-request-log-count',
  templateUrl: './dash-request-log-count.component.html',
  styleUrls: ['./dash-request-log-count.component.scss']
})
export class DashRequestLogCountComponent {
  _col_requestLog: IObjectIteratation[] = [];
  requestLogs: IDashboardTimed;

  constructor(
    private dashboardService: DashboardService
  ) { }

  classWrapper = async () => {
    this.requestLogs = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardRequestLogCount);
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this._col_requestLog = this.dashboardService.columnDashboards();
  }

}
