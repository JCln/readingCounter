import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardTimed } from 'interfaces/idashboard-map';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-dash-locked',
  templateUrl: './dash-locked.component.html',
  styleUrls: ['./dash-locked.component.scss']
})
export class DashLockedComponent implements OnInit {
  dataSourceLocked: IDashboardTimed;
  _colshownReading: IObjectIteratation[] = [];

  constructor(private dashboardService: DashboardService) { }

  classWrapper = async () => {
    this.dataSourceLocked = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardLockedCount);
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this._colshownReading = this.dashboardService.columnDashboards();
  }

}
