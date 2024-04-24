import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { IAnalyzeRes } from 'interfaces/idashboard-map';
import { Label } from 'ng2-charts';
import { DashboardService } from 'services/dashboard.service';
import { ProfileService } from 'services/profile.service';


@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {
  analyzePerformance: IAnalyzeRes[] = [];//shuold be analyzePerformance interface
  @Output() barAnalyzeEvent = new EventEmitter<any[]>();

  private defaultOptions = {
    fontFamily: this.profileService.getFontFamily(),
    fontSize: 16,
    fontStyle: 'bold',
    fontColor: 'rgb(112, 112, 112)'
  }

  // Radar
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'right',
      labels: this.defaultOptions
    },
    scales: {
      xAxes: [{ ticks: this.defaultOptions }],
      yAxes: [{ ticks: this.defaultOptions }]
    },
    tooltips: {
      footerFontFamily: this.profileService.getFontFamily(),
      bodyFontFamily: this.profileService.getFontFamily(),
      titleFontFamily: this.profileService.getFontFamily(),
      bodyFontSize: 18,
      titleFontSize: 18,
      footerFontSize: 18,
      bodyFontStyle: 'bold'
    }
  };
  public radarChartLabels: Label[] = ['کمینه', 'بیشینه', 'میانگین', 'انحراف از معیار', 'میانه', 'مُد'];

  public radarChartData: ChartDataSets[] = [];
  public radarChartType: ChartType = 'radar';

  constructor(
    public profileService: ProfileService,
    private dashboardService: DashboardService
  ) { }

  classWrapper = async () => {
    this.analyzePerformance = await this.dashboardService.postDashboardAnalyzePerformance();
    this.radarChartData = this.assignToChart();
    this.barAnalyzeEvent.emit(this.radarChartData);
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  assignToChart = (): any[] => {
    let temp = [];
    this.analyzePerformance.forEach((item, index) => {
      temp.push({ data: this.dashboardService.getElementOfArrOfObjectsAnalyze(this.analyzePerformance[index]), label: item.statusTitle, stack: 'a' });
    })

    return temp;
  }
}
