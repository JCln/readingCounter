import { AfterViewInit, Component, Input } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';
import { ProfileService } from 'services/profile.service';

@Component({
  selector: 'app-log-memory-status-pie',
  templateUrl: './log-memory-status-pie.component.html',
  styleUrls: ['./log-memory-status-pie.component.scss']
})
export class LogMemoryStatusPieComponent implements AfterViewInit {
  @Input() dataSource: any[];
  public chartColors: any[] = [{ backgroundColor: ["#6FC8CE", "#FF7360"] }];


  private defaultOptions = {
    fontFamily: this.profileService.getFontFamily(),
    fontSize: 16,
    fontStyle: 'bold',
    fontColor: 'rgb(112, 112, 112)'
  }
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'right',
      labels: this.defaultOptions
    },
    plugins: {
      labels: {
        render: 'percentage',
        fontColor: ['green', 'white', 'red'],
        precision: 2
      },
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
      footerFontFamily: this.profileService.getFontFamily(),
      bodyFontFamily: this.profileService.getFontFamily(),
      titleFontFamily: this.profileService.getFontFamily(),
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
  public pieChartLabels: Label[] = [['تعداد رکورد باقیمانده'], ['تعداد استفاده شده']];
  public pieChartData: SingleDataSet[] = [[26.8, 73.2]]; // should attention to code changed ": SingleDataSet = [];"
  public pieChartType: ChartType = 'pie';

  // pieChartColor: any = [
  //   {
  //     backgroundColor: [
  //       'rgb(125, 131, 255)',
  //       'rgb(117, 188, 84)',
  //       'rgb(0, 69, 203)',
  //       'rgb(246, 62, 56)',
  //       'rgb(246, 128, 56)',
  //       'rgba(139, 136, 136, 0.9)',
  //     ]
  //   }
  // ]
  public pieChartLegend = true;
  public pieChartPlugins = [];
  // 

  constructor(
    public profileService: ProfileService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }


  ngAfterViewInit(): void {
    this.pieChartData = this.dataSource;
    console.log(this.pieChartData);

    this.chartColors = ['rgb(246, 62, 56)', 'rgb(246, 128, 56)']
  }

}