import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ITracking } from 'src/app/Interfaces/imanage';
import { IDictionaryManager, IObjectIteratation } from 'src/app/Interfaces/ioverall-config';
import { TrackingManagerService } from 'src/app/services/tracking-manager.service';


@Component({
  selector: 'app-import-list-dg',
  templateUrl: './import-list-dg.component.html',
  styleUrls: ['./import-list-dg.component.scss']
})
export class ImportListDgComponent implements OnInit {
  dataSource: ITracking;
  _selectedDatas: IObjectIteratation[];
  allCounterReaders: IDictionaryManager[] = [];
  selectedCounterReader: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private trackingManagerService: TrackingManagerService,
    private cdr: ChangeDetectorRef
  ) {
  }
  counterWrapper = async () => {
    this.allCounterReaders = await this.trackingManagerService.getCounterReaders(this.config.data.zoneId);
    this.dataSource = this.config.data;
    this._selectedDatas = this.trackingManagerService.columnSelectedImportedList();
    this.cdr.detectChanges();
  }
  ngOnInit(): void {
    this.counterWrapper();
  }
  editCloseData() {
    if (this.selectedCounterReader)
      this.dataSource.counterReaderId = this.selectedCounterReader.id;
    this.ref.close(this.dataSource);
  }

}
