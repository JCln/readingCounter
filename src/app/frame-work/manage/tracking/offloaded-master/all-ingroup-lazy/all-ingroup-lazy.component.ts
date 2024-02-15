import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IBatchModifyRes, IOffloadModifyReq } from 'interfaces/inon-manage';
import { IDictionaryManager, IObjectIteratation } from 'interfaces/ioverall-config';
import { EN_Routes } from 'interfaces/routes.enum';
import { LazyLoadEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AllListsService } from 'services/all-lists.service';
import { BrowserStorageService } from 'services/browser-storage.service';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { ListManagerService } from 'services/list-manager.service';
import { OutputManagerService } from 'services/output-manager.service';
import { ProfileService } from 'services/profile.service';
import { SpinnerWrapperService } from 'services/spinner-wrapper.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { OffloadModify } from 'src/app/classes/offload-modify-type';
import { BriefKardexComponent } from '../../../list-manager/brief-kardex/brief-kardex.component';
import { GeneralGroupInfoResComponent } from '../../../list-manager/general-group-list-modify/general-group-info-res/general-group-info-res.component';
import { ListSearchMoshDgComponent } from '../../../list-manager/list-search-mosh-dg/list-search-mosh-dg.component';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-all-ingroup-lazy',
  templateUrl: './all-ingroup-lazy.component.html',
  styleUrls: ['./all-ingroup-lazy.component.scss']
})
export class AllIngroupLazyComponent extends AllListsFactory implements AfterViewInit {
  // should place only in component because overright totalNum needs for dynamic use  
  tempMainDataSource = { totalNum: 0, data: [] };
  @ViewChild(Table) datatableG: Table;
  hasFiltersInTable: boolean = false;

  _numberOfExtraColumns: number[] = [1, 2, 3, 4, 5, 6];
  _selectedColumnsToRemember: string = 'selectedOffloadedAllInGroupLazy';
  _sessionName: string = 'listOffloadedAllInGroupLazy';
  _outputFileName: string = 'listOffloadedAllInGroupLazy';
  _selectCols: any = [];
  _selectedColumns: IObjectIteratation[] = [];
  totalRecords: number;

