import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardEditCount } from 'interfaces/idashboard-map';
import { DashboardService } from 'services/dashboard.service';
import { UtilsService } from 'services/utils.service';

@Component({
  selector: 'app-dash-edit-count',
  templateUrl: './dash-edit-count.component.html',
  styleUrls: ['./dash-edit-count.component.scss']
})
export class DashEditCountComponent implements OnInit {
  dataSourceEditCount: IDashboardEditCount;

  constructor(
    private dashboardService: DashboardService,
    private utilsService: UtilsService
  ) { }

  classWrapper = async () => {
    this.dataSourceEditCount = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardEditCount);
    this.setRanges();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  setRanges = () => {
    this.dataSourceEditCount.daily.ratio = +this.utilsService.getRange(this.dataSourceEditCount.daily.ratio);
    this.dataSourceEditCount.weekly.ratio = +this.utilsService.getRange(this.dataSourceEditCount.weekly.ratio);
    this.dataSourceEditCount.monthly.ratio = +this.utilsService.getRange(this.dataSourceEditCount.monthly.ratio);
    this.dataSourceEditCount.yearly.ratio = +this.utilsService.getRange(this.dataSourceEditCount.yearly.ratio);
  }

}
