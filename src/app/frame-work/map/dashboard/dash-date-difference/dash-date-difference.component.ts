import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardDateDifference } from 'interfaces/idashboard-map';
import { DashboardService } from 'services/dashboard.service';
import { UtilsService } from 'services/utils.service';
import { MathS } from 'src/app/classes/math-s';

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
    this.dataSourceDateDifference.yesterday.average = +MathS.getRange(this.dataSourceDateDifference.yesterday.average);
    this.dataSourceDateDifference.yesterday.median = +MathS.getRange(this.dataSourceDateDifference.yesterday.median);
    this.dataSourceDateDifference.yesterday.standardDeviation = +MathS.getRange(this.dataSourceDateDifference.yesterday.standardDeviation);
    this.dataSourceDateDifference.yesterday.variance = +MathS.getRange(this.dataSourceDateDifference.yesterday.variance);
    this.dataSourceDateDifference.weekly.average = +MathS.getRange(this.dataSourceDateDifference.weekly.average);
    this.dataSourceDateDifference.weekly.median = +MathS.getRange(this.dataSourceDateDifference.weekly.median);
    this.dataSourceDateDifference.weekly.standardDeviation = +MathS.getRange(this.dataSourceDateDifference.weekly.standardDeviation);
    this.dataSourceDateDifference.weekly.variance = +MathS.getRange(this.dataSourceDateDifference.weekly.variance);
    this.dataSourceDateDifference.monthly.average = +MathS.getRange(this.dataSourceDateDifference.monthly.average);
    this.dataSourceDateDifference.monthly.median = +MathS.getRange(this.dataSourceDateDifference.monthly.median);
    this.dataSourceDateDifference.monthly.standardDeviation = +MathS.getRange(this.dataSourceDateDifference.monthly.standardDeviation);
    this.dataSourceDateDifference.monthly.variance = +MathS.getRange(this.dataSourceDateDifference.monthly.variance);
    this.dataSourceDateDifference.annualy.average = +MathS.getRange(this.dataSourceDateDifference.annualy.average);
    this.dataSourceDateDifference.annualy.median = +MathS.getRange(this.dataSourceDateDifference.annualy.median);
    this.dataSourceDateDifference.annualy.standardDeviation = +MathS.getRange(this.dataSourceDateDifference.annualy.standardDeviation);
    this.dataSourceDateDifference.annualy.variance = +MathS.getRange(this.dataSourceDateDifference.annualy.variance);

  }

}
