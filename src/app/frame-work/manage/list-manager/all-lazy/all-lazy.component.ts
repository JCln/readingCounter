import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IBatchModifyRes, IOffloadModifyReq } from 'interfaces/inon-manage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { EN_Routes } from 'interfaces/routes.enum';
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
import { BriefKardexComponent } from '../brief-kardex/brief-kardex.component';
import { GeneralGroupInfoResComponent } from '../general-group-list-modify/general-group-info-res/general-group-info-res.component';
import { ListSearchMoshDgComponent } from '../list-search-mosh-dg/list-search-mosh-dg.component';
import { Table } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-all-lazy',
  templateUrl: './all-lazy.component.html',
  styleUrls: ['./all-lazy.component.scss']
})
export class AllLazyComponent extends AllListsFactory implements AfterViewInit {
  // should place only in component because overright totalNum needs for dynamic use  
  tempMainDataSource = { totalNum: 0, data: [] };
  @ViewChild(Table) datatableG: Table;
  hasFiltersInTable: boolean = false;

  _numberOfExtraColumns: number[] = [1, 2, 3, 4, 5, 6];
  _selectedColumnsToRemember: string = 'selectedOffloadedLazy';
  _sessionName: string = 'listOffloadedLazy';
  _outputFileName: string = 'listOffloadedLazy';
  _selectCols: any = [];
  _selectedColumns: any[];
  totalRecords: number;
  clonedProducts: { [s: string]: object; } = {};

  deleteDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
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
    private dateJalaliService: DateJalaliService
  ) {
    super(dialogService, listManagerService);
  }
  makeDefaultValCheckbox = () => {
    this.listManagerService.columnManager._generalGroupHeaderCheckbox = false;
  }
  updateOnChangedCounterState = async (event: any) => {
    this.closeTabService.offloadedAllLazy = await this.listManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.trackingAllInLazy + this.allListsService.offloadedListLazy_pageSign.GUid, event);
    console.log(this.closeTabService.offloadedAllLazy);
    this.totalRecords = this.closeTabService.offloadedAllLazy.totalRecords;

    this.closeTabService.AUXoffloadedAllLazy = JSON.parse(JSON.stringify(this.closeTabService.offloadedAllLazy.data));
    this.listManagerService.makeHadPicturesToBoolean(this.closeTabService.offloadedAllLazy.data);
    this.makeDefaultValCheckbox();
    this.deleteDictionary = this.listManagerService.getDeleteDictionary();
    this.karbariDictionaryCode = await this.listManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.qotrDictionary = await this.listManagerService.dictionaryWrapperService.getQotrDictionary();
    this.counterStateByCodeDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateByCodeShowAllDictionary(this.allListsService.offloadedListLazy_pageSign.zoneId);
    this.counterStateDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateByZoneShowAllDictionary(this.allListsService.offloadedListLazy_pageSign.zoneId);
    this.resetDataSourceView();


    this.closeTabService.offloadedAllLazy.data =
      Converter.convertIdsToTitles(
        this.closeTabService.offloadedAllLazy.data,
        {
          deleteDictionary: this.deleteDictionary,
          counterStateDictionary: this.counterStateDictionary,
          counterStateByCodeDictionary: this.counterStateByCodeDictionary,
          karbariDictionaryCode: this.karbariDictionaryCode,
          qotrDictionary: this.qotrDictionary,
        },
        {
          hazf: 'hazf',
          counterStateId: 'counterStateId',
          preCounterStateCode: 'preCounterStateCode',
          possibleKarbariCode: 'possibleKarbariCode',
          qotrCode: 'qotrCode'
        })
    Converter.convertIdToTitle(this.closeTabService.offloadedAllLazy.data, this.karbariDictionaryCode, 'karbariCode');
    this.listManagerService.setDynamicPartRanges(this.closeTabService.offloadedAllLazy.data);
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (!this.allListsService.offloadedListLazy_pageSign.GUid) {
      this.closeTabService.utilsService.routeTo(EN_Routes.trackOffloadedMaster);
    }
    else {
      console.log(1);

      // to show counterStates radioButtons
      await this.getCounterStateDictionaryAndAddSelectable(this.allListsService.offloadedListLazy_pageSign.zoneId);
      if (canRefresh) {
        this.closeTabService.offloadedAllLazy.data = [];
      }
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
    console.log(1);

    this.updateOnChangedCounterState(this.closeTabService.saveDataForOffloadedAllLazyReq);
  }
  resetDataSourceView = () => {
    // on each change of ChangedCounterState
    this.tempMainDataSource.totalNum = 0;
  }
  filterHelper = (): any[] => {
    let tempDataSource: any[] = [];
    if (this.tempFilter.first.length > 0) {
      for (let i = 0; i < this.tempMainDataSource.data.length; i++) {
        for (let j = 0; j < this.tempFilter.first.length; j++) {
          if (this.tempFilter.first[j] == this.tempMainDataSource.data[i]['counterStateId']) {
            tempDataSource.push(this.tempMainDataSource.data[i]);
          }
        }
      }
      return tempDataSource;
    }
    else {
      return this.tempMainDataSource.data;
    }
  }
  filterHelp2 = (tempDataSource: any): any[] => {
    let tempDataSource2: any[] = [];
    if (this.tempFilter.second.length > 0) {
      if (!MathS.isNull(tempDataSource)) {
        for (let i = 0; i < tempDataSource.length; i++) {
          for (let j = 0; j < this.tempFilter.second.length; j++) {
            if (this.tempFilter.second[j] == tempDataSource[i]['preCounterStateCode']) {
              tempDataSource2.push(tempDataSource[i]);
            }
          }
        }
        return tempDataSource2;
      }
      else {
        return tempDataSource;
      }
    }
    // if tempDataSource is null but filter is not null
    else {
      return tempDataSource;
    }
  }
  loadCustomers(event: LazyLoadEvent) {
    if (MathS.isNull(event.sortField)) {
      event.sortField = 'offloadDateJalali';
    }
    if (event.sortField == '_defaultSortOrder') {
      event.sortField = '';
    }
    event.filters['counterStateId'][0].value = this.closeTabService.saveDataForOffloadedAllLazyReq.multiSelectCounterStateId.length > 0 ? this.closeTabService.saveDataForOffloadedAllLazyReq.multiSelectCounterStateId : null;
    event.filters['preCounterStateCode'][0].value = this.closeTabService.saveDataForOffloadedAllLazyReq.multiSelectPreCounterStateCode.length > 0 ? this.closeTabService.saveDataForOffloadedAllLazyReq.multiSelectPreCounterStateCode : null;
    console.log(event);
    this.updateOnChangedCounterState(event);
  }
  changedFilterDropdowns(eventValue: any, elementName: string) {
    this.closeTabService.saveDataForOffloadedAllLazyReq[elementName] = eventValue;
    console.log(this.closeTabService.saveDataForOffloadedAllLazyReq);

  }
  getCounterStateDictionaryAndAddSelectable = (zone: number): Promise<any> => {
    return new Promise(async (resolve) => {
      this.counterStateByZoneDictionary = JSON.parse(JSON.stringify(await this.listManagerService.dictionaryWrapperService.getCounterStateByZoneIdDictionary(zone)));
      if (this.counterStateByZoneDictionary[0].id !== null)
        this.counterStateByZoneDictionary.unshift({ id: null, title: 'انتخاب کنید', isSelected: true })
      resolve(true);
    });
  }
  // have problem on SHOWING Without this Code for DropDowns
  clickedDropDowns = (event: any, element: string, dataId: any) => {
    for (let index = 0; index < this.closeTabService.offloadedAllLazy.data.length; index++) {
      if (this.closeTabService.offloadedAllLazy.data[index].id === dataId) {
        this.closeTabService.offloadedAllLazy.data[index][element] = event.title;
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
      for (let j = 0; j < this.closeTabService.offloadedAllLazy.data.length; j++) {
        if (data.detailsInfo[index].onOffLoadId === this.closeTabService.offloadedAllLazy.data[j].id) {

          this.closeTabService.offloadedAllLazy.data[j].id = data.detailsInfo[index].newOnOffLoadId;//insert newOnOffLoad to last dataSource Id
          if (data.detailsInfo[index].hasError) {
            // with error[index of dataSource]
            this.closeTabService.offloadedAllLazy.data[j].isResponseHasError = true;
            this.closeTabService.offloadedAllLazy.data[j].editedErrorDescription = data.detailsInfo[index].errorDescription;
          }
          else {
            // successful
            // possible for last icon remain in table, make sure new icons replace
            this.closeTabService.offloadedAllLazy.data[j].isResponseHasError = false;
            this.closeTabService.offloadedAllLazy.data[j].modifyType = null;
            this.closeTabService.offloadedAllLazy.data[j].editedErrorDescription = '';
          }
        }
      }

    }
    this.openEditedModifyBatch(data);
  }
  uploadAll = async () => {
    const temp: IOffloadModifyReq[] = [];

    for (let index = 0; index < this.closeTabService.offloadedAllLazy.data.length; index++) {

      let tempOrigin = this.closeTabService.offloadedAllLazy.data[index];
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
    for (let index = 0; index < this.closeTabService.offloadedAllLazy.data.length; index++) {
      if (this.closeTabService.offloadedAllLazy.data[index].id === dataId) {
        this.closeTabService.offloadedAllLazy.data[index].offloadDateJalali = event;
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
  hasBeenReadsToggler = () => {
    // if OnOffloadComponent rendering
    let temp: any[] = [];
    // should be false on initial(_generalGroupHeaderCheckbox) because filter on DataSource happen
    if (this.listManagerService.columnManager._generalGroupHeaderCheckbox) {
      for (let index = 0; index < this.closeTabService.offloadedAllLazy.data.length; index++) {
        if (this.closeTabService.offloadedAllLazy.data[index].counterStateId !== null)
          temp.push(this.closeTabService.offloadedAllLazy.data[index]);
      }
      this.closeTabService.offloadedAllLazy.data = temp;
    }
    else {
      if (!MathS.isNull(this.closeTabService.AUXoffloadedAllLazy)) {
        this.closeTabService.offloadedAllLazy.data = this.closeTabService.AUXoffloadedAllLazy;
      }
    }
  }
  getExcel = async () => {
    const res = await this.listManagerService.ajaxReqWrapperService.getBlobById(ENInterfaces.GeneralModifyAllExcelInGroup, this.allListsService.offloadedListLazy_pageSign.groupId);
    this.outputManagerService.downloadFile(res, '.xlsx');
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
