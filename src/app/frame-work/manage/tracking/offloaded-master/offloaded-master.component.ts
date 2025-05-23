import { ColumnManager } from 'src/app/classes/column-manager';
import { Component, Input, ViewChild } from '@angular/core';
import { CloseTabService } from 'services/close-tab.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ITracking, ITrackingMasterDto } from 'interfaces/itrackings';
import { OutputManagerService } from 'services/output-manager.service';
import { Table } from 'primeng/table';
import { EN_messages } from 'interfaces/enums.enum';

@Component({
  selector: 'app-offloaded-master',
  templateUrl: './offloaded-master.component.html',
  styleUrls: ['./offloaded-master.component.scss']
})
export class OffloadedMasterComponent extends FactoryONE {
  private readonly offloadedMasterOutputName: string = 'offloadedMaster';
  @ViewChild(Table) dtable: Table;

  _selectCols: any = [];
  _selectedColumns: any[];
  constructor(
    public closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService,
    private columnManager: ColumnManager,
    private outputManagerService: OutputManagerService
  ) {
    super();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.columnManager.getColumnsMenus(this.offloadedMasterOutputName);
    this._selectedColumns = this.trackingManagerService.columnManager.customizeSelectedColumns(this._selectCols);
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  setColumnsChanges = (variableName: string, newValues: IObjectIteratation[]) => {
    // convert all items to false
    this[variableName].forEach(old => {
      old.isSelected = false;
    })

    // merge new values
    this[variableName].find(old => {
      newValues.find(newVals => {
        if (newVals.field == old.field)
          old.isSelected = true;
      })
    })
  }
  loadDetailPlease = async (dataSource: ITrackingMasterDto, rowIndex: number) => {
    this.closeTabService.trackingOffloadedDetails[rowIndex] = await this.trackingManagerService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.trackingOffloadedDetails, dataSource.groupId);
  }
  doLoadIfToggled(): void {
    const selectedKey = Object.keys(this.dtable.expandedRowKeys)[0];
    if (selectedKey) {
      for (let index = 0; index < this.closeTabService.trackingOffloadedMaster.length; index++) {
        if (selectedKey == this.closeTabService.trackingOffloadedMaster[index].groupId)
          this.loadDetailPlease(this.closeTabService.trackingOffloadedMaster[index], index);
      }
    }
  }
  routeToOffloadLazy = (dataSource: ITracking) => {
    this.trackingManagerService.routeToOffloadLazy(dataSource);
  }
  routeToAllInGroupLazy = (dataSource: ITrackingMasterDto) => {
    this.trackingManagerService.routeToOffloadAllInGroupLazy(dataSource);
  }

  selectDateMudifyBulkClicked = async () => {
    const a = {
      messageTitle: EN_messages.toModifyBulk,
      minWidth: '21rem',
      icon: 'pi pi-calendar-times',
      isInput: false,
      isDelete: false,
      isSelectableDate: true,
    }
    return this.closeTabService.utilsService.firstConfirmDialog(a);
  }
  confirmationMudifyBulk = async () => {
    const a = {
      messageTitle: 'اصلاح لیست',
      messageTitleTwo: EN_messages.confirmModifyBulk1,
      text: EN_messages.confirmModifyBulk2 + '' + EN_messages.confirmModifyBulk3,
      minWidth: '21rem',
      icon: 'pi pi-info',
      isInput: false,
      isDelete: true
    }
    return this.closeTabService.utilsService.firstConfirmDialog(a);
  }
  modifyBulkClicked = async (dataSource: ITrackingMasterDto) => {
    if (await this.confirmationMudifyBulk()) {
      const hasSelectedDate = await this.selectDateMudifyBulkClicked();
      if (hasSelectedDate) {
        const body = {
          day: hasSelectedDate,
          groupId: dataSource.groupId
        }
        const res = await this.trackingManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.offloadModifyBulk, body);
        this.trackingManagerService.utilsService.snackBarMessageSuccess(res.message);
      }
    }
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.trackingOffloadedDetails = [];
    }

    await this.closeTabService.getTrackingOffloadedMaster(canRefresh ? canRefresh : false);
    this.insertSelectedColumns();
    this.showTestingPart();
  }
  getExcel = async (dataSource: ITracking) => {
    const res = await this.trackingManagerService.ajaxReqWrapperService.getBlobByIdAsJson(ENInterfaces.GeneralModifyAllExcelInGroup, dataSource.groupId);
    this.outputManagerService.downloadFileWithContentDisposition(res);
  }
  async showTestingPart() {
    // TODO: call opened more details dialog
    setTimeout(() => {
      this.doLoadIfToggled();
    }, 0);

  }


}