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
    fontStyle: 'bold'
  }

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: { labels: this.defaultOptions },
    plugins: {
      Option: {
        title: {
          display: true,
          text: 'hello'
        }
      }

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
    this.pieChartDataProvince.push(this.dataSource['inProvince'].adiCount);
    this.pieChartDataProvince.push(this.dataSource['inProvince'].faqedCount);
    this.pieChartDataProvince.push(this.dataSource['inProvince'].maneCount);
    this.pieChartDataProvince.push(this.dataSource['inProvince'].saierCount);
    this.pieChartDataProvince.push(this.dataSource['inProvince'].tavizCount);
    this.pieChartDataProvince.push(this.dataSource['inProvince'].xarabCount);
  }
  insertToPieChartZone = () => {
    this.pieChartDataZone.push(this.dataSource['inProvince'].adiCount);
    this.pieChartDataZone.push(this.dataSource['inProvince'].faqedCount);
    this.pieChartDataZone.push(this.dataSource['inProvince'].maneCount);
    this.pieChartDataZone.push(this.dataSource['inProvince'].saierCount);
    this.pieChartDataZone.push(this.dataSource['inProvince'].tavizCount);
    this.pieChartDataZone.push(this.dataSource['inProvince'].xarabCount);
  }
  insertToPieChartRegion = () => {
    this.pieChartDataRegion.push(this.dataSource['inProvince'].adiCount);
    this.pieChartDataRegion.push(this.dataSource['inProvince'].faqedCount);
    this.pieChartDataRegion.push(this.dataSource['inProvince'].maneCount);
    this.pieChartDataRegion.push(this.dataSource['inProvince'].saierCount);
    this.pieChartDataRegion.push(this.dataSource['inProvince'].tavizCount);
    this.pieChartDataRegion.push(this.dataSource['inProvince'].xarabCount);
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
  }
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