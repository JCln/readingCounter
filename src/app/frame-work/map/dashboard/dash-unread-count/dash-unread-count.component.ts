import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardUnReadCount } from 'interfaces/idashboard-map';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-dash-unread-count',
  templateUrl: './dash-unread-count.component.html',
  styleUrls: ['./dash-unread-count.component.scss']
})
export class DashUnreadCountComponent implements OnInit {
  dataSourceUnreadCount: IDashboardUnReadCount[] = [];
  _canShow: boolean = false;

  constructor(private dashboardService: DashboardService) { }

  classWrapper = async () => {
    this.dataSourceUnreadCount = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardUnReadCount);
    if (this.dashboardService.isNullVals(this.dataSourceUnreadCount))
      this._canShow = true;
  }
  ngOnInit(): void {
    this.classWrapper();
  }

}
