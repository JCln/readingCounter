import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ProfileService } from 'services/profile.service';

@Component({
  selector: 'app-bar-anlz-prfm',
  templateUrl: './bar-anlz-prfm.component.html',
  styleUrls: ['./bar-anlz-prfm.component.scss']
})
export class BarAnlzPrfmComponent implements OnChanges {
  @Input() barAnalyze: any[];

  private defaultOptions = {
    fontFamily: this.profileService.getFontFamily(),
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
  public barChartLabels: Label[] = ['کمینه', 'بیشینه', 'میانگین', 'انحراف از معیار', 'میانه', 'مُد'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];

  constructor(
    public profileService: ProfileService
  ) { }

  ngOnChanges(): void {
    setTimeout(() => {
      if (this.barAnalyze)
        this.barChartData = this.barAnalyze;
    }, 0);
  }

}
