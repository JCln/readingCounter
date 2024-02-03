import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IObjectIteratation, IDictionaryManager } from 'interfaces/ioverall-config';
import { EN_Routes } from 'interfaces/routes.enum';
import { LazyLoadEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AllListsService } from 'services/all-lists.service';
import { BrowserStorageService } from 'services/browser-storage.service';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { OutputManagerService } from 'services/output-manager.service';
import { ProfileService } from 'services/profile.service';
import { SpinnerWrapperService } from 'services/spinner-wrapper.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { OffloadModify } from 'src/app/classes/offload-modify-type';
import { BriefKardexComponent } from '../../../list-manager/brief-kardex/brief-kardex.component';
import { ListSearchMoshDgComponent } from '../../../list-manager/list-search-mosh-dg/list-search-mosh-dg.component';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-master-by-fragment-all-lazy',
  templateUrl: './master-by-fragment-all-lazy.component.html',
  styleUrls: ['./master-by-fragment-all-lazy.component.scss']
})
export class MasterByFragmentAllLazyComponent extends AllListsFactory implements AfterViewInit {
  // should place only in component because overright totalNum needs for dynamic use  
  tempMainDataSource = { totalNum: 0, data: [] };
  @ViewChild(Table) datatableG: Table;
  hasFiltersInTable: boolean = false;

  _numberOfExtraColumns: number[] = [1, 2, 3, 4, 5];
  _selectedColumnsToRemember: string = 'selectedMasterByFragmentLazy';
  _sessionName: string = 'listMasterByFragmentLazy';
  _outputFileName: string = 'listMasterByFragmentLazy';
  _selectCols: any = [];
  _selectedColumns: IObjectIteratation[] = [];
  totalRecords: number;

  deleteDictionary: IDictionaryManager[] = [];
  masrafStateIdDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  highLowStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  counterStateByZoneDictionary: IDictionaryManager[] = [];

  modifyType: OffloadModify[];
  tempFilter = { first: [], second: [] };
  public readonly routerLink: string = this.closeTabService.utilsService.compositeService.getRouterUrl();

  constructor(
    public listManagerService: ListManagerService,
    public dialogService: DialogService,
    public closeTabService: CloseTabService,
    public allListsService: AllListsService,
    public outputManagerService: OutputManagerService,
    public browserStorageService: BrowserStorageService,
    public profileService: ProfileService,
    public spinnerWrapperService: SpinnerWrapperService
  ) {
    super(dialogService, listManagerService);
  }
  updateOnChangedCounterState = async (event: any) => {
    if (MathS.isNull(this.allListsService.masterByFragmentLazy_pageSign.GUid))
      return;

    this.closeTabService.simpleMasterByFragmentAllLazy = await this.listManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.trackingAllInLazy + this.allListsService.masterByFragmentLazy_pageSign.GUid, event);
    this.totalRecords = this.closeTabService.simpleMasterByFragmentAllLazy.totalRecords;

    this.listManagerService.makeHadPicturesToBoolean(this.closeTabService.simpleMasterByFragmentAllLazy.data);
    this.deleteDictionary = this.listManagerService.getDeleteDictionary();
    this.highLowStateDictionary = this.listManagerService.getHighLowDictionary();
    this.masrafStateIdDictionary = this.listManagerService.getMasrafStateDictionary();

    this.karbariDictionaryCode = await this.listManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.qotrDictionary = await this.listManagerService.dictionaryWrapperService.getQotrDictionary();
    this.counterStateByCodeDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateByCodeShowAllDictionary(this.allListsService.masterByFragmentLazy_pageSign.zoneId);
    this.counterStateDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateByZoneShowAllDictionary(this.allListsService.masterByFragmentLazy_pageSign.zoneId);
    this.resetDataSourceView();


    this.closeTabService.simpleMasterByFragmentAllLazy.data =
      Converter.convertIdsToTitles(
        this.closeTabService.simpleMasterByFragmentAllLazy.data,
        {
          deleteDictionary: this.deleteDictionary,
          counterStateDictionary: this.counterStateDictionary,
          counterStateByCodeDictionary: this.counterStateByCodeDictionary,
          karbariDictionaryCode: this.karbariDictionaryCode,
          qotrDictionary: this.qotrDictionary
        },
        {
          hazf: 'hazf',
          counterStateId: 'counterStateId',
          preCounterStateCode: 'preCounterStateCode',
          possibleKarbariCode: 'possibleKarbariCode',
          qotrCode: 'qotrCode'
        })
    Converter.convertIdToTitle(this.closeTabService.simpleMasterByFragmentAllLazy.data, this.karbariDictionaryCode, 'karbariCode');
    this.listManagerService.setDynamicPartRanges(this.closeTabService.simpleMasterByFragmentAllLazy.data);
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (!this.allListsService.masterByFragmentLazy_pageSign.GUid) {
      this.closeTabService.utilsService.routeTo(EN_Routes.simpleMasterByFragment);
    }
    else {
      // to show counterStates radioButtons      
      this.counterStateByZoneDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateByZoneIdDictionary(this.allListsService.masterByFragmentLazy_pageSign.zoneId);
      if (this.browserStorageService.isExists(this._outputFileName)) {
        this._selectCols = this.browserStorageService.getLocal(this._outputFileName);
      } else {
        this._selectCols = this.listManagerService.columnManager.getColumnsMenus(this._outputFileName);
      }
      this._selectedColumns = this.listManagerService.columnManager.customizeSelectedColumns(this._selectCols);
      this.insertSelectedColumns();
      // setDynamics should implement before new instance of dataSource create       
    }
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

