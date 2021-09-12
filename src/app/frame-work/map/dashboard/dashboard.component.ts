import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardKarkardTimed } from 'interfaces/inon-manage';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, MultiDataSet, SingleDataSet } from 'ng2-charts';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  karkard: IDashboardKarkardTimed[] = [];
  _analyzer_interface: any[];
  doughnutTemp: any[] = [];

  private defaultOptions = {
    fontFamily: 'Blotus',
    fontSize: 16,
    fontStyle: 'bold',
    fontColor: 'rgb(112, 112, 112)'
  }


  public doughnutChartLabels: Label[] = ['عادی', 'فاقد', 'مانع', 'خراب', 'تعویض', 'سایر'];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';
  donutColors = [
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
  ];
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'right',
      labels: this.defaultOptions
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map(data => {
            sum += data;
          });
          let percentage = (value * 100 / sum).toFixed(2) + "%";
          return percentage;
        },
        color: 'var(--white)',
      }
    },
    tooltips: {
      footerFontFamily: 'Blotus',
      bodyFontFamily: 'Blotus',
      titleFontFamily: 'Blotus',
      bodyFontSize: 18,
      titleFontSize: 18,
      footerFontSize: 18,
      bodyFontStyle: 'bold',
      enabled: true
    }
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
    plugins: {
      // labels: {
      //   render: 'percentage',
      //   fontColor: ['green', 'white', 'red'],
      //   precision: 2
      // },
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map(data => {
            sum += data;
          });
          let percentage = (value * 100 / sum).toFixed(2) + "%";
          return percentage;
        },
        color: 'var(--white)',
      }
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
          // return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
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

  classWrapper = async () => {
    this.karkard = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardKarkardTimed);
    this.getPieChartData();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  getPieChartData = () => {
    this.pieChartData = this.dashboardService.getObjectParameters(this.karkard[0]);
    this.pieChartDataOne = this.dashboardService.getObjectParameters(this.karkard[1]);
    this.pieChartDataTwo = this.dashboardService.getObjectParameters(this.karkard[2]);
    this.pieChartDataThree = this.dashboardService.getObjectParameters(this.karkard[3]);

    this.addToDougnut();
  }
  addToDougnut = () => {
    this.doughnutTemp.push(this.pieChartDataOne);
    this.doughnutTemp.push(this.pieChartDataTwo);
    this.doughnutTemp.push(this.pieChartDataThree);

    this.doughnutChartData = this.doughnutTemp;

  }
  receiveAnalyzeData($event) {
    setTimeout(() => {
      this._analyzer_interface = $event;
    }, 0);
  }
}
