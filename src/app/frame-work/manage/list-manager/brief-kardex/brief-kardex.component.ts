import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IBriefKardex } from 'interfaces/imanage';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListManagerService } from 'services/list-manager.service';

@Component({
  selector: 'app-brief-kardex',
  templateUrl: './brief-kardex.component.html',
  styleUrls: ['./brief-kardex.component.scss']
})
export class BriefKardexComponent implements OnInit {
  dataSource: IBriefKardex[] = [];
  constructor(
    public listManagerService: ListManagerService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  getFormatRange() {
    this.dataSource.forEach(item => {
      this.listManagerService.setRangesForDailyAverage(item.dailyAverage);
    })
  }
  classWrapper = async () => {
    this.dataSource = await this.listManagerService.ajaxReqWrapperService.postDataSourceByIdStringly(ENInterfaces.trackingBriefKardex, 'BriefKardex?zoneId=' + this.config.data.zoneId + '&radif=' + this.config.data.radif);
    this.getFormatRange();
  }
  ngOnInit(): void {
    this.classWrapper();
  }

  close() {
    this.ref.close();
  }

}