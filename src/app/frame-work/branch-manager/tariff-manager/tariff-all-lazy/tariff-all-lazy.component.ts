import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ITariffAll } from 'interfaces/i-branch';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { LazyLoadEvent } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { BrowserStorageService } from 'services/browser-storage.service';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { OutputManagerService } from 'services/output-manager.service';
import { ProfileService } from 'services/profile.service';
import { AllListsFactory } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { TariffAllLazyDgComponent } from './tariff-all-lazy-dg/tariff-all-lazy-dg.component';

@Component({
  selector: 'app-tariff-all-lazy',
  templateUrl: './tariff-all-lazy.component.html',
  styleUrls: ['./tariff-all-lazy.component.scss']
})
export class TariffAllLazyComponent extends AllListsFactory implements AfterViewInit {
  // should place only in component because overright totalNum needs for dynamic use  
  tempMainDataSource = { totalNum: 0, data: [] };
  @ViewChild(Table) datatableG: Table;
  ref: DynamicDialogRef;
  hasFiltersInTable: boolean = false;

  _numberOfExtraColumns: number[] = [1, 2];
  _selectedColumnsToRemember: string = 'selectedTariffAllLazy';
  _sessionName: string = 'tariffAllLazy';
  _outputFileName: string = 'tariffAllLazy';
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
    public profileService: ProfileService
  ) {
    super(dialogService, listManagerService);
  }
  updateOnChangedCounterState = async (event: any) => {
    this.closeTabService.tariffAllLazy = await this.listManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.tariffAllLazy, event);
    this.totalRecords = this.closeTabService.tariffAllLazy.totalRecords;

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
    for (let index = 0; index < this.closeTabService.tariffAllLazy.data.length; index++) {
      if (this.closeTabService.tariffAllLazy.data[index].id === dataId) {
        this.closeTabService.tariffAllLazy.data[index][element] = event.title;
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
  removeSingleRow = async (rowDataAndIndex: ITariffAll): Promise<any> => {
    console.log(rowDataAndIndex);

    const config = {
      messageTitle: EN_messages.confirm_remove,
      messageTitleTwo: 'ناحیه: ' + rowDataAndIndex.zoneTitle + '،   اقلام: ' + rowDataAndIndex.offeringTitle,
      text: 'فرمول: ' + rowDataAndIndex.formula,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      icon: 'pi pi-trash'
    }
    const confirmed = await this.listManagerService.utilsService.firstConfirmDialog(config);
    if (confirmed) {
      const res = await this.listManagerService.ajaxReqWrapperService.postDataSourceById(ENInterfaces.tariffRemove, rowDataAndIndex.id);
      this.listManagerService.utilsService.snackBarMessageSuccess(res.message);
      this.refreshTable();
    }
  }
  // openDialog = (isEditing: boolean, item?: any) => {
  //   const test = !item ? this.fragmentManagerService.pageSignsService.fragmentDetails_pageSign.GUid : item;
  //   console.log(test);
  //   // TODO: if there is no item ( user click on add button) then send fragment master GUID 
  //   this.ref = this.dialogService.open(FdDgComponent, {
  //     data: {
  //       data: !item ? this.fragmentManagerService.pageSignsService.fragmentDetails_pageSign.GUid : item,
  //       isEditing: isEditing
  //     },
  //     rtl: true,
  //     contentStyle: { minWidth: '21rem' }
  //   })
  //   this.ref.onClose.subscribe(async res => {
  //     if (res) {
  //       this.callAPI();
  //     }
  //   });
  // }
  openDialog = (isEditing: boolean, item?: ITariffAll) => {
    console.log(isEditing);
    console.log(item);
    // TODO: if there is no item ( user click on add button) then send fragment master GUID 
    this.ref = this.dialogService.open(TariffAllLazyDgComponent, {
      data: {
        data: isEditing ? item : null,
        isEditing: isEditing
      },
      rtl: true,
      contentStyle: { minWidth: '21rem' }
    })
    this.ref.onClose.subscribe(async res => {
      if (res) {
        this.refreshTable();
      }
    });
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
