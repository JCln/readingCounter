import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, IObjectIteratation } from 'interfaces/ioverall-config';
import { ITracking } from 'interfaces/itrackings';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TrackingManagerService } from 'services/tracking-manager.service';


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
    this.allCounterReaders = await this.trackingManagerService.getDataSourceByQuote(ENInterfaces.counterReadersByZoneId, this.config.data.zoneId);
    this.dataSource = this.config.data;
    this._selectedDatas = this.trackingManagerService.columnSelectedImportedList();
    this.cdr.detectChanges();
  }
  ngOnInit(): void {
    this.counterWrapper();
  }
  editCloseData = () => {
    if (typeof this.selectedCounterReader !== 'undefined' || this.selectedCounterReader) {
      this.dataSource.counterReaderId = this.selectedCounterReader.id;
    }
    this.ref.close(this.dataSource);
  }

}
