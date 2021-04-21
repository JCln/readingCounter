import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-anlz-prfm',
  templateUrl: './bar-anlz-prfm.component.html',
  styleUrls: ['./bar-anlz-prfm.component.scss']
})
export class BarAnlzPrfmComponent implements OnInit {
  @Input() barAnalyze: any[];

  private defaultOptions = {
    fontFamily: 'Blotus',
    fontSize: 16,
    fontStyle: 'bold',
    fontColor: 'rgb(112, 112, 112)'
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'right',
      labels: this.defaultOptions
    },
  };
  public barChartLabels: Label[] = ['کمینه', 'بیشینه', 'میانگین', 'انحراف از معیار', 'میانی', 'مٌد'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
