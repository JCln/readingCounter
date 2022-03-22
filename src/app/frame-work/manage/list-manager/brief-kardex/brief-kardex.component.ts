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

  classWrapper = async () => {
    this.dataSource = await this.listManagerService.postByQueue(ENInterfaces.trackingBriefKardex, 'BriefKardex?zoneId=' + this.config.data.zoneId + '&radif=' + this.config.data.radif);
  }
  ngOnInit(): void {
    this.classWrapper();
  }

  close() {
    this.ref.close();
  }

}