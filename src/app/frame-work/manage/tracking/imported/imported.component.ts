import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IEditTracking, ITracking } from 'interfaces/itrackings';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

import { ImportListDgComponent } from './import-list-dg/import-list-dg.component';
import { MathS } from 'src/app/classes/math-s';
import { EN_Routes } from 'interfaces/routes.enum';


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
  callAPI = async () => {
    this.closeTabService.saveDataForTrackImported = await this.trackingManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.trackingIMPORTED);
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForTrackImported)) {
      this.callAPI();
    }
  }
  // imported service control
  private selectSpecialParameters = (rowData: IEditTracking): IEditTracking => {
    return {
      id: rowData.id,
      alalHesabPercent: rowData.alalHesabPercent,
      imagePercent: rowData.imagePercent,
      hasPreNumber: rowData.hasPreNumber ? rowData.hasPreNumber : false,
      displayBillId: rowData.displayBillId ? rowData.displayBillId : false,
      displayRadif: rowData.displayRadif ? rowData.displayRadif : false,
      counterReaderId: rowData.counterReaderId,
      displayMobile: rowData.displayMobile ? rowData.displayMobile : false,
      displayPreDate: rowData.displayPreDate ? rowData.displayPreDate : false,
      hasImage: rowData.hasImage ? rowData.hasImage : false,
      displayIcons: rowData.displayIcons ? rowData.displayIcons : false,
      displayDebt: rowData.displayDebt ? rowData.displayDebt : false
    }
  }
  //  
  private async onRowEditSave(rowData: IEditTracking) {
    const res = await this.trackingManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.trackingEDIT, this.selectSpecialParameters(rowData));
    this.trackingManagerService.successSnackMessage(res.message);
    this.callAPI();
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
      const res = await this.trackingManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.trackingREMOVE, { trackingId: rowDataAndIndex['dataSource'].id, description: a });
      this.trackingManagerService.successSnackMessage(res.message);
      this.callAPI();
    }
  }
  routeToLMAll = (row: ITracking) => {
    this.trackingManagerService.routeToLMAll(row, EN_Routes.wrmtrackimported);
  }
}