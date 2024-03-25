import { Component, Input, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { BrowserStorageService } from 'services/browser-storage.service';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { ListManagerService } from 'services/list-manager.service';
import { ProfileService } from 'services/profile.service';
import { FactoryONE } from 'src/app/classes/factory';

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
  _hasColumnsResizable: boolean = false;
  _widthExpandMode: string = 'expand';

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
    public browserStorageService: BrowserStorageService,
    private dateJalaliService: DateJalaliService
  ) {
    super();
  }
  getHasColumnsResizable = () => {
    this._hasColumnsResizable = this.profileService.getHasColumnsResizable();
  }
  getWidthExpandMode = () => {
    this._widthExpandMode = this.profileService.getWidthExpandMode();
  }
  convertLoginTime = () => {
    this.closeTabService.inactiveEntitiy.data.forEach(item => {
      item.insertDateTime = this.dateJalaliService.getDate(item.insertDateTime) + '   ' + this.dateJalaliService.getTime(item.insertDateTime);
    })
  }
  insertColumns = () => {
    if (this.browserStorageService.isExists(this._outputFileName)) {
      this._selectCols = this.browserStorageService.getLocal(this._outputFileName);
    } else {
      this._selectCols = this.listManagerService.columnManager.getColumnsMenus(this._outputFileName);
    }
    this._selectedColumns = this.listManagerService.columnManager.customizeSelectedColumns(this._selectCols);
  }
  classWrapper = async (canRefresh?: boolean) => {
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
  async LazyLoading(event: LazyLoadEvent) {
    if (event.sortField == '_defaultSortOrder') {
      event.sortField = '';
    }
    this.closeTabService.inactiveEntitiy = await this.closeTabService.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.requestLogInactiveEntity, event);
    this.totalRecords = this.closeTabService.inactiveEntitiy.totalRecords;
    this.insertColumns();
    this.convertLoginTime();
  }
  clearFilters(table: Table) {
    this.closeTabService.utilsService.clearFilters(table);
    this.hasFiltersInTable = false;
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
    this.getHasColumnsResizable();
  }

}
