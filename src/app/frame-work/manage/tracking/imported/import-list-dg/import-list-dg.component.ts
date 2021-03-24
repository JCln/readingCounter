import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ITracking } from 'src/app/Interfaces/imanage';
import { IObjectIteratation } from 'src/app/Interfaces/ioverall-config';
import { TrackingManagerService } from 'src/app/services/tracking-manager.service';

import { IDictionaryManager } from './../../../../../Interfaces/ioverall-config';

@Component({
  selector: 'app-import-list-dg',
  templateUrl: './import-list-dg.component.html',
  styleUrls: ['./import-list-dg.component.scss']
})
export class ImportListDgComponent implements OnInit {
  dataSource: ITracking;
  _selectedDatas: IObjectIteratation[];
  allCounterReaders: IDictionaryManager[] = [];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private trackingManagerService: TrackingManagerService
  ) {
    this.dataSource = this.config.data;
  }

  getCounterReaders = (): Promise<IDictionaryManager[]> => {
    try {
      return new Promise((resolve) => {
        this.trackingManagerService.getCounterReaders(this.dataSource.zoneId).subscribe(res => {
          resolve(res);
        });
      })
    }
    catch {
      console.error(e => e);
    }
  }
  counterWrapper = async () => {
    this.allCounterReaders = await this.getCounterReaders();
    this._selectedDatas = this.trackingManagerService.columnSelectedImportedList();
  }
  ngOnInit(): void {
    this.counterWrapper();
  }
  editCloseData() {
    this.ref.close(this.dataSource);
  }

}
