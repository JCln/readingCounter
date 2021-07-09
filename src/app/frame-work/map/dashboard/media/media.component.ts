import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'services/dashboard.service';
import { IDashboardTimed } from 'src/app/Interfaces/inon-manage';
import { IObjectIteratation } from 'src/app/Interfaces/ioverall-config';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  _col_media: IObjectIteratation[] = [];
  media: IDashboardTimed;

  constructor(
    private dashboardService: DashboardService
  ) { }

  classWrapper = async () => {
    this.media = await this.dashboardService.getDashboardMedia();
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  private insertSelectedColumns = () => {
    this._col_media = this.dashboardService.columnDashboardMedia();
  }

}
