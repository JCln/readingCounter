import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardTimed } from 'interfaces/idashboard-map';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-dash-xy',
  templateUrl: './dash-xy.component.html',
  styleUrls: ['./dash-xy.component.scss']
})
export class DashXyComponent implements OnInit {
  dataSourceXY: IDashboardTimed;
  _colshownReading: IObjectIteratation[] = [];

  constructor(private dashboardService: DashboardService) { }

  classWrapper = async () => {
    this.dataSourceXY = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardXY);
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this._colshownReading = this.dashboardService.columnDashboards();
  }

}
