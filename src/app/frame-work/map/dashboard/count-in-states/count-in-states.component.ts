import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-count-in-states',
  templateUrl: './count-in-states.component.html',
  styleUrls: ['./count-in-states.component.scss']
})
export class CountInStatesComponent implements OnInit {
  countInStateDataSource: IDictionaryManager[] = [];

  constructor(
    private dashboardService: DashboardService
  ) { }

  classWrapper = async () => {
    this.countInStateDataSource = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardCountInStates);
  }
  ngOnInit(): void {
    this.classWrapper();
  }

}
