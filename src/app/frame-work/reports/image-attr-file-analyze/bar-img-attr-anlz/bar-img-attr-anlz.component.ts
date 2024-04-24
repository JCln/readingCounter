import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { IImageAttributionAnalyze } from 'interfaces/ireports';
import { Label } from 'ng2-charts';
import { ProfileService } from 'services/profile.service';

@Component({
  selector: 'app-bar-img-attr-anlz',
  templateUrl: './bar-img-attr-anlz.component.html',
  styleUrls: ['./bar-img-attr-anlz.component.scss']
})
export class BarImgAttrAnlzComponent implements OnChanges {
  @Input() dataSource: IImageAttributionAnalyze[];
  @Input() chartColors: any[];

  constructor(
    public profileService: ProfileService
  ) { }
  private defaultOptions = {
    fontFamily: this.profileService.getFontFamily(),
    fontSize: 16,
    fontStyle: 'bold',
    fontColor: 'rgb(112, 112, 112)',
    beginAtZero: true
  }
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
      footerFontFamily: this.profileService.getFontFamily(),
      bodyFontFamily: this.profileService.getFontFamily(),
      titleFontFamily: this.profileService.getFontFamily(),
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
    let temp = [];
    let labels = [];
    this.barChartLabels = [];
    this.barChartData = [];

    this.dataSource.forEach(item => {
      temp.push(item.itemQuantity);
      labels.push(item.itemTitle);
    })
    this.barChartLabels = labels;
    this.barChartData.push({ data: temp, label: 'مقدار' })
  }

}

