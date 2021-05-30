import { Component, OnInit } from '@angular/core';
import { IDashboardSpecial } from 'src/app/Interfaces/inon-manage';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dispersal-rate',
  templateUrl: './dispersal-rate.component.html',
  styleUrls: ['./dispersal-rate.component.scss']
})
export class DispersalRateComponent implements OnInit {
  dataSource: IDashboardSpecial;

  constructor(
    private dashboardService: DashboardService
  ) {
  }

  classWrapper = async () => {
    this.dataSource = await this.dashboardService.getDashboardDispersalRateTimed();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
}
