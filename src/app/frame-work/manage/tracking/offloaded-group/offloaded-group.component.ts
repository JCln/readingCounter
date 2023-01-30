import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ITracking } from 'interfaces/itrackings';
import { PrimeNGConfig } from 'primeng/api';
import { CloseTabService } from 'services/close-tab.service';
import { EnvService } from 'services/env.service';
import { OutputManagerService } from 'services/output-manager.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-offloaded-group',
  templateUrl: './offloaded-group.component.html',
  styleUrls: ['./offloaded-group.component.scss']
})
export class OffloadedGroupComponent extends FactoryONE {

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
    private envService: EnvService,
    private config: PrimeNGConfig
  ) {
    super();
    this.setTraslateToPrimeNgTable();
  }

  nullSavedSource = () => this.closeTabService.saveDataForTrackOffloadedGroup = null;
  refetchTable = (index: number) => this.closeTabService.saveDataForTrackOffloadedGroup = this.closeTabService.saveDataForTrackOffloadedGroup.slice(0, index).concat(this.closeTabService.saveDataForTrackOffloadedGroup.slice(index + 1));
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForTrackOffloadedGroup) {
      this.closeTabService.saveDataForTrackOffloadedGroup = await this.trackingManagerService.getDataSource(ENInterfaces.trackingOFFLOADED);
    }
    this.insertSelectedColumns();
    this.refreshTableAfterGrouping(this.closeTabService.offloadedGroupReq._selectedAggregate);
  }
  downloadOutputSingle = async (row: ITracking) => {
    const desc = await this.trackingManagerService.firstConfirmDialog(EN_messages.downloadPermit, false, false);
    if (desc) {
      if (this.envService.hasNextBazdid) {
        this.hasNextBazdid(row);
        return;
      }
      const a = await this.trackingManagerService.downloadOutputWithoutDESC(ENInterfaces.OutputSINGLE, row);
      this.outputManagerService.downloadFile(a);
    }
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
    this._selectCols = this.trackingManagerService.getColumnOfflaodedGroup();
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
    const toAggregate = this.closeTabService.offloadedGroupReq._selectedAggregate;
    let tempRowGroupMeta = {};

    if (this.closeTabService.saveDataForTrackOffloadedGroup) {
      for (let i = 0; i < this.closeTabService.saveDataForTrackOffloadedGroup.length; i++) {

        let rowData = this.closeTabService.saveDataForTrackOffloadedGroup[i][toAggregate];

        if (i == 0) {
          tempRowGroupMeta[rowData] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = this.closeTabService.saveDataForTrackOffloadedGroup[i - 1][toAggregate];
          if (rowData === previousRowData)
            tempRowGroupMeta[rowData].size++;
          else
            tempRowGroupMeta[rowData] = { index: i, size: 1 };
        }
      }
    }
    this.rowGroupMetadata = tempRowGroupMeta;
  }
  resetAggregation = () => {
    this.closeTabService.offloadedGroupReq._selectedAggregate = '';
    this.updateRowGroupMetaData();
  }
  setTraslateToPrimeNgTable = () => {
    this.config.setTranslation({
      'accept': 'تایید',
      'reject': 'بازگشت',
      'startsWith': ' شروع با',
      'contains': 'شامل باشد',
      'notContains': ' شامل نباشد',
      'endsWith': ' پایان با',
      'equals': 'برابر',
      'notEquals': 'نا برابر',
      'lt': ' کمتر از',
      'lte': 'کمتر یا برابر',
      'gt': 'بزرگتر',
      'gte': 'بزرگتر یا برابر',
      'is': 'باشد',
      'isNot': 'نباشد',
      'before': 'قبل',
      'after': 'بعد',
      'clear': 'پاک کردن',
      'apply': 'تایید',
      'matchAll': 'مطابقت با همه',
      'matchAny': ' مطابقت',
      'addRule': 'جستجو براساس',
      'removeRule': 'حذف جستجو',
      'choose': ' انتخاب',
      'upload': 'ارسال',
      'cancel': 'بازگشت'
    });
  }
  routeToAssessPre = (dataSource: ITracking) => {
    if (MathS.isNull(dataSource.listNumber)) {
      this.trackingManagerService.showWarnMessage(EN_messages.no_listNumberExist);
    }
    else {
      this.closeTabService.saveDataForAssessPreReq.zoneId = dataSource.zoneId;
      this.closeTabService.saveDataForAssessPreReq.listNumber = dataSource.listNumber;
      this.trackingManagerService.routeToAssessPre();
    }
  }

}