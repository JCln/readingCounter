import { Component, Input, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, IObjectIteratation } from 'interfaces/ioverall-config';
import { ITrackingMasterDto, ITracking } from 'interfaces/itrackings';
import { Table } from 'primeng/table';
import { CloseTabService } from 'services/close-tab.service';
import { OutputManagerService } from 'services/output-manager.service';
import { SearchService } from 'services/search.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-simple-master-by-fragment',
  templateUrl: './simple-master-by-fragment.component.html',
  styleUrls: ['./simple-master-by-fragment.component.scss']
})
export class SimpleMasterByFragmentComponent extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  private readonly simpleMasterOutputName: string = 'simpleMasterByFragment';
  @ViewChild(Table) dtable: Table;

  _selectCols: any = [];
  _selectedColumns: any[];

  constructor(
    public closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService,
    private columnManager: ColumnManager,
    private outputManagerService: OutputManagerService,
    private searchService: SearchService
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
    this.closeTabService.simpleMasterByFragmentDetails[rowIndex] = await this.trackingManagerService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.trackingOffloadedDetails, dataSource.groupId);
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
  converts = async () => {
    Converter.convertIdToTitle(this.closeTabService.simpleMasterByFragment, this.zoneDictionary, 'zoneId');
  }
  connectToServer = async () => {
    this.closeTabService.simpleMasterByFragment = [];
    if (!this.searchService.verificationSimpleSearch(this.closeTabService.simpleMasterByFragmentReq, this.closeTabService._isOrderByDate))
      return;
    this.closeTabService.simpleMasterByFragment = await this.searchService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.trackingSimpleMasterByFragment, this.closeTabService.simpleMasterByFragmentReq);
    if (this.closeTabService.simpleMasterByFragment.length) {
      this.converts();
      this.insertSelectedColumns();
    }
  }
  routeToOffloadLazy = (dataSource: ITracking) => {
    this.trackingManagerService.routeToMasterByFragmentLazy(dataSource);
  }
  routeToMasterByFragmentGroupLazy = (dataSource: ITrackingMasterDto) => {
    this.trackingManagerService.routeToMasterByFragmentAllInGroupLazy(dataSource);
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (!MathS.isNull(this.closeTabService.saveDataForSearchSimple)) {
      this.converts();
    }

    this.zoneDictionary = await this.searchService.dictionaryWrapperService.getZoneDictionary();
    this.readingPeriodKindDictionary = await this.searchService.dictionaryWrapperService.getPeriodKindDictionary();
    this.closeTabService.getSearchInOrderTo();

    // await this.closeTabService.getSimpleMasterByFragment(canRefresh ? canRefresh : false);
    this.insertSelectedColumns();
  }
  getExcel = async (dataSource: ITracking) => {
    const res = await this.trackingManagerService.ajaxReqWrapperService.getBlobByIdAsJson(ENInterfaces.GeneralModifyAllExcelInGroup, dataSource.groupId);
    this.outputManagerService.downloadFile(res);
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.trackingManagerService.dictionaryWrapperService.getReadingPeriodDictionary(this.closeTabService.simpleMasterByFragmentReq._selectedKindId);
  }

}