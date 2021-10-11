import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardTimed } from 'interfaces/idashboard-map';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-dash-shown-readings',
  templateUrl: './dash-shown-readings.component.html',
  styleUrls: ['./dash-shown-readings.component.scss']
})
export class DashShownReadingsComponent implements OnInit {
  dataSourceShownReadings: IDashboardTimed;
  _colshownReading: IObjectIteratation[] = [];

  constructor(private dashboardService: DashboardService) { }

  classWrapper = async () => {
    this.dataSourceShownReadings = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardShownReadings);
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this._colshownReading = this.dashboardService.columnDashboards();
  }
}
