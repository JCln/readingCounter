import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardMoshtarakCount } from 'interfaces/idashboard-map';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-dash-moshtarak-count',
  templateUrl: './dash-moshtarak-count.component.html',
  styleUrls: ['./dash-moshtarak-count.component.scss']
})
export class DashMoshtarakCountComponent implements OnInit {
  dataSourceMoshtarakCount: IDashboardMoshtarakCount[] = [];
  _canShow: boolean = false;

  constructor(private dashboardService: DashboardService) { }

  classWrapper = async () => {
    this.dataSourceMoshtarakCount = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardMoshtarakCount);
    if (this.dashboardService.isNullVals(this.dataSourceMoshtarakCount))
      this._canShow = true;
  }
  ngOnInit(): void {
    this.classWrapper();
  }

}
