import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { IAnalyzeRes } from 'src/app/Interfaces/imanage';
import { DashboardService } from 'src/app/services/dashboard.service';


@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {
  analyzePerformance: IAnalyzeRes[] = [];//shuold be analyzePerformance interface

  private defaultOptions = {
    fontFamily: 'Blotus',
    fontSize: 16,
    fontStyle: 'bold',
    fontColor: 'rgb(112, 112, 112)'
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'right',
      labels: this.defaultOptions
    },
  };
  public barChartLabels: Label[] = ['کمینه', 'بیشینه', 'میانگین', 'انحراف از معیار', 'میانی', 'مٌد'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];


  // Radar
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'right',
      labels: this.defaultOptions
    },
  };
  public radarChartLabels: Label[] = ['کمینه', 'بیشینه', 'میانگین', 'انحراف از معیار', 'میانی', 'مٌد'];

  public radarChartData: ChartDataSets[] = [];
  public radarChartType: ChartType = 'radar';

  constructor(
    private dashboardService: DashboardService
  ) { }

  classWrapper = async () => {
    this.analyzePerformance = await this.dashboardService.postDashboardAnalyzePerformance();
    this.assignToChart();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  assignToChart = () => {
    let temp = [];
    this.analyzePerformance.forEach((item, index) => {
      temp.push({ data: this.dashboardService.getElementOfArrOfObjectsAnalyze(this.analyzePerformance[index]), label: item.statusTitle, stack: 'a' });
    })

    this.radarChartData = temp;
    this.barChartData = temp;
  }
}
