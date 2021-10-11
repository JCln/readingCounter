import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardTimed } from 'interfaces/idashboard-map';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-rr-time',
  templateUrl: './rr-time.component.html',
  styleUrls: ['./rr-time.component.scss']
})
export class RrTimeComponent implements OnInit {
  _colReadingReportTimed: IObjectIteratation[] = [];
  readingReportTimed: IDashboardTimed;

  constructor(
    private dashboardService: DashboardService
  ) { }

  classWrapper = async () => {
    this.readingReportTimed = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardReadTimed);
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this._colReadingReportTimed = this.dashboardService.columnDashboards();
  }

}
