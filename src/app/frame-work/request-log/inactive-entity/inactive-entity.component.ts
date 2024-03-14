import { Component, Input, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { BrowserStorageService } from 'services/browser-storage.service';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { ProfileService } from 'services/profile.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-inactive-entity',
  templateUrl: './inactive-entity.component.html',
  styleUrls: ['./inactive-entity.component.scss']
})
export class InactiveEntityComponent extends FactoryONE {
  // should place only in component because overright totalNum needs for dynamic use  
  tempMainDataSource = { totalNum: 0, data: [] };
  @ViewChild(Table) datatableG: Table;
  hasFiltersInTable: boolean = false;

  _selectedColumnsToRemember: string = 'selectedReqLogInactiveEntity';
  _sessionName: string = 'reqLogInactiveEntity';
  _outputFileName: string = 'reqLogInactiveEntity';
  _selectCols: any = [];
  _selectedColumns: IObjectIteratation[] = [];
  totalRecords: number;

  constructor(
    public closeTabService: CloseTabService,
    public profileService: ProfileService,
    public listManagerService: ListManagerService,
    public browserStorageService: BrowserStorageService
  ) {
    super();
  }

  updateOnChangedCounterState = async (event: any) => {

    console.log(event);
    this.closeTabService.inactiveEntitiy = await this.closeTabService.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.requestLogInactiveEntity, event);
    console.log(this.closeTabService.inactiveEntitiy);
    this.totalRecords = this.closeTabService.inactiveEntitiy.totalRecords;
    this.resetDataSourceView();

  }
  classWrapper = async (canRefresh?: boolean) => {
    if (this.browserStorageService.isExists(this._outputFileName)) {
      this._selectCols = this.browserStorageService.getLocal(this._outputFileName);
    } else {
      this._selectCols = this.listManagerService.columnManager.getColumnsMenus(this._outputFileName);
    }
    this._selectedColumns = this.listManagerService.columnManager.customizeSelectedColumns(this._selectCols);
    console.log(this._selectedColumns);

    // this.closeTabService.inactiveEntitiy = await this.closeTabService.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.requestLogInactiveEntity, event);
    // this.totalRecords = this.closeTabService.inactiveEntitiy.totalRecords;
  }
  refreshTable = () => {
    this.datatableG.onLazyLoad.emit({
      sortField: '',
      globalFilter: null,
      sortOrder: 1,
      rows: 10,
      first: 0,
      filters: {}
    })
  }
  resetDataSourceView = () => {
    // on each change of ChangedCounterState
    this.tempMainDataSource.totalNum = 0;
  }
  // receiveDateJalali = (event: any, dataId: string) => {
  //   // to make date updated to latest change by user
  //   for (let index = 0; index < this.closeTabService.inactiveEntitiy.data.length; index++) {
  //     if (this.closeTabService.inactiveEntitiy.data[index].id === dataId) {
  //       this.closeTabService.inactiveEntitiy.data[index].offloadDateJalali = event;
  //     }
  //   }
  // }
  LazyLoading(event: LazyLoadEvent) {
    console.log(event);

    // if (MathS.isNull(event.sortField)) {
    //   event.sortField = 'offloadDateJalali';
    // }
    // if (event.sortField == '_defaultSortOrder') {
    //   event.sortField = '';
    // }
    // if (event.filters.hasOwnProperty('counterStateId'))
    //   event.filters['counterStateId'][0].value = this.closeTabService.saveDataForInactiveEntitiyReq.multiSelectCounterStateId.length > 0 ? this.closeTabService.saveDataForInactiveEntitiyReq.multiSelectCounterStateId : null;
    // if (event.filters.hasOwnProperty('preCounterStateCode'))
    //   event.filters['preCounterStateCode'][0].value = this.closeTabService.saveDataForInactiveEntitiyReq.multiSelectPreCounterStateCode.length > 0 ? this.closeTabService.saveDataForInactiveEntitiyReq.multiSelectPreCounterStateCode : null;
    // if (event.filters.hasOwnProperty('karbariCode'))
    //   event.filters['karbariCode'][0].value = this.closeTabService.saveDataForInactiveEntitiyReq.multiSelectkarbariCode.length > 0 ? this.closeTabService.saveDataForInactiveEntitiyReq.multiSelectkarbariCode : null;
    // if (event.filters.hasOwnProperty('hazf'))
    //   event.filters['hazf'][0].value = this.closeTabService.saveDataForInactiveEntitiyReq.multiSelectHazf.length > 0 ? this.closeTabService.saveDataForInactiveEntitiyReq.multiSelectHazf : null;
    // if (event.filters.hasOwnProperty('masrafStateId'))
    //   event.filters['masrafStateId'][0].value = this.closeTabService.saveDataForInactiveEntitiyReq.multiSelectMasrafStateId.length > 0 ? this.closeTabService.saveDataForInactiveEntitiyReq.multiSelectMasrafStateId : null;

    this.updateOnChangedCounterState(event);
  }
  clearFilters(table: Table) {
    this.closeTabService.utilsService.clearFilters(table);
    this.hasFiltersInTable = false;
  }
  changedFilterDropdowns(eventValue: any, elementName: string) {
    console.log(1);
    // this.closeTabService.saveDataForInactiveEntitiyReq[elementName] = eventValue;
  }
  getLocalReOrderable = (): boolean => {
    return this.profileService.getLocalReOrderable();
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  hasFilters = () => {
    this.hasFiltersInTable = this.closeTabService.utilsService.hasFilters(this.datatableG);
  }
  ngAfterViewInit(): void {
    this.hasFilters();
  }

}
