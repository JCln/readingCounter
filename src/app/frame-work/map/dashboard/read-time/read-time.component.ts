import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardTimed } from 'interfaces/inon-manage';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-read-time',
  templateUrl: './read-time.component.html',
  styleUrls: ['./read-time.component.scss']
})
export class ReadTimeComponent implements OnInit {
  _colReadTimed: IObjectIteratation[] = [];
  readTimed: IDashboardTimed;

  constructor(
    private dashboardService: DashboardService
  ) { }

  classWrapper = async () => {
    this.readTimed = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardReadingReportTimed);
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this._colReadTimed = this.dashboardService.columnDashboards();
  }
}
