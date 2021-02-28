import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ITracking } from 'src/app/Interfaces/imanage';
import { IObjectIteratation } from 'src/app/Interfaces/ioverall-config';
import { TrackingManagerService } from 'src/app/services/tracking-manager.service';


@Component({
  selector: 'app-import-list-dg',
  templateUrl: './import-list-dg.component.html',
  styleUrls: ['./import-list-dg.component.scss']
})
export class ImportListDgComponent implements OnInit {
  dataSource: ITracking;
  _selectedDatas: IObjectIteratation[];

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private trackingManagerService: TrackingManagerService) {

  }

  ngOnInit(): void {
    console.log(this.config);
    this.dataSource = this.config.data;
    this._selectedDatas = this.trackingManagerService.columnSelectedImportedList();
  }
  editClose(data: ITracking) {
    console.log(data);
    
    this.ref.close(data);
  }

}
