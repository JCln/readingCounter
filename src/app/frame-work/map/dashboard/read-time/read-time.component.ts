import { Component, OnInit } from '@angular/core';
import { IDashboardTimed } from 'src/app/Interfaces/inon-manage';
import { IObjectIteratation } from 'src/app/Interfaces/ioverall-config';
import { DashboardService } from 'src/app/services/dashboard.service';

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
    this.readTimed = await this.dashboardService.getDashboardReadTimed();
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this._colReadTimed = this.dashboardService.columnDashboardReadTimed();
  }
}
