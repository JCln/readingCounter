import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { Subscription } from 'rxjs/internal/Subscription';
import { IReadingReportChartTraverseDifferential } from 'src/app/Interfaces/imanage';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';

@Component({
  selector: 'app-trvch-chart',
  templateUrl: './trvch-chart.component.html',
  styleUrls: ['./trvch-chart.component.scss']
})
export class TrvchChartComponent implements OnInit {
  dataSource: IReadingReportChartTraverseDifferential;

  private defaultOptions = {
    fontFamily: 'Blotus',
    fontSize: 18,
    fontStyle: 'bold',
    fontColor: 'rgb(112, 112, 112)'
  }
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: true,
      position: 'right',
      labels: this.defaultOptions
    },
    tooltips: {
      footerFontFamily: 'Blotus',
      bodyFontFamily: 'Blotus',
      titleFontFamily: 'Blotus',
      bodyFontSize: 18,
      titleFontSize: 18,
      footerFontSize: 18,
      bodyFontStyle: 'bold',
      enabled: true,
      callbacks: {
        label: function (tooltipItem, data) {
          let label = '%' + data.labels[tooltipItem.index];
          let count = data
            .datasets[tooltipItem.datasetIndex]
            .data[tooltipItem.index];
          return label + " : " + count;
        }
      }
    }
  };
  public pieChartLabels: Label[] = [['آحاد'], ['کاربری'], ['موبایل'], ['سریال کنتور'], ['خالی']];
  public pieChartDataProvince: SingleDataSet = [];
  public pieChartDataRegion: SingleDataSet = [];
  public pieChartDataZone: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  pieChartColor: any = [
    {
      backgroundColor: [
        'rgb(0, 69, 203)',
        'rgb(220, 232, 255)',
        'rgba(139, 136, 136, 0.9)',
        'rgb(213, 213, 213)',
        'rgba(255, 161, 181, 0.9)',
        'rgb(220, 232, 255)'
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
    this.pieChartDataProvince.push(this.dataSource.inProvince.ahadCount);
    this.pieChartDataProvince.push(this.dataSource.inProvince.karbariCount);
    this.pieChartDataProvince.push(this.dataSource.inProvince.mobileCount);
    this.pieChartDataProvince.push(this.dataSource.inProvince.counterSerialCount);
    this.pieChartDataProvince.push(this.dataSource.inProvince.emptyCount);
  }
  insertToPieChartZone = () => {
    this.pieChartDataZone.push(this.dataSource.inZone.ahadCount);
    this.pieChartDataZone.push(this.dataSource.inZone.karbariCount);
    this.pieChartDataZone.push(this.dataSource.inZone.mobileCount);
    this.pieChartDataZone.push(this.dataSource.inZone.counterSerialCount);
    this.pieChartDataZone.push(this.dataSource.inZone.emptyCount);
  }
  insertToPieChartRegion = () => {
    this.pieChartDataRegion.push(this.dataSource.inRegion.ahadCount);
    this.pieChartDataRegion.push(this.dataSource.inRegion.karbariCount);
    this.pieChartDataRegion.push(this.dataSource.inRegion.mobileCount);
    this.pieChartDataRegion.push(this.dataSource.inRegion.counterSerialCount);
    this.pieChartDataRegion.push(this.dataSource.inRegion.emptyCount);
  }
  connectToServer = async () => {
    if (!this.readingReportManagerService.getRRTrvDifferential()) {
      this.backToPrevious();
      return;
    }
    this.dataSource = await this.readingReportManagerService.postRRTraverseDifferentialChartManager();

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
