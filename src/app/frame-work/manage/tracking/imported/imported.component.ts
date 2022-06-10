import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IEditTracking, ITracking } from 'interfaces/itrackings';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

import { ImportListDgComponent } from './import-list-dg/import-list-dg.component';


@Component({
  selector: 'app-imported',
  templateUrl: './imported.component.html',
  styleUrls: ['./imported.component.scss']
})
export class ImportedComponent extends FactoryONE {
  dataSource: ITracking[] = [];
  filterZoneDictionary: IDictionaryManager[] = [];
  ref: DynamicDialogRef;

  constructor(

    private closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService,
    private dialogService: DialogService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForTrackImported = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForTrackImported) {
      this.dataSource = this.closeTabService.saveDataForTrackImported;
    }
    else {
      this.dataSource = await this.trackingManagerService.getDataSource(ENInterfaces.trackingIMPORTED);
      this.filterZoneDictionary = await this.trackingManagerService.getZoneDictionary();
      this.closeTabService.saveDataForTrackImported = this.dataSource;
    }
  }
  onRowEditInit(product: any) {
    console.log(product);
  }
  private onRowEditSave(rowData: IEditTracking) {
    this.trackingManagerService.postEditingTrack(rowData);
    this.refreshTable();
  }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  showMoreDetails = (data: ITracking) => {
    this.ref = this.dialogService.open(ImportListDgComponent, {
      data: data,
      rtl: true,
      width: '70%'
    })
    this.ref.onClose.subscribe((res: ITracking) => {
      if (res)
        this.onRowEditSave(res);
    });
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  firstConfirmDialog = async (rowDataAndIndex: object) => {
    const a = await this.trackingManagerService.firstConfirmDialog(EN_messages.reason_deleteRoute, true, true);
    if (a) {
      await this.trackingManagerService.migrateOrRemoveTask(ENInterfaces.trackingREMOVE, rowDataAndIndex['dataSource'], a);
      this.refreshTable();
    }
  }
  routeToLMAll = (row: ITracking) => {
    this.trackingManagerService.routeToLMAll(row);
  }
}