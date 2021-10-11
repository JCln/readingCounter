import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardTimed } from 'interfaces/idashboard-map';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-dash-attempt',
  templateUrl: './dash-attempt.component.html',
  styleUrls: ['./dash-attempt.component.scss']
})
export class DashAttemptComponent implements OnInit {
  dataSourceAttemptAverage: IDashboardTimed;
  _colshownReading: IObjectIteratation[] = [];

  constructor(private dashboardService: DashboardService) { }

  classWrapper = async () => {
    this.dataSourceAttemptAverage = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardAttemptAverage);
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this._colshownReading = this.dashboardService.columnDashboards();
  }

}