    if (MathS.isNull(event.sortField)) {
      event.sortField = 'offloadDateJalali';
    }
    if (event.sortField == '_defaultSortOrder') {
      event.sortField = '';
    }
    if (event.filters.hasOwnProperty('counterStateId'))
      event.filters['counterStateId'][0].value = this.closeTabService.masterByFragmentLazyReq.multiSelectCounterStateId.length > 0 ? this.closeTabService.masterByFragmentLazyReq.multiSelectCounterStateId : null;
    if (event.filters.hasOwnProperty('preCounterStateCode'))
      event.filters['preCounterStateCode'][0].value = this.closeTabService.masterByFragmentLazyReq.multiSelectPreCounterStateCode.length > 0 ? this.closeTabService.masterByFragmentLazyReq.multiSelectPreCounterStateCode : null;
    if (event.filters.hasOwnProperty('karbariCode'))
      event.filters['karbariCode'][0].value = this.closeTabService.masterByFragmentLazyReq.multiSelectkarbariCode.length > 0 ? this.closeTabService.masterByFragmentLazyReq.multiSelectkarbariCode : null;
    if (event.filters.hasOwnProperty('hazf'))
      event.filters['hazf'][0].value = this.closeTabService.masterByFragmentLazyReq.multiSelectHazf.length > 0 ? this.closeTabService.masterByFragmentLazyReq.multiSelectHazf : null;
    if (event.filters.hasOwnProperty('masrafStateId'))
      event.filters['masrafStateId'][0].value = this.closeTabService.masterByFragmentLazyReq.multiSelectMasrafStateId.length > 0 ? this.closeTabService.masterByFragmentLazyReq.multiSelectMasrafStateId : null;

    this.updateOnChangedCounterState(event);
  }
  changedFilterDropdowns(eventValue: any, elementName: string) {
    this.closeTabService.masterByFragmentLazyReq[elementName] = eventValue;
  }
  // have problem on SHOWING Without this Code for DropDowns
  clickedDropDowns = (event: any, element: string, dataId: any) => {
    for (let index = 0; index < this.closeTabService.simpleMasterByFragmentAllLazy.data.length; index++) {
      if (this.closeTabService.simpleMasterByFragmentAllLazy.data[index].id === dataId) {
        this.closeTabService.simpleMasterByFragmentAllLazy.data[index][element] = event.title;
      }
    }
  }
  insertSelectedColumns = () => {
    this.modifyType = this.listManagerService.getOffloadModifyType();
  }
  receiveDateJalali = (event: any, dataId: string) => {
    // to make date updated to latest change by user
    for (let index = 0; index < this.closeTabService.simpleMasterByFragmentAllLazy.data.length; index++) {
      if (this.closeTabService.simpleMasterByFragmentAllLazy.data[index].id === dataId) {
        this.closeTabService.simpleMasterByFragmentAllLazy.data[index].offloadDateJalali = event;
      }
    }
  }
  openMoshtarakinDialog = (dataSource: any) => {
    // مشاهده سابقه
    this.ref = this.dialogService.open(ListSearchMoshDgComponent, {
      data: {
        eshterak: dataSource.eshterak,
        zoneId: dataSource.zoneId
      },
      rtl: true,
      width: '90%'
    })
    this.ref.onClose.subscribe((res: any) => {
      if (res)
        console.log(res);
    });
  }
  openBriefKardexDialog = (dataSource: any) => {
    this.ref = this.dialogService.open(BriefKardexComponent, {
      data: {
        radif: dataSource.radif,
        zoneId: dataSource.zoneId
      },
      rtl: true,
      width: '90%'
    })
    this.ref.onClose.subscribe((res: any) => {
      if (res)
        console.log(res);
    });
  }
  getExcel = async () => {
    const res = await this.listManagerService.ajaxReqWrapperService.getBlobByIdAsJson(ENInterfaces.GeneralModifyAllExcelInGroup, this.allListsService.masterByFragmentLazy_pageSign.groupId);
    this.outputManagerService.downloadFile(res);
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
  getLocalReOrderable = (): boolean => {
    return this.profileService.getLocalReOrderable();
  }
  clearFilters(table: Table) {
    this.closeTabService.masterByFragmentLazyReq.multiSelectCounterStateId = [];
    this.closeTabService.masterByFragmentLazyReq.multiSelectPreCounterStateCode = [];
    this.closeTabService.masterByFragmentLazyReq.multiSelectkarbariCode = [];
    this.closeTabService.masterByFragmentLazyReq.multiSelectHazf = [];
    this.closeTabService.masterByFragmentLazyReq.multiSelectMasrafStateId = [];
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
