import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'services/dashboard.service';
import { IDictionaryManager, IObjectIteratation } from 'src/app/Interfaces/ioverall-config';

@Component({
  selector: 'app-count-in-states',
  templateUrl: './count-in-states.component.html',
  styleUrls: ['./count-in-states.component.scss']
})
export class CountInStatesComponent implements OnInit {
  countInStates: IObjectIteratation[] = [];
  countInStateDataSource: IDictionaryManager[] = [];

  constructor(
    private dashboardService: DashboardService
  ) { }

  classWrapper = async () => {
    this.countInStateDataSource = await this.dashboardService.getDashboardCountInStatesTimed();
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this.countInStates = this.dashboardService.columnDashboardForbidden();
  }


}
