import { Component, Input, OnChanges } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-drive-info-pie',
  templateUrl: './drive-info-pie.component.html',
  styleUrls: ['./drive-info-pie.component.scss']
})
export class DriveInfoPieComponent implements OnChanges {
  @Input() dataSource: any[];
  @Input() chartColors: any[];

  private defaultOptions = {
    fontFamily: 'Blotus',
    fontSize: 14,
    fontStyle: 'bold',
    fontColor: 'rgb(112, 112, 112)'
  }
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartDataZone: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  // 

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  connectToServer = () => {
    this.pieChartDataZone = [];
    this.pieChartLabels = [];
    this.dataSource.forEach(item => {
      this.pieChartDataZone.push(item.freePercent);
    })
  }
  ngOnChanges(): void {
    this.connectToServer();
  }

}