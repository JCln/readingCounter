import { ColumnManager } from 'src/app/classes/column-manager';
import { Component, Input } from '@angular/core';
import { CloseTabService } from 'services/close-tab.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ITracking, ITrackingMasterDto } from 'interfaces/itrackings';
import { OutputManagerService } from 'services/output-manager.service';

@Component({
  selector: 'app-offloaded-master',
  templateUrl: './offloaded-master.component.html',
  styleUrls: ['./offloaded-master.component.scss']
})
export class OffloadedMasterComponent extends FactoryONE {
  private readonly offloadedMasterOutputName: string = 'offloadedMaster';
  _selectCols: any = [];
  _selectedColumns: any[];

  constructor(
    public closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService,
    private columnManager: ColumnManager,
    private outputManagerService: OutputManagerService
    // private cdk: ChangeDetectorRef
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
    // this.cdk.detectChanges();
  }
  routeToOffloadLazy = (dataSource: ITracking) => {
    this.trackingManagerService.routeToOffloadLazy(dataSource);
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.trackingOffloadedDetails = [];
    }
    await this.closeTabService.getTrackingOffloadedMaster(canRefresh ? canRefresh : false);
    this.insertSelectedColumns();
  }
  getExcel = async (dataSource: ITracking) => {
    const res = await this.trackingManagerService.ajaxReqWrapperService.getBlobById(ENInterfaces.GeneralModifyAllExcelInGroup, dataSource.groupId);
    this.outputManagerService.downloadFile(res, '.xlsx');
  }


}