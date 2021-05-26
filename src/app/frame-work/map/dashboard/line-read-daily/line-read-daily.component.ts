import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { IDashboardReadDaily } from 'src/app/Interfaces/inon-manage';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-line-read-daily',
  templateUrl: './line-read-daily.component.html',
  styleUrls: ['./line-read-daily.component.scss']
})
export class LineReadDailyComponent implements OnInit {
  readDaily: IDashboardReadDaily[] = [];


  /* LINE CHART */
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: any;
  public lineChartColors: Color[] = [
    { // Custom
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: 'rgb(0, 69, 203)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];
  private defaultOptions = {
    fontFamily: 'Blotus',
    fontSize: 16,
    fontStyle: 'bold',
    fontColor: 'rgb(112, 112, 112)'
  }

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  /* END LINE CHART*/

  constructor(
    private dashboardService: DashboardService
  ) { }

  classWrapper = async () => {
    this.readDaily = await this.dashboardService.getDashboardReadDaily();
    this.addToLineChart();

  }
  ngOnInit(): void {
    this.classWrapper();
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
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            // let tooltipLabel = data.labels[tooltipItem.index];
            // let tooltipLabel = tooltipData;
            let allData: any = data.datasets[tooltipItem.datasetIndex].data;
            let tooltipData = allData[tooltipItem.index];
            let customTooltip = hints[tooltipItem.index];

            return 'مقدار : ' + tooltipData + ', ' + customTooltip;

          }
        },
        footerFontFamily: 'Blotus',
        bodyFontFamily: 'Blotus',
        titleFontFamily: 'Blotus',
        bodyFontSize: 18,
        titleFontSize: 18,
        footerFontSize: 18,
        bodyFontStyle: 'bold'
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


}
