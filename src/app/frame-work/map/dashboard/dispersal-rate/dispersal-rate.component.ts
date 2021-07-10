import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardSpecial } from 'interfaces/inon-manage';
import { DashboardService } from 'services/dashboard.service';

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
    this.dataSource = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardDispersalRateTimed);
    console.log(this.dataSource);

  }
  ngOnInit(): void {
    this.classWrapper();
  }
}
