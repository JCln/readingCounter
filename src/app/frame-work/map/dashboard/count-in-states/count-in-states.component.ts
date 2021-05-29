import { Component, OnInit } from '@angular/core';
import { IDictionaryManager, IObjectIteratation } from 'src/app/Interfaces/ioverall-config';
import { DashboardService } from 'src/app/services/dashboard.service';

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
    console.log(this.countInStateDataSource);

  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this.countInStates = this.dashboardService.columnDashboardForbidden();
  }


}
