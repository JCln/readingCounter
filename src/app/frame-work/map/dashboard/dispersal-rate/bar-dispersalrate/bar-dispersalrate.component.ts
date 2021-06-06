import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { IDashboardSpecial } from 'src/app/Interfaces/inon-manage';

@Component({
  selector: 'app-bar-dispersalrate',
  templateUrl: './bar-dispersalrate.component.html',
  styleUrls: ['./bar-dispersalrate.component.scss']
})
export class BarDispersalrateComponent implements OnChanges {
  @Input() dataSourceBar: IDashboardSpecial;

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
  public barChartLabels: Label[] = ['8 - 10', '10 - 12', '12 - 14', '14 - 16', '16 - 18', 'سایر'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartDataDaily: ChartDataSets[] = [];
  public barChartDataWeekly: ChartDataSets[] = [];
  public barChartDataMonthly: ChartDataSets[] = [];
  public barChartDataYearly: ChartDataSets[] = [];

  private dailyConfig = (): number[] => {
    const daily = this.dataSourceBar.daily;
    console.log(daily);

    let temp: number[] = [];
    temp.push(daily._8_10);
    temp.push(daily._10_12);
    temp.push(daily._12_14);
    temp.push(daily._14_16);
    temp.push(daily._16_18);
    temp.push(daily.other);
    return temp;
  }
  private dailyConfigClosed = (): number[] => {
    const daily = this.dataSourceBar.daily;
    let temp: number[] = [];
    temp.push(daily._8_10Closed);
    temp.push(daily._10_12Closed);
    temp.push(daily._12_14Closed);
    temp.push(daily._14_16Closed);
    temp.push(daily._16_18Closed);
    temp.push(daily.otherClosed);
    return temp;
  }
  private dailyConfigRate = (): number[] => {
    const daily = this.dataSourceBar.daily;
    let temp: number[] = [];
    temp.push(daily._8_10Rate);
    temp.push(daily._10_12Rate);
    temp.push(daily._12_14Rate);
    temp.push(daily._14_16Rate);
    temp.push(daily._16_18Rate);
    temp.push(daily.otherRate);
    return temp;
  }

  private weeklyConfig = (): number[] => {
    const weekly = this.dataSourceBar.weekly;
    let temp: number[] = [];
    temp.push(weekly._8_10);
    temp.push(weekly._10_12);
    temp.push(weekly._12_14);
    temp.push(weekly._14_16);
    temp.push(weekly._16_18);
    temp.push(weekly.other);
    return temp;
  }
  private weeklyConfigClosed = (): number[] => {
    const weekly = this.dataSourceBar.weekly;
    let temp: number[] = [];
    temp.push(weekly._8_10Closed);
    temp.push(weekly._10_12Closed);
    temp.push(weekly._12_14Closed);
    temp.push(weekly._14_16Closed);
    temp.push(weekly._16_18Closed);
    temp.push(weekly.otherClosed);
    return temp;
  }
  private weeklyConfigRate = (): number[] => {
    const weekly = this.dataSourceBar.weekly;
    let temp: number[] = [];
    temp.push(weekly._8_10Rate);
    temp.push(weekly._10_12Rate);
    temp.push(weekly._12_14Rate);
    temp.push(weekly._14_16Rate);
    temp.push(weekly._16_18Rate);
    temp.push(weekly.otherRate);
    return temp;
  }

  private monthlyConfig = (): number[] => {
    const monthly = this.dataSourceBar.monthly;
    let temp: number[] = [];
    temp.push(monthly._8_10);
    temp.push(monthly._10_12);
    temp.push(monthly._12_14);
    temp.push(monthly._14_16);
    temp.push(monthly._16_18);
    temp.push(monthly.other);
    return temp;
  }
  private monthlyConfigClosed = (): number[] => {
    const monthly = this.dataSourceBar.monthly;
    let temp: number[] = [];
    temp.push(monthly._8_10Closed);
    temp.push(monthly._10_12Closed);
    temp.push(monthly._12_14Closed);
    temp.push(monthly._14_16Closed);
    temp.push(monthly._16_18Closed);
    temp.push(monthly.otherClosed);
    return temp;
  }
  private monthlyConfigRate = (): number[] => {
    const monthly = this.dataSourceBar.monthly;
    let temp: number[] = [];
    temp.push(monthly._8_10Rate);
    temp.push(monthly._10_12Rate);
    temp.push(monthly._12_14Rate);
    temp.push(monthly._14_16Rate);
    temp.push(monthly._16_18Rate);
    temp.push(monthly.otherRate);
    return temp;
  }

  private yearlyConfig = (): number[] => {
    const yearly = this.dataSourceBar.yearly;
    let temp: number[] = [];
    temp.push(yearly._8_10);
    temp.push(yearly._10_12);
    temp.push(yearly._12_14);
    temp.push(yearly._14_16);
    temp.push(yearly._16_18);
    temp.push(yearly.other);
    return temp;
  }
  private yearlyConfigClosed = (): number[] => {
    const yearly = this.dataSourceBar.yearly;
    let temp: number[] = [];
    temp.push(yearly._8_10Closed);
    temp.push(yearly._10_12Closed);
    temp.push(yearly._12_14Closed);
    temp.push(yearly._14_16Closed);
    temp.push(yearly._16_18Closed);
    temp.push(yearly.otherClosed);
    return temp;
  }
  private yearlyConfigRate = (): number[] => {
    const yearly = this.dataSourceBar.yearly;
    let temp: number[] = [];
    temp.push(yearly._8_10Rate);
    temp.push(yearly._10_12Rate);
    temp.push(yearly._12_14Rate);
    temp.push(yearly._14_16Rate);
    temp.push(yearly._16_18Rate);
    temp.push(yearly.otherRate);
    return temp;
  }
  createChartObject = () => {
    this.barChartDataDaily = [
      { data: this.dailyConfig(), label: ' عادی ', backgroundColor: 'rgba(117, 188, 84, 0.6)' },
      { data: this.dailyConfigClosed(), label: ' بسته ', backgroundColor: 'rgba(246, 62, 56, 0.6)' },
      { data: this.dailyConfigRate(), label: ' % ', backgroundColor: 'rgba(246, 152, 56, 0.8)' }
    ]

    this.barChartDataWeekly = [
      { data: this.weeklyConfig(), label: ' عادی ', backgroundColor: 'rgba(117, 188, 84, 0.6)' },
      { data: this.weeklyConfigClosed(), label: ' بسته ', backgroundColor: 'rgba(246, 62, 56, 0.6)' },
      { data: this.weeklyConfigRate(), label: ' % ', backgroundColor: 'rgba(246, 152, 56, 0.8)' }
    ]

    this.barChartDataMonthly = [
      { data: this.monthlyConfig(), label: ' عادی ', backgroundColor: 'rgba(117, 188, 84, 0.6)' },
      { data: this.monthlyConfigClosed(), label: ' بسته ', backgroundColor: 'rgba(246, 62, 56, 0.6)' },
      { data: this.monthlyConfigRate(), label: ' % ', backgroundColor: 'rgba(246, 152, 56, 0.8)' }
    ]

    this.barChartDataYearly = [
      { data: this.yearlyConfig(), label: ' عادی ', backgroundColor: 'rgba(117, 188, 84, 0.6)' },
      { data: this.yearlyConfigClosed(), label: ' بسته ', backgroundColor: 'rgba(246, 62, 56, 0.6)' },
      { data: this.yearlyConfigRate(), label: ' % ', backgroundColor: 'rgba(246, 152, 56, 0.8)' }
    ]
  }
  ngOnChanges(): void {
    console.log(this.dataSourceBar);
    this.createChartObject();
  }
}
