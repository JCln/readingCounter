import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import {
  BaseChartDirective,
  Color,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
  SingleDataSet,
} from 'ng2-charts';
import { IDashboardKarkardTimed, IDashboardReadDaily } from 'src/app/Interfaces/inon-manage';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  karkard: IDashboardKarkardTimed[] = [];
  readDaily: IDashboardReadDaily[] = [];

  _analyzer_interface: any[];

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
          console.log(sum);

          let percentage = (value * 100 / sum).toFixed(2) + "%";
          return percentage;
        },
        color: '#fff',
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

  /* LINE CHART */
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: any;
  public lineChartColors: Color[] = [
    { // Custom
      backgroundColor: 'rgb(0, 69, 203)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  /* END LINE CHART*/
  constructor(
    private dashboardService: DashboardService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  classWrapper = async () => {
    this.readDaily = await this.dashboardService.getDashboardReadDaily();
    this.addToLineChart();

    this.karkard = await this.dashboardService.getDashboardKarkard();
    this.getPieChartData();
  }
  addToLineChart = () => {
    const count = this.dashboardService.getElementOfArrOfObjects(this.readDaily, 'count');
    // const period = this.dashboardService.getElementOfArrOfObjects(this.readDaily, 'period');
    const hints = this.dashboardService.getElementOfArrOfObjects(this.readDaily, 'hint');
    const indexes = this.dashboardService.getElementIndexes(this.readDaily);

    this.lineChartLabels = indexes;
    this.lineChartData = [{ data: count, label: 'کارکرد' }];//label: this.readDaily.hint
    // this.progressiveLineChart();

    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        // We use this empty structure as a placeholder for dynamic theming.
        xAxes: [{}],
        yAxes: [
          {
            id: 'y-axis-0',
            position: 'left',
          },
          {
            id: 'y-axis-1',
            position: 'right',
            // gridLines: {
            //   color: 'rgb(14, 76, 146)',
            // },
            ticks: {
              fontColor: 'rgb(14, 76, 146)',
              fontFamily: 'Blutos'
            }
          }
        ]
      },
      annotation: {
        annotations: [
          {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: 'March',
            // borderColor: 'orange',
            borderWidth: 2,
            label: {
              enabled: true,
              // fontColor: 'orange',
              content: 'LineAnno'
            }
          },
        ],
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            let allData: any = data.datasets[tooltipItem.datasetIndex].data;
            let tooltipLabel = data.labels[tooltipItem.index];
            let tooltipData = allData[tooltipItem.index];
            let customTooltip = hints[tooltipItem.index]
            // console.log(tooltipLabel);
            // console.log(tooltipItem);
            // console.log(data);
            // console.log(tooltipData);

            return customTooltip;

          }
        }

      }
    }
  }
  progressiveLineChart = () => {
    const totalDuration = 10000;
    const delayBetweenPoints = totalDuration / this.lineChartData.length;
    const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const animation = {
      x: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: NaN, // the point is initially skipped
        delay(ctx) {
          if (ctx.type !== 'data' || ctx.xStarted) {
            return 0;
          }
          ctx.xStarted = true;
          return ctx.index * delayBetweenPoints;
        }
      },
      y: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: previousY,
        delay(ctx) {
          if (ctx.type !== 'data' || ctx.yStarted) {
            return 0;
          }
          ctx.yStarted = true;
          return ctx.index * delayBetweenPoints;
        }
      }
    };
    const config = {
      type: 'line',
      options: {
        animation,
        interaction: {
          intersect: false
        },
        plugins: {
          legend: false
        },
        scales: {
          x: {
            type: 'linear'
          }
        }
      }
    }

    // module.exports = {
    //   config
    // };
  }

  ngOnInit(): void {
    this.classWrapper();
  }
  getPieChartData = () => {
    this.pieChartData = this.dashboardService.getObjectParameters(this.karkard[0]);
    this.pieChartDataOne = this.dashboardService.getObjectParameters(this.karkard[1]);
    this.pieChartDataTwo = this.dashboardService.getObjectParameters(this.karkard[2]);
    this.pieChartDataThree = this.dashboardService.getObjectParameters(this.karkard[3]);
  }
  receiveAnalyzeData($event) {
    this._analyzer_interface = $event
  }
}
