import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardDateDifference } from 'interfaces/idashboard-map';
import { DashboardService } from 'services/dashboard.service';
import { UtilsService } from 'services/utils.service';

@Component({
  selector: 'app-dash-date-difference',
  templateUrl: './dash-date-difference.component.html',
  styleUrls: ['./dash-date-difference.component.scss']
})
export class DashDateDifferenceComponent implements OnInit {
  dataSourceDateDifference: IDashboardDateDifference;

  constructor(
    private dashboardService: DashboardService,
    private utilsService: UtilsService
  ) { }

  classWrapper = async () => {
    this.dataSourceDateDifference = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardDateDifference);
    this.setRange();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  setRange = () => {
    this.dataSourceDateDifference.yesterday.average = +this.utilsService.getRange(this.dataSourceDateDifference.yesterday.average);
    this.dataSourceDateDifference.yesterday.median = +this.utilsService.getRange(this.dataSourceDateDifference.yesterday.median);
    this.dataSourceDateDifference.yesterday.standardDeviation = +this.utilsService.getRange(this.dataSourceDateDifference.yesterday.standardDeviation);
    this.dataSourceDateDifference.yesterday.variance = +this.utilsService.getRange(this.dataSourceDateDifference.yesterday.variance);
    this.dataSourceDateDifference.weekly.average = +this.utilsService.getRange(this.dataSourceDateDifference.weekly.average);
    this.dataSourceDateDifference.weekly.median = +this.utilsService.getRange(this.dataSourceDateDifference.weekly.median);
    this.dataSourceDateDifference.weekly.standardDeviation = +this.utilsService.getRange(this.dataSourceDateDifference.weekly.standardDeviation);
    this.dataSourceDateDifference.weekly.variance = +this.utilsService.getRange(this.dataSourceDateDifference.weekly.variance);
    this.dataSourceDateDifference.monthly.average = +this.utilsService.getRange(this.dataSourceDateDifference.monthly.average);
    this.dataSourceDateDifference.monthly.median = +this.utilsService.getRange(this.dataSourceDateDifference.monthly.median);
    this.dataSourceDateDifference.monthly.standardDeviation = +this.utilsService.getRange(this.dataSourceDateDifference.monthly.standardDeviation);
    this.dataSourceDateDifference.monthly.variance = +this.utilsService.getRange(this.dataSourceDateDifference.monthly.variance);
    this.dataSourceDateDifference.annualy.average = +this.utilsService.getRange(this.dataSourceDateDifference.annualy.average);
    this.dataSourceDateDifference.annualy.median = +this.utilsService.getRange(this.dataSourceDateDifference.annualy.median);
    this.dataSourceDateDifference.annualy.standardDeviation = +this.utilsService.getRange(this.dataSourceDateDifference.annualy.standardDeviation);
    this.dataSourceDateDifference.annualy.variance = +this.utilsService.getRange(this.dataSourceDateDifference.annualy.variance);

  }

}
