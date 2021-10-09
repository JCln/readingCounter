import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardTimed } from 'interfaces/inon-manage';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-dash-not-reader',
  templateUrl: './dash-not-reader.component.html',
  styleUrls: ['./dash-not-reader.component.scss']
})
export class DashNotReaderComponent implements OnInit {
  dataSourceNotReader: IDashboardTimed;
  _colshownReading: IObjectIteratation[] = [];

  constructor(private dashboardService: DashboardService) { }

  classWrapper = async () => {
    this.dataSourceNotReader = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardNotReader);
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this._colshownReading = this.dashboardService.columnDashboards();
  }
}
