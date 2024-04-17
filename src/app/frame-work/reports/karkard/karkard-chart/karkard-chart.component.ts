import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IReadingReportChartKarkard } from 'interfaces/ireports';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';


@Component({
  selector: 'app-karkard-chart',
  templateUrl: './karkard-chart.component.html',
  styleUrls: ['./karkard-chart.component.scss']
})
export class KarkardChartComponent implements OnInit {
  dataSource: IReadingReportChartKarkard;

  private defaultOptions = {
    fontFamily: 'Blotus',
    fontSize: 14,
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
          console.log(sum);

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
  public pieChartLabels: Label[] = [['عادی'], ['فاقد'], ['مانع'], ['سایر'], ['تعویض'], ['خراب']];
  public pieChartDataProvince: SingleDataSet = [];
  public pieChartDataRegion: SingleDataSet = [];
  public pieChartDataZone: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  pieChartColor: any = [
    {
      backgroundColor: [
        'rgb(0, 69, 203)',
        'rgb(246, 62, 56)',
        'rgba(139, 136, 136, 0.9)',
        'rgb(213, 213, 213)',
        'rgba(255, 161, 181, 0.9)',
        'rgb(183, 28, 28)'
      ]
    }
  ]
  public pieChartLegend = true;
  public pieChartPlugins = [];
  // 

  subscription: Subscription[] = [];

  constructor(
    private readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  insertToPieChartProvince = () => {
    this.pieChartDataProvince.push(this.dataSource.inProvince.adiCount);
    this.pieChartDataProvince.push(this.dataSource.inProvince.faqedCount);
    this.pieChartDataProvince.push(this.dataSource.inProvince.maneCount);
    this.pieChartDataProvince.push(this.dataSource.inProvince.saierCount);
    this.pieChartDataProvince.push(this.dataSource.inProvince.tavizCount);
    this.pieChartDataProvince.push(this.dataSource.inProvince.xarabCount);
  }
  insertToPieChartZone = () => {
    this.pieChartDataZone.push(this.dataSource.inZone.adiCount);
    this.pieChartDataZone.push(this.dataSource.inZone.faqedCount);
    this.pieChartDataZone.push(this.dataSource.inZone.maneCount);
    this.pieChartDataZone.push(this.dataSource.inZone.saierCount);
    this.pieChartDataZone.push(this.dataSource.inZone.tavizCount);
    this.pieChartDataZone.push(this.dataSource.inZone.xarabCount);
  }
  insertToPieChartRegion = () => {
    this.pieChartDataRegion.push(this.dataSource.inRegion.adiCount);
    this.pieChartDataRegion.push(this.dataSource.inRegion.faqedCount);
    this.pieChartDataRegion.push(this.dataSource.inRegion.maneCount);
    this.pieChartDataRegion.push(this.dataSource.inRegion.saierCount);
    this.pieChartDataRegion.push(this.dataSource.inRegion.tavizCount);
    this.pieChartDataRegion.push(this.dataSource.inRegion.xarabCount);
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ListKarkardChart, this.closeTabService.karkardReq);
    this.insertToPieChartProvince();
    this.insertToPieChartZone();
    this.insertToPieChartRegion();
  }
  backToPrevious = () => {
    this.readingReportManagerService.utilsService.backToPreviousPage();
  }
  ngOnInit(): void {
    this.connectToServer();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  refreshTable = () => {
    this.ngOnInit();
  }

}