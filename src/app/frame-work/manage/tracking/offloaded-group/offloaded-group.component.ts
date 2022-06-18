import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ITracking } from 'interfaces/itrackings';
import { CloseTabService } from 'services/close-tab.service';
import { EnvService } from 'services/env.service';
import { OutputManagerService } from 'services/output-manager.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-offloaded-group',
  templateUrl: './offloaded-group.component.html',
  styleUrls: ['./offloaded-group.component.scss']
})
export class OffloadedGroupComponent extends FactoryONE {

  dataSource: ITracking[] = [];
  _selectCols: any = [];
  _selectedColumns: any[];
  rowGroupMetadata: any;
  canShowTable: boolean = true;
  _canShowGroupBorder: boolean = false;
  aggregateOptions = [
    { field: 'zoneTitle', header: 'ناحیه' },
    { field: 'insertDateJalali', header: 'تاریخ' },
    { field: 'counterReaderName', header: 'مامور' },
    { field: 'listNumber', header: 'ش لیست' },
    { field: 'itemQuantity', header: 'تعداد' },
    { field: 'year', header: 'سال' },
    { field: 'fromDate', header: 'از' },
    { field: 'toDate', header: 'تا' },
    { field: 'alalHesabPercent', header: 'درصد علی‌الحساب' },
    { field: 'imagePercent', header: 'درصد تصویر' }
  ]

  constructor(
    public closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService,
    public outputManagerService: OutputManagerService,
    private envService: EnvService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForTrackOffloadedGroup = null;
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForTrackOffloadedGroup) {
      this.dataSource = this.closeTabService.saveDataForTrackOffloadedGroup;
    }
    else {
      this.dataSource = await this.trackingManagerService.getDataSource(ENInterfaces.trackingOFFLOADED);
      this.closeTabService.saveDataForTrackOffloadedGroup = this.dataSource;
    }
    this.insertSelectedColumns();
    this.refreshTableAfterGrouping(this.closeTabService.offloadedGroupReq._selectedAggregate);
  }
  downloadOutputSingle = async (row: ITracking) => {
    if (this.envService.hasNextBazdid) {
      this.hasNextBazdid(row);
      return;
    }
    const a = await this.trackingManagerService.downloadOutputWithoutDESC(ENInterfaces.OutputSINGLE, row);
    this.outputManagerService.downloadFile(a);
  }
  routeToOffloadGeneralGroupModify = (dataSource: ITracking) => {
    this.trackingManagerService.routeToOffloadGeneralModifyGrouped(dataSource);
  }
  backToReading = async (rowDataAndIndex: object) => {
    const desc = await this.trackingManagerService.firstConfirmDialog(EN_messages.toReading, true, false);
    if (desc) {
      this.trackingManagerService.migrateOrRemoveTask(ENInterfaces.trackingToREADING, rowDataAndIndex['dataSource'], desc);
      this.refreshTable();
    }
  }
  hasNextBazdid = async (row: ITracking) => {
    let hasbazdid = await this.trackingManagerService.hasNextBazdidConfirmDialog(EN_messages.insert_nextBazdidDate);
    hasbazdid = Converter.persianToEngNumbers(hasbazdid);
    if (hasbazdid) {
      const a = await this.trackingManagerService.downloadOutputSingleWithENV(ENInterfaces.OutputSINGLE, row, hasbazdid);
      this.outputManagerService.downloadFile(a);
    }
  }
  insertSelectedColumns = () => {
    this._selectCols = this.trackingManagerService.columnOfflaodedGroup();
    this._selectedColumns = this.trackingManagerService.customizeSelectedColumns(this._selectCols);
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  refreshTableAfterGrouping = (val: any) => {
    if (val) {
      this.updateRowGroupMetaData();
      this.canShowTable = false;
      setTimeout(() => this.canShowTable = true, 0);
      this._canShowGroupBorder = true;
    }
    else {
      this._canShowGroupBorder = false;
    }
  }
  onSort() {
    this.updateRowGroupMetaData();
  }
  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if (this.dataSource) {
      for (let i = 0; i < this.dataSource.length; i++) {
        let rowData = this.dataSource[i];
        let representativeName = rowData[this.closeTabService.offloadedGroupReq._selectedAggregate];

        if (i == 0) {
          this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = this.dataSource[i - 1];
          let previousRowGroup = previousRowData[this.closeTabService.offloadedGroupReq._selectedAggregate];
          if (representativeName === previousRowGroup)
            this.rowGroupMetadata[representativeName].size++;
          else
            this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
        }
      }
    }
  }
}