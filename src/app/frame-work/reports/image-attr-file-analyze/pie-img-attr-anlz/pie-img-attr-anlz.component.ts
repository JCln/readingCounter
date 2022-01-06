import { Component, Input, OnChanges } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { IImageAttributionAnalyze } from 'interfaces/ireports';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-pie-img-attr-anlz',
  templateUrl: './pie-img-attr-anlz.component.html',
  styleUrls: ['./pie-img-attr-anlz.component.scss']
})
export class PieImgAttrAnlzComponent implements OnChanges {
  @Input() dataSource: IImageAttributionAnalyze[];
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
      this.pieChartDataZone.push(item.itemQuantity);
      this.pieChartLabels.push([item.itemTitle]);
    })
  }
  ngOnChanges(): void {
    this.connectToServer();
  }

}