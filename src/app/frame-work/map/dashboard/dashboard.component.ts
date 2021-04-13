import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { IDashboardForbiddenTimed, IDashboardKarkardTimed, IDashboardMediaTimed } from 'src/app/Interfaces/inon-manage';
import { IObjectIteratation } from 'src/app/Interfaces/ioverall-config';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  forbidden: IDashboardForbiddenTimed;
  media: IDashboardMediaTimed;
  karkard: IDashboardKarkardTimed[] = [];

  _col_forbidden: IObjectIteratation[] = [];
  _col_Media: IObjectIteratation[] = [];

  test1: any[];
  test2: any[];
  test3: any[];
  test4: any[];

  /* PIE CHART*/
  private defaultOptions = {
    fontFamily: 'Blotus',
    fontSize: 16,
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
          let allData: any = data.datasets[tooltipItem.datasetIndex].data;
          let tooltipLabel = data.labels[tooltipItem.index];
          let tooltipData = allData[tooltipItem.index];
          let total = 0;
          for (let i in allData) {
            total += parseFloat(allData[i]);
          }
          let tooltipPercentage = Math.round((tooltipData / total) * 100);
          return ' (  %' + tooltipPercentage + '  ) ' + tooltipData + ' :  ' + tooltipLabel;
        }
      }
    }
  };
  public pieChartLabels: Label[] = [['عادی'], ['فاقد'], ['مانع'], ['خراب'], ['تعویض'], ['سایر']];
  public pieChartData: SingleDataSet = [];
  public pieChartDataOne: SingleDataSet = [];
  public pieChartDataTwo: SingleDataSet = [];
  public pieChartDataThree: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  pieChartColor: any = [
    {
      backgroundColor: [
        'rgb(0, 69, 203)',
        'rgb(117, 188, 84)',
        'rgba(139, 136, 136, 0.9)',
        'rgb(246, 62, 56)',
        'rgb(246, 128, 56)',
        'rgb(125, 131, 255)'
      ]
    }
  ]
  public pieChartLegend = true;
  public pieChartPlugins = [];

  /* END PIE CHART CONFIGS*/

  constructor(
    private dashboardService: DashboardService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  private insertSelectedColumns = () => {
    this._col_Media = this.dashboardService.columnDashboardMedia();
    this._col_forbidden = this.dashboardService.columnDashboardForbidden();
  }

  classWrapper = async () => {
    this.forbidden = await this.dashboardService.getDashboardForbidden();
    this.media = await this.dashboardService.getDashboardMedia();
    this.karkard = await this.dashboardService.getDashboardKarkard();
    this.insertSelectedColumns();
    console.log(this.karkard);
    this.getPieChartData();
  }

  ngOnInit(): void {
    this.classWrapper();
  }
  getPieChartData = () => {
    this.test1 = this.dashboardService.getObjectParameters(this.karkard[0])
    this.test2 = this.dashboardService.getObjectParameters(this.karkard[1])
    this.test3 = this.dashboardService.getObjectParameters(this.karkard[2])
    this.test4 = this.dashboardService.getObjectParameters(this.karkard[3])

    this.pieChartData = this.test1;
    this.pieChartDataOne = this.test2;
    this.pieChartDataTwo = this.test3;
    this.pieChartDataThree = this.test4;
  }

}
