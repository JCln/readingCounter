import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardTraverseTimed } from 'interfaces/inon-manage';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DashboardService } from 'services/dashboard.service';


@Component({
  selector: 'app-trv-time',
  templateUrl: './trv-time.component.html',
  styleUrls: ['./trv-time.component.scss']
})
export class TrvTimeComponent implements OnInit {
  _col_traverseTime: IObjectIteratation[] = [];
  traverseTime: IDashboardTraverseTimed;

  constructor(
    private dashboardService: DashboardService
  ) { }

  classWrapper = async () => {
    this.traverseTime = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardTraverseTimed);
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this._col_traverseTime = this.dashboardService.columnDashboards();
  }


}
