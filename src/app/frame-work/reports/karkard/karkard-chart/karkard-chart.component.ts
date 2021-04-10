import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { Subscription } from 'rxjs/internal/Subscription';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';

import { IReadingReportChartKarkard } from './../../../../Interfaces/imanage';

@Component({
  selector: 'app-karkard-chart',
  templateUrl: './karkard-chart.component.html',
  styleUrls: ['./karkard-chart.component.scss']
})
export class KarkardChartComponent implements OnInit {
  dataSource: IReadingReportChartKarkard;

  private defaultOptions = {
    fontFamily: 'Blotus',
    fontSize: 18,
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
          let label = '%' + data.labels[tooltipItem.index];
          let count = data
            .datasets[tooltipItem.datasetIndex]
            .data[tooltipItem.index];
          return label + " : " + count;
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
    private readingReportManagerService: ReadingReportManagerService
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
    if (!this.readingReportManagerService.getRRReq()) {
      this.backToPrevious();
      return;
    }
    this.dataSource = await this.readingReportManagerService.postRRKarkardChartManager();

    this.insertToPieChartProvince();
    this.insertToPieChartZone();
    this.insertToPieChartRegion();

    // this.addPieChartOptions();
  }
  // addPieChartOptions = () => {
  //   this.pieChartOptions.plugins.datalabels.formatter = function (value, context) {
  //     return context.dataset.labels[context.dataIndex];
  //   }
  // }  
  backToPrevious = () => {
    this.readingReportManagerService.backToPreviousPage();
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