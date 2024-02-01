import { Component, Input, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { ITrackingMasterDto, ITracking } from 'interfaces/itrackings';
import { Table } from 'primeng/table';
import { CloseTabService } from 'services/close-tab.service';
import { OutputManagerService } from 'services/output-manager.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-simple-master-by-fragment',
  templateUrl: './simple-master-by-fragment.component.html',
  styleUrls: ['./simple-master-by-fragment.component.scss']
})
export class SimpleMasterByFragmentComponent extends FactoryONE {
  private readonly simpleMasterOutputName: string = 'simpleMasterByFragment';
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
    this._selectCols = this.columnManager.getColumnsMenus(this.simpleMasterOutputName);
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
    this.closeTabService.simpleDetailsByFragmentDetails[rowIndex] = await this.trackingManagerService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.trackingOffloadedDetails, dataSource.groupId);
  }
  doLoadIfToggled(): void {
    const selectedKey = Object.keys(this.dtable.expandedRowKeys)[0];
    if (selectedKey) {
      for (let index = 0; index < this.closeTabService.simpleMasterByFragment.length; index++) {
        if (selectedKey == this.closeTabService.simpleMasterByFragment[index].groupId)
          this.loadDetailPlease(this.closeTabService.simpleMasterByFragment[index], index);
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
      this.closeTabService.simpleDetailsByFragmentDetails = [];
    }

    await this.closeTabService.getSimpleMasterByFragment(canRefresh ? canRefresh : false);
    this.insertSelectedColumns();
  }
  getExcel = async (dataSource: ITracking) => {
    const res = await this.trackingManagerService.ajaxReqWrapperService.getBlobByIdAsJson(ENInterfaces.GeneralModifyAllExcelInGroup, dataSource.groupId);
    this.outputManagerService.downloadFile(res);
  }


}