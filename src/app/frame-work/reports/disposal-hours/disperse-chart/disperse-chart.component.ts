import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { Subscription } from 'rxjs/internal/Subscription';
import { IReadingReportChartDisposeRes } from 'src/app/Interfaces/imanage';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';

@Component({
  selector: 'app-disperse-chart',
  templateUrl: './disperse-chart.component.html',
  styleUrls: ['./disperse-chart.component.scss']
})
export class DisperseChartComponent implements OnInit, OnDestroy {
  dataSource: IReadingReportChartDisposeRes;

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['8 - 10'], ['10 - 12'], ['12 - 14'], ['14 - 16'], ['16 - 18']];
  public pieChartDataProvince: SingleDataSet = [];
  public pieChartDataRegion: SingleDataSet = [];
  public pieChartDataZone: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  pieChartColor: any = [
    {
      backgroundColor: [
        'rgb(0, 69, 203)',
        'rgb(246, 62, 56)',
        'rgba(139, 136, 136, 0.9)',
        'rgb(213, 213, 213)',
        'rgba(255, 161, 181, 0.9)',
        'rgb(183, 28, 28)'
      ]
    }
  ]
  public pieChartLegend = true;
  public pieChartPlugins = [];
  // 

  subscription: Subscription[] = [];

  constructor(
    private readingReportManagerService: ReadingReportManagerService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  insertToPieChartProvince = () => {

    this.pieChartDataProvince.push(this.dataSource.inProvince._8To10);
    this.pieChartDataProvince.push(this.dataSource.inProvince._10To12);
    this.pieChartDataProvince.push(this.dataSource.inProvince._12To14);
    this.pieChartDataProvince.push(this.dataSource.inProvince._14To16);
    this.pieChartDataProvince.push(this.dataSource.inProvince._16To18);
  }
  insertToPieChartRegion = () => {
    this.pieChartDataRegion.push(this.dataSource.inRegion._8To10);
    this.pieChartDataRegion.push(this.dataSource.inRegion._10To12);
    this.pieChartDataRegion.push(this.dataSource.inRegion._12To14);
    this.pieChartDataRegion.push(this.dataSource.inRegion._14To16);
    this.pieChartDataRegion.push(this.dataSource.inRegion._16To18);
  }
  insertToPieChartZone = () => {
    this.pieChartDataZone.push(this.dataSource.inZone._8To10);
    this.pieChartDataZone.push(this.dataSource.inZone._10To12);
    this.pieChartDataZone.push(this.dataSource.inZone._12To14);
    this.pieChartDataZone.push(this.dataSource.inZone._14To16);
    this.pieChartDataZone.push(this.dataSource.inZone._16To18);
  }
  connectToServer = async () => {
    if (!this.readingReportManagerService.getRRReq()) {
      this.backToPrevious();
      return;
    }

    this.dataSource = await this.readingReportManagerService.postRRDisposalChartManager();
    this.insertToPieChartProvince();
    this.insertToPieChartZone();
    this.insertToPieChartRegion();
  }
  backToPrevious = () => {
    this.readingReportManagerService.backToPreviousPage();
  }
  ngOnInit(): void {
    this.connectToServer();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  refreshTable = () => {
    this.ngOnInit();
  }

}
