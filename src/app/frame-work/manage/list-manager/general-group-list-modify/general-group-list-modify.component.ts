import { DateJalaliService } from 'services/date-jalali.service';
import { Component, Input, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IBatchModifyRes, IOffloadModifyReq } from 'interfaces/inon-manage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService } from 'primeng/dynamicdialog';
import { AllListsService } from 'services/all-lists.service';
import { BrowserStorageService } from 'services/browser-storage.service';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { OutputManagerService } from 'services/output-manager.service';
import { ProfileService } from 'services/profile.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { OffloadModify } from 'src/app/classes/offload-modify-type';
import { EN_Routes } from 'interfaces/routes.enum';

import { BriefKardexComponent } from '../brief-kardex/brief-kardex.component';
import { ListSearchMoshDgComponent } from '../list-search-mosh-dg/list-search-mosh-dg.component';
import { GeneralGroupInfoResComponent } from './general-group-info-res/general-group-info-res.component';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-general-group-list-modify',
  templateUrl: './general-group-list-modify.component.html',
  styleUrls: ['./general-group-list-modify.component.scss']
})
export class GeneralGroupListModifyComponent extends AllListsFactory {
  // should place only in component because overright totalNum needs for dynamic use  
  tempMainDataSource = { totalNum: 0, data: [] };
  @ViewChild(Table) datatableG: Table;
  hasFiltersInTable: boolean = false;

  _numberOfExtraColumns: number[] = [1, 2, 3, 4, 5, 6];
  _selectedColumnsToRemember: string = 'selectedGeneralGroupModify';
  _sessionName: string = 'generalGroupModify';
  _outputFileName: string = 'generalGroupModify';
  _selectCols: any = [];
  _selectedColumns: any[];

  clonedProducts: { [s: string]: object; } = {};

  deleteDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  counterStateByZoneDictionary: IDictionaryManager[] = [];
  counterStateForModifyDictionary: IDictionaryManager[] = [];
  highLowStateDictionary: IDictionaryManager[] = [];

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
    private dateJalaliService: DateJalaliService
  ) {
    super(dialogService, listManagerService);
  }
  makeDefaultValCheckbox = () => {
    this.listManagerService.columnManager._generalGroupHeaderCheckbox = false;
  }
  updateOnChangedCounterState = async (val: number, shouldCallApi: boolean) => {
    if (val) {
      // TODO: if from same listNumber, no need to call api, check BY GROUP ID
      if ((
        !this.closeTabService.saveDataForLMGeneralGroupModify ||
        (
          this.closeTabService.saveDataForLMGeneralGroupModifyReq.GUid !=
          this.allListsService.generalModifyListsGrouped_pageSign.GUid
        ) &&
        (
          this.closeTabService.saveDataForLMGeneralGroupModifyReq.groupId !=
          this.allListsService.generalModifyListsGrouped_pageSign.groupId
        ) ||
        shouldCallApi
      )) {
        this.closeTabService.saveDataForLMGeneralGroupModify = await this.listManagerService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.trackingToOFFLOADEDGeneralModify + this.allListsService.generalModifyListsGrouped_pageSign.groupId + '/', val);
        this.closeTabService.AUXSaveDataForLMGeneralGroupModify = JSON.parse(JSON.stringify(this.closeTabService.saveDataForLMGeneralGroupModify));
        this.listManagerService.makeHadPicturesToBoolean(this.closeTabService.saveDataForLMGeneralGroupModify);
        this.closeTabService.saveDataForLMGeneralGroupModifyReq.GUid = this.allListsService.generalModifyListsGrouped_pageSign.GUid;
        this.closeTabService.saveDataForLMGeneralGroupModifyReq.groupId = this.allListsService.generalModifyListsGrouped_pageSign.groupId;
      }
      this.makeDefaultValCheckbox();
      this.deleteDictionary = this.listManagerService.getDeleteDictionary();
      this.highLowStateDictionary = this.listManagerService.getHighLowDictionary();
      this.karbariDictionaryCode = await this.listManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
      this.qotrDictionary = await this.listManagerService.dictionaryWrapperService.getQotrDictionary();
      this.counterStateByCodeDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateByCodeShowAllDictionary(this.allListsService.generalModifyListsGrouped_pageSign.zoneId);
      this.counterStateDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateByZoneShowAllDictionary(this.allListsService.generalModifyListsGrouped_pageSign.zoneId);
      this.resetDataSourceView();


      this.closeTabService.saveDataForLMGeneralGroupModify =
        Converter.convertIdsToTitles(
          this.closeTabService.saveDataForLMGeneralGroupModify,
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
      Converter.convertIdToTitle(this.closeTabService.saveDataForLMGeneralGroupModify, this.karbariDictionaryCode, 'karbariCode');
      this.listManagerService.setDynamicPartRanges(this.closeTabService.saveDataForLMGeneralGroupModify);
    }
  }
  classWrapper = async (canRefresh?: boolean) => {
    console.log(this.allListsService.generalModifyListsGrouped_pageSign);
    
    if (!this.allListsService.generalModifyListsGrouped_pageSign.GUid) {
      this.closeTabService.utilsService.routeTo(EN_Routes.wrmtrackoffloadedGroup);
    }
    else {
      // to show counterStates radioButtons
      await this.getCounterStateDictionaryAndAddSelectable(this.allListsService.generalModifyListsGrouped_pageSign.zoneId);
      this.counterStateForModifyDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateForModifyDictionary(this.allListsService.generalModifyListsGrouped_pageSign.zoneId);
      if (canRefresh) {
        this.closeTabService.saveDataForLMGeneralGroupModify = null;
        this.closeTabService.saveDataForLMGeneralGroupModifyReq.GUid = null;
      }

      this.updateOnChangedCounterState(this.listManagerService.counterStateGeneralGroupList, false);
      if (this.browserStorageService.isExists(this._outputFileName)) {
        this._selectCols = this.browserStorageService.getLocal(this._outputFileName);
      } else {
        this._selectCols = this.listManagerService.columnManager.getColumnsMenus(this._outputFileName);
      }
      this._selectedColumns = this.listManagerService.columnManager.customizeSelectedColumns(this._selectCols);
      this.insertSelectedColumns();
      // setDynamics should implement before new instance of dataSource create      
      // this.closeTabService.saveDataForLMGeneralGroupModify = JSON.parse(JSON.stringify(this.closeTabService.saveDataForLMGeneralGroupModify));
    }
  }
  refreshTable = () => {
    if (!MathS.isNull(this.listManagerService.counterStateGeneralGroupList)) {
      this.updateOnChangedCounterState(this.listManagerService.counterStateGeneralGroupList, true);
    }
    else {
      this.listManagerService.showSnackWarn(EN_messages.insert_counterState);
    }
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
  testCallBackFun = (e: any, filterValid: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {

        if (MathS.isNull(e)) {
          this.tempFilter[filterValid] = [];
        }
        if (!this.tempFilter[filterValid].includes(e)) {
          this.tempFilter[filterValid] = e;
        }

        if (this.tempMainDataSource.totalNum == 0) {
          // for single use only on each 'component init'
          this.tempMainDataSource.data = JSON.parse(JSON.stringify(this.closeTabService.saveDataForLMGeneralGroupModify));
          this.tempMainDataSource.totalNum = 1;
        }

        this.closeTabService.saveDataForLMGeneralGroupModify = this.filterHelp2(this.filterHelper());

        if (this.tempFilter.first.length == 0 && this.tempFilter.second.length == 0) {
          this.closeTabService.saveDataForLMGeneralGroupModify = this.closeTabService.AUXSaveDataForLMGeneralGroupModify;
          // TODO: update rows that need to dictionaries
          this.updateOnChangedCounterState(this.listManagerService.counterStateGeneralGroupList, false);
        }
        resolve(true)
      }, 0)
    });
  }
  filterOptions = async (e: any[], filterValid: string) => {
    // make hackable async function to show spinner on filter event
    this.closeTabService.utilsService.spinnerWrapperService.startPending();
    await this.testCallBackFun(e, filterValid);
    this.closeTabService.utilsService.spinnerWrapperService.stopPending();
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
    for (let index = 0; index < this.closeTabService.saveDataForLMGeneralGroupModify.length; index++) {
      if (this.closeTabService.saveDataForLMGeneralGroupModify[index].id === dataId) {
        this.closeTabService.saveDataForLMGeneralGroupModify[index][element] = event.title;
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
      for (let j = 0; j < this.closeTabService.saveDataForLMGeneralGroupModify.length; j++) {
        if (data.detailsInfo[index].onOffLoadId === this.closeTabService.saveDataForLMGeneralGroupModify[j].id) {

          this.closeTabService.saveDataForLMGeneralGroupModify[j].id = data.detailsInfo[index].newOnOffLoadId;//insert newOnOffLoad to last dataSource Id
          if (data.detailsInfo[index].hasError) {
            // with error[index of dataSource]
            this.closeTabService.saveDataForLMGeneralGroupModify[j].isResponseHasError = true;
            this.closeTabService.saveDataForLMGeneralGroupModify[j].editedErrorDescription = data.detailsInfo[index].errorDescription;
          }
          else {
            // successful
            // possible for last icon remain in table, make sure new icons replace
            this.closeTabService.saveDataForLMGeneralGroupModify[j].isResponseHasError = false;
            this.closeTabService.saveDataForLMGeneralGroupModify[j].modifyType = null;
            this.closeTabService.saveDataForLMGeneralGroupModify[j].editedErrorDescription = '';
          }
        }
      }

    }
    this.openEditedModifyBatch(data);
  }
  uploadAll = async () => {
    const temp: IOffloadModifyReq[] = [];

    for (let index = 0; index < this.closeTabService.saveDataForLMGeneralGroupModify.length; index++) {

      let tempOrigin = this.closeTabService.saveDataForLMGeneralGroupModify[index];
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
    for (let index = 0; index < this.closeTabService.saveDataForLMGeneralGroupModify.length; index++) {
      if (this.closeTabService.saveDataForLMGeneralGroupModify[index].id === dataId) {
        this.closeTabService.saveDataForLMGeneralGroupModify[index].offloadDateJalali = event;
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
      for (let index = 0; index < this.closeTabService.saveDataForLMGeneralGroupModify.length; index++) {
        if (this.closeTabService.saveDataForLMGeneralGroupModify[index].counterStateId !== null)
          temp.push(this.closeTabService.saveDataForLMGeneralGroupModify[index]);
      }
      this.closeTabService.saveDataForLMGeneralGroupModify = temp;
    }
    else {
      if (!MathS.isNull(this.closeTabService.AUXSaveDataForLMGeneralGroupModify)) {
        this.closeTabService.saveDataForLMGeneralGroupModify = this.closeTabService.AUXSaveDataForLMGeneralGroupModify;
        this.updateOnChangedCounterState(this.listManagerService.counterStateGeneralGroupList, false);
      }
    }
  }
  getExcel = async () => {
    const res = await this.listManagerService.ajaxReqWrapperService.getBlobByIdAsJson(ENInterfaces.GeneralModifyAllExcelInGroup, this.allListsService.generalModifyListsGrouped_pageSign.groupId);
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
    this.closeTabService.utilsService.clearFilters(table);
    this.hasFiltersInTable = false;
  }
  hasFilters = (datatableG: Table) => {
    this.hasFiltersInTable = this.closeTabService.utilsService.hasFilters(datatableG);
  }
  filteredTableEvent = (e: Table) => {
    this.filterableDataSource = e.filteredValue;
    this.hasFilters(e);
  }

}