  deleteDictionary: IDictionaryManager[] = [];
  masrafStateIdDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  highLowStateDictionary: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
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
    public spinnerWrapperService: SpinnerWrapperService,
    private dateJalaliService: DateJalaliService,
  ) {
    super(dialogService, listManagerService);
  }
  updateOnChangedCounterState = async (event: any) => {
    if (MathS.isNull(this.allListsService.offloadedListAllInGroupLazy_pageSign.groupId))
      return;

    this.closeTabService.offloadedAllInGroupLazy = await this.listManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.trackingAllInGroupLazy + this.allListsService.offloadedListAllInGroupLazy_pageSign.groupId, event);
    this.totalRecords = this.closeTabService.offloadedAllInGroupLazy.totalRecords;

    this.listManagerService.makeHadPicturesToBoolean(this.closeTabService.offloadedAllInGroupLazy.data);
    this.deleteDictionary = this.listManagerService.getDeleteDictionary();
    this.highLowStateDictionary = this.listManagerService.getHighLowDictionary();
    this.masrafStateIdDictionary = this.listManagerService.getMasrafStateDictionary();

    this.counterStateByZoneDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateByZoneIdDictionary(this.allListsService.offloadedListAllInGroupLazy_pageSign.zoneId);
    this.karbariDictionaryCode = await this.listManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.qotrDictionary = await this.listManagerService.dictionaryWrapperService.getQotrDictionary();
    this.counterStateByCodeDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateByCodeShowAllDictionary(this.allListsService.offloadedListAllInGroupLazy_pageSign.zoneId);
    this.counterStateDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateByZoneShowAllDictionary(this.allListsService.offloadedListAllInGroupLazy_pageSign.zoneId);
    this.resetDataSourceView();


    this.closeTabService.offloadedAllInGroupLazy.data =
      Converter.convertIdsToTitles(
        this.closeTabService.offloadedAllInGroupLazy.data,
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
    Converter.convertIdToTitle(this.closeTabService.offloadedAllInGroupLazy.data, this.karbariDictionaryCode, 'karbariCode');
    this.listManagerService.setDynamicPartRanges(this.closeTabService.offloadedAllInGroupLazy.data);
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (!this.allListsService.offloadedListAllInGroupLazy_pageSign.GUid) {
      this.closeTabService.utilsService.routeTo(EN_Routes.trackOffloadedMaster);
    }
    else {
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
    if (MathS.isNull(event.sortField)) {
      event.sortField = 'offloadDateJalali';
    }
    if (event.sortField == '_defaultSortOrder') {
      event.sortField = '';
    }
    if (event.filters.hasOwnProperty('counterStateId'))
      event.filters['counterStateId'][0].value = this.closeTabService.allInGroupLazyReq.multiSelectCounterStateId.length > 0 ? this.closeTabService.allInGroupLazyReq.multiSelectCounterStateId : null;
    if (event.filters.hasOwnProperty('preCounterStateCode'))
      event.filters['preCounterStateCode'][0].value = this.closeTabService.allInGroupLazyReq.multiSelectPreCounterStateCode.length > 0 ? this.closeTabService.allInGroupLazyReq.multiSelectPreCounterStateCode : null;
    if (event.filters.hasOwnProperty('karbariCode'))
      event.filters['karbariCode'][0].value = this.closeTabService.allInGroupLazyReq.multiSelectkarbariCode.length > 0 ? this.closeTabService.allInGroupLazyReq.multiSelectkarbariCode : null;
    if (event.filters.hasOwnProperty('hazf'))
      event.filters['hazf'][0].value = this.closeTabService.allInGroupLazyReq.multiSelectHazf.length > 0 ? this.closeTabService.allInGroupLazyReq.multiSelectHazf : null;
    if (event.filters.hasOwnProperty('masrafStateId'))
      event.filters['masrafStateId'][0].value = this.closeTabService.allInGroupLazyReq.multiSelectMasrafStateId.length > 0 ? this.closeTabService.allInGroupLazyReq.multiSelectMasrafStateId : null;

    this.updateOnChangedCounterState(event);
  }
  changedFilterDropdowns(eventValue: any, elementName: string) {
    this.closeTabService.allInGroupLazyReq[elementName] = eventValue;
  }
  // have problem on SHOWING Without this Code for DropDowns
  clickedDropDowns = (event: any, element: string, dataId: any) => {
    for (let index = 0; index < this.closeTabService.offloadedAllInGroupLazy.data.length; index++) {
      if (this.closeTabService.offloadedAllInGroupLazy.data[index].id === dataId) {
        this.closeTabService.offloadedAllInGroupLazy.data[index][element] = event.title;
      }
    }
  }
  insertSelectedColumns = () => {
    this.modifyType = this.listManagerService.getOffloadModifyType();
  }
  convertTitleToId = (dataSource: any): any => {
    if (!MathS.isNull(dataSource)) {
      return this.counterStateByZoneDictionary.find(item => {
        if (item.title === dataSource)
          return item;
      })
    }
    else {
      this.listManagerService.showSnackWarn(EN_messages.insert_counterStateDetails);
    }
  }
  convertTitleToIdByModifyType = (dataSource: any): any => {
    return this.modifyType.find(item => {
      if (item.title === dataSource)
        return item;
    })
  }
  manageModifyBatchResponse = (data: IBatchModifyRes) => {
    for (let index = 0; index < data.detailsInfo.length; index++) {
      for (let j = 0; j < this.closeTabService.offloadedAllInGroupLazy.data.length; j++) {
        if (data.detailsInfo[index].onOffLoadId === this.closeTabService.offloadedAllInGroupLazy.data[j].id) {

          this.closeTabService.offloadedAllInGroupLazy.data[j].id = data.detailsInfo[index].newOnOffLoadId;//insert newOnOffLoad to last dataSource Id
          if (data.detailsInfo[index].hasError) {
            // with error[index of dataSource]
            this.closeTabService.offloadedAllInGroupLazy.data[j].isResponseHasError = true;
            this.closeTabService.offloadedAllInGroupLazy.data[j].editedErrorDescription = data.detailsInfo[index].errorDescription;
          }
          else {
            // successful
            // possible for last icon remain in table, make sure new icons replace
            this.closeTabService.offloadedAllInGroupLazy.data[j].isResponseHasError = false;
            this.closeTabService.offloadedAllInGroupLazy.data[j].modifyType = null;
            this.closeTabService.offloadedAllInGroupLazy.data[j].editedErrorDescription = '';
          }
        }
      }

    }
    this.openEditedModifyBatch(data);
  }
  uploadAll = async () => {
    const temp: IOffloadModifyReq[] = [];

    for (let index = 0; index < this.closeTabService.offloadedAllInGroupLazy.data.length; index++) {

      let tempOrigin = this.closeTabService.offloadedAllInGroupLazy.data[index];
      if (typeof tempOrigin.modifyType == 'object') {
        tempOrigin.modifyType = null;
      }

      if (!MathS.isNull(tempOrigin.modifyType) && this.convertTitleToIdByModifyType(tempOrigin.modifyType).id != null) {

        let tempCounterState = this.convertTitleToId(tempOrigin.counterStateId).id;
        let tempModifyType = this.convertTitleToIdByModifyType(tempOrigin.modifyType).id

        // because modify values could be zero(0) Maths.isNull could not be precise
        if (tempModifyType == null) {
          this.listManagerService.showSnackWarn(EN_messages.insert_modifyTypeShouldHaveValue);
          return;
        }
        // TODO: NO Null CounterStateId is valid
        if (tempCounterState == null) {
          this.listManagerService.showSnackWarn(EN_messages.insert_counterStateShouldHaveValue);
          return;
        }

        else {
          temp.push({
            id: tempOrigin.id,
            modifyType: tempModifyType,
            checkedItems: [0],
            counterStateId: tempCounterState,
            counterNumber: tempOrigin.counterNumber,
            jalaliDay: tempOrigin.offloadDateJalali ? tempOrigin.offloadDateJalali : this.dateJalaliService.getCurrentDate(),
            description: tempOrigin.description
          })
        }
      }
    }
    if (MathS.isNull(temp)) {
      this.listManagerService.showSnackWarn(EN_messages.no_modifyFound);
    } else {
      // TODO: Should convert Arabic Numbers to ENG to counterNumbers
      // to upload valid data to server and get valid response      
      this.manageModifyBatchResponse(await this.listManagerService.ajaxReqWrapperService.postDataSourceArray(ENInterfaces.trackingToOffloadedGroupModifyBatch, temp));
    }
  }
  receiveDateJalali = (event: any, dataId: string) => {
    // to make date updated to latest change by user
    for (let index = 0; index < this.closeTabService.offloadedAllInGroupLazy.data.length; index++) {
      if (this.closeTabService.offloadedAllInGroupLazy.data[index].id === dataId) {
        this.closeTabService.offloadedAllInGroupLazy.data[index].offloadDateJalali = event;
      }
    }
  }
  openEditedModifyBatch = (data: IBatchModifyRes) => {
    this.ref = this.dialogService.open(GeneralGroupInfoResComponent, {
      data: {
        doneCount: data.doneCount, errorCount: data.errorCount
      },
      rtl: true,
      width: '60%',
      showHeader: true
    })
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
    const res = await this.listManagerService.ajaxReqWrapperService.getBlobByIdAsJson(ENInterfaces.GeneralModifyAllExcelInGroup, this.allListsService.offloadedListAllInGroupLazy_pageSign.groupId);
    this.outputManagerService.downloadFileWithContentDisposition(res);
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
    this.closeTabService.allInGroupLazyReq.multiSelectCounterStateId = [];
    this.closeTabService.allInGroupLazyReq.multiSelectPreCounterStateCode = [];
    this.closeTabService.allInGroupLazyReq.multiSelectkarbariCode = [];
    this.closeTabService.allInGroupLazyReq.multiSelectHazf = [];
    this.closeTabService.allInGroupLazyReq.multiSelectMasrafStateId = [];
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
