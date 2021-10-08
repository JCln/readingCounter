import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDashboardUnReadCount } from 'interfaces/inon-manage';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-dash-unread-count',
  templateUrl: './dash-unread-count.component.html',
  styleUrls: ['./dash-unread-count.component.scss']
})
export class DashUnreadCountComponent implements OnInit {
  dataSourceUnreadCount: IDashboardUnReadCount[] = [];

  constructor(private dashboardService: DashboardService) { }

  classWrapper = async () => {
    this.dataSourceUnreadCount = await this.dashboardService.getDashboardDataSource(ENInterfaces.getDashboardUnReadCount);
  }
  ngOnInit(): void {
    this.classWrapper();
  }

}
