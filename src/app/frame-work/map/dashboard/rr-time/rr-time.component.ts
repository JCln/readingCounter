import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'services/dashboard.service';
import { IDashboardTimed } from 'src/app/Interfaces/inon-manage';
import { IObjectIteratation } from 'src/app/Interfaces/ioverall-config';

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
    this.readingReportTimed = await this.dashboardService.getDashboardReadingReport();
    console.log(this.readingReportTimed);
    
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this._colReadingReportTimed = this.dashboardService.columnDashboardReadingReportTimed();
  }

}
