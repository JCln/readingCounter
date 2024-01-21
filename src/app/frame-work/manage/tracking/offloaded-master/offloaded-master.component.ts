import { ColumnManager } from 'src/app/classes/column-manager';
import { Component, Input, ViewChild } from '@angular/core';
import { CloseTabService } from 'services/close-tab.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ITracking, ITrackingMasterDto } from 'interfaces/itrackings';
import { OutputManagerService } from 'services/output-manager.service';
import { EN_messages } from 'interfaces/enums.enum';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-offloaded-master',
  templateUrl: './offloaded-master.component.html',
  styleUrls: ['./offloaded-master.component.scss']
})
export class OffloadedMasterComponent extends FactoryONE {
  private readonly offloadedMasterOutputName: string = 'offloadedMaster';
  @ViewChild(Table) dtable: Table;
  static showOneTimeDialog: boolean = true;

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
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.trackingOffloadedDetails = [];
    }

    await this.closeTabService.getTrackingOffloadedMaster(canRefresh ? canRefresh : false);
    this.insertSelectedColumns();
    this.showTestingPart();
  }
  getExcel = async (dataSource: ITracking) => {
    const res = await this.trackingManagerService.ajaxReqWrapperService.getBlobById(ENInterfaces.GeneralModifyAllExcelInGroup, dataSource.groupId);
    this.outputManagerService.downloadFile(res, '.xlsx');
  }
  async showTestingPart() {
    if (OffloadedMasterComponent.showOneTimeDialog) {

      const config = {
        messageTitle: EN_messages.confirmPilotSection,
        text: EN_messages.confirmPilotSection2,
        minWidth: '19rem',
        isInput: false,
        isDelete: true,
        icon: 'pi pi-info-circle',
        doesNotReturnButton: false
      }
      await this.closeTabService.utilsService.firstConfirmDialog(config);
      OffloadedMasterComponent.showOneTimeDialog = false;
    }
    // TODO: call opened more details dialog
    setTimeout(() => {
      this.doLoadIfToggled();
    }, 0);

  }


}