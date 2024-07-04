import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IRequestDraft } from 'interfaces/i-branch';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DialogService } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { BrowserStorageService } from 'services/browser-storage.service';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { OutputManagerService } from 'services/output-manager.service';
import { ProfileService } from 'services/profile.service';
import { AllListsFactory } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { RequestDraftDgComponent } from '../request-draft-getlazy/request-draft-dg/request-draft-dg.component';
import { Table } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-flow-rule-get-registered',
  templateUrl: './flow-rule-get-registered.component.html',
  styleUrls: ['./flow-rule-get-registered.component.scss']
})
export class FlowRuleGetRegisteredComponent extends AllListsFactory implements AfterViewInit {
  // should place only in component because overright totalNum needs for dynamic use  
  tempMainDataSource = { totalNum: 0, data: [] };
  @ViewChild(Table) datatableG: Table;
  hasFiltersInTable: boolean = false;
  zoneDictionary: [];
  usageDictionary: [];
  branchDiameterDictionary: [];
  guildDictionary: [];
  ownershipTypeDictionary: [];
  branchStateDictionary: [];
  waterSourceDictionary: [];
  customerTypeDictionary: [];
  offeringGroupDictionary: any[] = [];

  _numberOfExtraColumns: number[] = [1, 2];
  _selectedColumnsToRemember: string = 'selectedFlowRuleGetRegisteredLazy';
  _sessionName: string = 'flowRuleGetRegisteredLazy';
  _outputFileName: string = 'flowRuleGetRegisteredLazy';
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
    public branchesService: BranchesService,
  ) {
    super(dialogService, listManagerService);
  }
  updateOnChangedCounterState = async (event: any) => {
    this.closeTabService.flowRuleGetRegisteredLazy = await this.listManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.flowRequestGetRegistered, event);
    this.totalRecords = this.closeTabService.flowRuleGetRegisteredLazy.totalRecords;

  }
  dictionaryWrapper = async () => {
    this.offeringGroupDictionary = await this.branchesService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.offeringAllInGroup, this.branchesService.utilsService.getRequestDraftIds().requestDraft);
    this.zoneDictionary = await this.branchesService.dictionaryWrapperService.getZoneDictionary();
    this.usageDictionary = await this.branchesService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.branchDiameterDictionary = await this.branchesService.dictionaryWrapperService.getQotrDictionary();
    this.guildDictionary = await this.branchesService.dictionaryWrapperService.getGuildDictionary(false);
    this.ownershipTypeDictionary = await this.branchesService.dictionaryWrapperService.getOwnershipTypeDictionary(false);
    this.branchStateDictionary = await this.branchesService.dictionaryWrapperService.getBranchStateDictionary(false);
    this.waterSourceDictionary = await this.branchesService.dictionaryWrapperService.getWaterSourceDictionary(false);
    this.customerTypeDictionary = await this.branchesService.dictionaryWrapperService.getCustomerTypeDictionary(false);
  }

  classWrapper = async () => {
    if (this.browserStorageService.isExists(this._outputFileName)) {
      this._selectCols = this.browserStorageService.getLocal(this._outputFileName);
    } else {
      this._selectCols = this.listManagerService.columnManager.getColumnsMenus(this._outputFileName);
    }
    this._selectedColumns = this.listManagerService.columnManager.customizeSelectedColumns(this._selectCols);
    this.dictionaryWrapper();
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
    for (let index = 0; index < this.closeTabService.flowRuleGetRegisteredLazy.data.length; index++) {
      if (this.closeTabService.flowRuleGetRegisteredLazy.data[index].id === dataId) {
        this.closeTabService.flowRuleGetRegisteredLazy.data[index][element] = event.title;
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
  removeSingleRow = async (rowDataAndIndex: IRequestDraft): Promise<any> => {
    const config = {
      messageTitle: EN_messages.confirm_remove,
      text: 'ناحیه: ' + rowDataAndIndex.zoneTitle + '،   شناسه قبض: ' + rowDataAndIndex.billId + '،   کاربری: ' + rowDataAndIndex.usageTitle,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      icon: 'pi pi-trash'
    }
    const confirmed = await this.listManagerService.utilsService.firstConfirmDialog(config);
    if (confirmed) {
      const res = await this.listManagerService.ajaxReqWrapperService.postDataSourceById(ENInterfaces.flowRuleRemove, rowDataAndIndex.id);
      this.listManagerService.utilsService.snackBarMessageSuccess(res.message);
      this.refreshTable();
    }
  }
  editSingleRow = (data: IRequestDraft) => {
    this.ref = this.dialogService.open(RequestDraftDgComponent, {
      data: data,
      rtl: true,
      width: '70%'
    })
    this.ref.onClose.subscribe((res: IRequestDraft) => {
      console.log(res);

      if (res)
        this.refreshTable();
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
