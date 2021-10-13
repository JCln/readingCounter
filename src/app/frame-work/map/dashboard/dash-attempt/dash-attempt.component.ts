import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardTimed } from 'interfaces/idashboard-map';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DashboardService } from 'services/dashboard.service';
import { UtilsService } from 'services/utils.service';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-dash-attempt',
  templateUrl: './dash-attempt.component.html',
  styleUrls: ['./dash-attempt.component.scss']
})
export class DashAttemptComponent implements OnInit {
  dataSourceAttemptAverage: IDashboardTimed;
  _colshownReading: IObjectIteratation[] = [];

  constructor(
    private dashboardService: DashboardService,
    private utilsService: UtilsService
  ) { }

  classWrapper = async () => {
    this.dataSourceAttemptAverage = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardAttemptAverage);
    this.setRanges();
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this._colshownReading = this.dashboardService.columnDashboards();
  }
  private setRanges = () => {
    this.dataSourceAttemptAverage.inDayCount = +MathS.getRange(this.dataSourceAttemptAverage.inDayCount);
    this.dataSourceAttemptAverage.inWeekCount = +MathS.getRange(this.dataSourceAttemptAverage.inWeekCount);
    this.dataSourceAttemptAverage.inMonthCount = +MathS.getRange(this.dataSourceAttemptAverage.inMonthCount);
    this.dataSourceAttemptAverage.inYearCount = +MathS.getRange(this.dataSourceAttemptAverage.inYearCount);
  }
}
