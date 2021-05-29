import { Component, OnInit } from '@angular/core';
import { IDashboardTraverseTimed } from 'src/app/Interfaces/inon-manage';
import { IObjectIteratation } from 'src/app/Interfaces/ioverall-config';
import { DashboardService } from 'src/app/services/dashboard.service';


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
    this.traverseTime = await this.dashboardService.getDashboardTraverseTimed();
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this._col_traverseTime = this.dashboardService.columnDashboardTimed();
  }


}
