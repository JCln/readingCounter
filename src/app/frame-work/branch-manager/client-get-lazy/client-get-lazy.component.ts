import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { LazyLoadEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { BrowserStorageService } from 'services/browser-storage.service';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { OutputManagerService } from 'services/output-manager.service';
import { ProfileService } from 'services/profile.service';
import { AllListsFactory } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-client-get-lazy',
  templateUrl: './client-get-lazy.component.html',
  styleUrls: ['./client-get-lazy.component.scss']
})
export class ClientGetLazyComponent extends AllListsFactory implements AfterViewInit {
  // should place only in component because overright totalNum needs for dynamic use  
  tempMainDataSource = { totalNum: 0, data: [] };
  @ViewChild(Table) datatableG: Table;
  hasFiltersInTable: boolean = false;

  _numberOfExtraColumns: number[] = [];
  _selectedColumnsToRemember: string = 'selectedClientGetlazy';
  _sessionName: string = 'clientManagerGetLazy';
  _outputFileName: string = 'clientManagerGetLazy';
  _selectCols: any = [];
  _selectedColumns: IObjectIteratation[] = [];
  totalRecords: number;

  tempFilter = { first: [], second: [] };
  public readonly routerLink: string = this.closeTabService.utilsService.compositeService.getRouterUrl();

  constructor(
    public listManagerService: ListManagerService,
    public dialogService: DialogService,
    public closeTabService: CloseTabService,
    public outputManagerService: OutputManagerService,
    public browserStorageService: BrowserStorageService,
    public profileService: ProfileService,
  ) {
    super(dialogService, listManagerService);
  }
  updateOnChangedCounterState = async (event: any) => {
    this.closeTabService.clientGetLazy = await this.listManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.clientGetLazy, event);
    this.totalRecords = this.closeTabService.clientGetLazy.totalRecords;

  }
  classWrapper = async () => {
    if (this.browserStorageService.isExists(this._outputFileName)) {
      this._selectCols = this.browserStorageService.getLocal(this._outputFileName);
    } else {
      this._selectCols = this.listManagerService.columnManager.getColumnsMenus(this._outputFileName);
    }
    this._selectedColumns = this.listManagerService.columnManager.customizeSelectedColumns(this._selectCols);
    // setDynamics should implement before new instance of dataSource create           
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
  LazyLoading(event: LazyLoadEvent) {
    console.log(event);
    // if (event.filters.hasOwnProperty('counterStateId'))
    //   event.filters['counterStateId'][0].value = this.closeTabService.masterByFragmentLazyReq.multiSelectCounterStateId.length > 0 ? this.closeTabService.masterByFragmentLazyReq.multiSelectCounterStateId : null;

    if (MathS.isNull(event.sortField)) {
      event.sortField = '';
    }
    if (event.sortField == '_defaultSortOrder') {
      event.sortField = '';
    }

    this.updateOnChangedCounterState(event);
  }
  // have problem on SHOWING Without this Code for DropDowns
  clickedDropDowns = (event: any, element: string, dataId: any) => {
    for (let index = 0; index < this.closeTabService.clientGetLazy.data.length; index++) {
      if (this.closeTabService.clientGetLazy.data[index].id === dataId) {
        this.closeTabService.clientGetLazy.data[index][element] = event.title;
      }
    }
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  saveColumns() {
    let newArray: any[] = [];
    for (let i = 0; i < this._selectCols.length; i++) {
      let element = this._selectCols[i];
      element.isSelected = false;
      newArray.push(element);
      for (let j = 0; j < this._selectedColumns.length; j++) {
        if (this._selectCols[i].field == this._selectedColumns[j].field) {
          element.isSelected = true;
          newArray[i].isSelected = true;
        }
      }
    }

    this.browserStorageService.setToLocal(this._outputFileName, newArray);
    this.closeTabService.utilsService.snackBarMessageSuccess(EN_messages.tableSaved);
  }
  resetSavedColumns = () => {
    if (!MathS.isNull(this._outputFileName)) {
      if (this.browserStorageService.isExists(this._outputFileName)) {
        this.browserStorageService.removeLocal(this._outputFileName);
        this.closeTabService.utilsService.snackBarMessageSuccess(EN_messages.tableResetSaved);
      } else {
        this.closeTabService.utilsService.snackBarMessageSuccess(EN_messages.tableDefaultColumnOrder);
      }
    }
    else
      this.closeTabService.utilsService.snackBarMessageWarn(EN_messages.done);
  }
  clearFilters(table: Table) {
    this.closeTabService.utilsService.clearFilters(table);
    this.hasFiltersInTable = false;
  }
  hasFilters = () => {
    this.hasFiltersInTable = this.closeTabService.utilsService.hasFilters(this.datatableG);
  }
  ngAfterViewInit(): void {
    this.hasFilters();
  }


}
