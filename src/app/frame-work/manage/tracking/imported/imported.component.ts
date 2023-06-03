import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
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
  ref: DynamicDialogRef;

  constructor(

    public closeTabService: CloseTabService,
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
    if (!this.closeTabService.saveDataForTrackImported) {
      this.closeTabService.saveDataForTrackImported = await this.trackingManagerService.getDataSource(ENInterfaces.trackingIMPORTED);
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
  firstConfirmDialog = async (rowDataAndIndex: object) => {
    const config = {
      messageTitle: EN_messages.reason_deleteRoute,
      text: 'ش پیگیری: ' + rowDataAndIndex['dataSource'].trackNumber + '،   قرائت کننده: ' + rowDataAndIndex['dataSource'].counterReaderName,
      minWidth: '19rem',
      isInput: true,
      isDelete: true,
      icon: 'pi pi-trash'
    }

    const a = await this.trackingManagerService.utilsService.firstConfirmDialog(config);
    if (a) {
      await this.trackingManagerService.migrateOrRemoveTask(ENInterfaces.trackingREMOVE, rowDataAndIndex['dataSource'].id, a);
      this.refreshTable();
    }
  }
  routeToLMAll = (row: ITracking) => {
    this.trackingManagerService.routeToLMAll(row);
  }
}