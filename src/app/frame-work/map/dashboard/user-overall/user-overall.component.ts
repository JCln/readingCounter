import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardUsersInfo } from 'interfaces/idashboard-map';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-user-overall',
  templateUrl: './user-overall.component.html',
  styleUrls: ['./user-overall.component.scss']
})
export class UserOverallComponent implements OnInit {
  _colUsersInfo: IObjectIteratation[] = [];
  usersInfo: IDashboardUsersInfo;

  constructor(
    private dashboardService: DashboardService
  ) { }

  classWrapper = async () => {
    this.usersInfo = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardUsersOverall);
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this._colUsersInfo = this.dashboardService.columnDashboardUserOverall();
  }
}
