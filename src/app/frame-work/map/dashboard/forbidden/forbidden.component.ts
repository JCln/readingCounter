import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardTimed } from 'interfaces/inon-manage';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {
  _col_forbidden: IObjectIteratation[] = [];
  forbidden: IDashboardTimed;

  constructor(
    private dashboardService: DashboardService
  ) { }

  classWrapper = async () => {
    this.forbidden = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardForbiddenTimed);
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this._col_forbidden = this.dashboardService.columnDashboards();
  }

}
