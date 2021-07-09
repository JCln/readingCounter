import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'services/dashboard.service';
import { IDashboardSpecial } from 'src/app/Interfaces/inon-manage';

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
    console.log(this.dataSource);

  }
  ngOnInit(): void {
    this.classWrapper();
  }
}
