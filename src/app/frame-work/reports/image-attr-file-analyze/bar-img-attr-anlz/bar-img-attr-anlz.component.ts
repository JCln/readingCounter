import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { IImageAttributionAnalyze } from 'interfaces/ireports';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-img-attr-anlz',
  templateUrl: './bar-img-attr-anlz.component.html',
  styleUrls: ['./bar-img-attr-anlz.component.scss']
})
export class BarImgAttrAnlzComponent implements OnChanges {
  @Input() dataSource: IImageAttributionAnalyze[];

  private defaultOptions = {
    fontFamily: 'Blotus',
    fontSize: 16,
    fontStyle: 'bold',
    fontColor: 'rgb(112, 112, 112)',
    beginAtZero: true
  }
  public barChartColors: Color[] = [
    { backgroundColor: 'red' }
  ]

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'right',
      labels: this.defaultOptions
    },
    scales: {
      xAxes: [{ ticks: this.defaultOptions }],
      yAxes: [{ ticks: this.defaultOptions }]
    },
    tooltips: {
      footerFontFamily: 'Blotus',
      bodyFontFamily: 'Blotus',
      titleFontFamily: 'Blotus',
      bodyFontSize: 18,
      titleFontSize: 18,
      footerFontSize: 18,
      bodyFontStyle: 'bold'
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];

  ngOnChanges(): void {
    let temp: any[] = [];
    let labels: any[] = [];
    this.dataSource.forEach(item => {
      temp.push(item.itemQuantity);
      labels.push(item.itemTitle);
    })
    console.log(labels);

    this.barChartLabels.push(labels);
    this.barChartData.push({ data: temp, label: 'مقدار' })

    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    // this.barChartData.push({ data: [28, 48], label: ['Series B'] })
  }

}

