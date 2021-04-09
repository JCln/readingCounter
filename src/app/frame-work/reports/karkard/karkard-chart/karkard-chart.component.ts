import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { Subscription } from 'rxjs/internal/Subscription';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';

@Component({
  selector: 'app-karkard-chart',
  templateUrl: './karkard-chart.component.html',
  styleUrls: ['./karkard-chart.component.scss']
})
export class KarkardChartComponent implements OnInit {
  dataSource: any;

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['adiCount'], ['faqedCount'], ['maneCount'], ['saierCount'], ['tavizCount'], ['xarabCount']];
  public pieChartDataProvince: SingleDataSet = [];
  public pieChartDataRegion: SingleDataSet = [];
  public pieChartDataZone: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  pieChartColor: any = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)'
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
