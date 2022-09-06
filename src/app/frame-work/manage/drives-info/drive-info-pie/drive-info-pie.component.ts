import { Component, Input, OnChanges } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { IManageDrivesInfo } from 'interfaces/iserver-manager';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-drive-info-pie',
  templateUrl: './drive-info-pie.component.html',
  styleUrls: ['./drive-info-pie.component.scss']
})
export class DriveInfoPieComponent implements OnChanges {
  @Input() dataSource: IManageDrivesInfo[];
  @Input() chartColors: any[];

  private defaultOptions = {
    fontFamily: 'Blotus',
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
  public pieChartLabels: Label[] = [['درصد فضای آزاد'], ['درصد استفاده شده']];
  public pieChartData: any = []; // should attention to code changed ": SingleDataSet = [];"
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
  // 

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    if (this.dataSource)
      this.getPieChartData();
  }
  getObjectParameters = (sth: any): any[] => {
    let b = [];
    b.push(sth.freePercent);
    b.push(sth.usedPercent);
    console.log(b);

    return b;
  }
  getPieChartData = () => {
    for (let index = 0; index < this.dataSource.length; index++) {
      console.log(this.dataSource);

      this.pieChartData[index].push(this.dataSource[index].freePercent);
      this.pieChartData[index].push(this.dataSource[index].usedPercent);
      console.log(this.pieChartData);
    }

  }

  ngOnChanges(): void {
    let temp: any[];
    for (let index = 0; index < this.dataSource.length; index++) {
      console.log(this.dataSource);

      this.pieChartData[index].push(this.dataSource[index].freePercent);
      this.pieChartData[index].push(this.dataSource[index].usedPercent);
      console.log(this.pieChartData);
    }

  }

}