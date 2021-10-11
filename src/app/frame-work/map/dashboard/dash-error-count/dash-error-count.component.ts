import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardTimed } from 'interfaces/idashboard-map';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-dash-error-count',
  templateUrl: './dash-error-count.component.html',
  styleUrls: ['./dash-error-count.component.scss']
})
export class DashErrorCountComponent implements OnInit {
  dataErrorCount: IDashboardTimed;
  _colshownReading: IObjectIteratation[] = [];

  constructor(private dashboardService: DashboardService) { }

  classWrapper = async () => {
    this.dataErrorCount = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardErrorCount);
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this._colshownReading = this.dashboardService.columnDashboards();
  }

}
