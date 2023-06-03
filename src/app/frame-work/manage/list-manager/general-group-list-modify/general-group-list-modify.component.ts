import { SpinnerWrapperService } from 'services/spinner-wrapper.service';
import { Component, Input } from '@angular/core';
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
import { UtilsService } from 'services/utils.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { OffloadModify } from 'src/app/classes/offload-modify-type';
import { EN_Routes } from 'interfaces/routes.enum';

import { BriefKardexComponent } from '../brief-kardex/brief-kardex.component';
import { ListSearchMoshDgComponent } from '../list-search-mosh-dg/list-search-mosh-dg.component';
import { GeneralGroupInfoResComponent } from './general-group-info-res/general-group-info-res.component';

@Component({
  selector: 'app-general-group-list-modify',
  templateUrl: './general-group-list-modify.component.html',
  styleUrls: ['./general-group-list-modify.component.scss']
})
export class GeneralGroupListModifyComponent extends AllListsFactory {
  tempOriginDataSource: any[] = [];
  // should place only in component because overright totalNum needs for dynamic use
  tempMainDataSource = { totalNum: 0, data: [] };

  _numberOfExtraColumns: number[] = [1, 2, 3, 4, 5, 6];
  _rowsPerPage: number[] = [10, 100, 1000, 5000];
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

  modifyType: OffloadModify[];
  tempFilter = { first: [], second: [] };

  constructor(
    public listManagerService: ListManagerService,
    public dialogService: DialogService,
    public closeTabService: CloseTabService,
    public allListsService: AllListsService,
    public outputManagerService: OutputManagerService,
    public browserStorageService: BrowserStorageService,
    public utilsService: UtilsService,
    public profileService: ProfileService
  ) {
    super(dialogService, listManagerService);
  }
  updateOnChangedCounterState = async (val: number) => {
    if (val) {
      this.closeTabService.saveDataForLMGeneralGroupModify = await this.listManagerService.getLM(ENInterfaces.trackingToOFFLOADEDGeneralModify + this.allListsService.generalModifyListsGrouped_pageSign.groupId + '/', val);
      this.listManagerService.makeHadPicturesToBoolean(this.closeTabService.saveDataForLMGeneralGroupModify);
      this.deleteDictionary = this.listManagerService.getDeleteDictionary();
      this.closeTabService.saveDataForLMGeneralGroupModifyReq = this.allListsService.generalModifyListsGrouped_pageSign.GUid;
      this.karbariDictionaryCode = await this.listManagerService.getKarbariDictionaryCode();
      this.qotrDictionary = await this.listManagerService.getQotrDictionary();
      this.counterStateByCodeDictionary = await this.listManagerService.getCounterStateByCodeShowAllDictionary(this.allListsService.generalModifyListsGrouped_pageSign.zoneId);
      this.counterStateDictionary = await this.listManagerService.getCounterStateByZoneShowAllDictionary(this.allListsService.generalModifyListsGrouped_pageSign.zoneId);
      this.resetDataSourceView();


      this.closeTabService.saveDataForLMGeneralGroupModify =
        Converter.convertIdsToTitles(
          this.closeTabService.saveDataForLMGeneralGroupModify,
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
      Converter.convertIdToTitle(this.closeTabService.saveDataForLMGeneralGroupModify, this.karbariDictionaryCode, 'karbariCode');
    }
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (!this.allListsService.generalModifyListsGrouped_pageSign.GUid) {
      this.utilsService.routeTo(EN_Routes.wrmtrackoffloadedGroup);
    }
    else {
      this.counterStateByZoneDictionary = await this.listManagerService.getCounterStateByZoneIdDictionary(this.allListsService.generalModifyListsGrouped_pageSign.zoneId);
      this.counterStateForModifyDictionary = await this.listManagerService.getCounterStateForModifyDictionary(this.allListsService.generalModifyListsGrouped_pageSign.zoneId);
      if (canRefresh) {
        this.closeTabService.saveDataForLMGeneralGroupModify = null;
        this.closeTabService.saveDataForLMGeneralGroupModifyReq = null;
      }

      if (!this.closeTabService.saveDataForLMGeneralGroupModify || this.closeTabService.saveDataForLMGeneralGroupModifyReq != this.allListsService.generalModifyListsGrouped_pageSign.GUid) {
        this.updateOnChangedCounterState(this.listManagerService.counterStateValue);
      }
      if (this.browserStorageService.isExists(this._outputFileName)) {
        this._selectCols = this.browserStorageService.get(this._outputFileName);
      } else {
        this._selectCols = this.listManagerService.columnManager.columnSelectedMenus(this._outputFileName);
      }
      this._selectedColumns = this.listManagerService.columnManager.customizeSelectedColumns(this._selectCols);
      this.insertSelectedColumns();
      // setDynamics should implement before new instance of dataSource create      
      this.closeTabService.saveDataForLMGeneralGroupModify = JSON.parse(JSON.stringify(this.closeTabService.saveDataForLMGeneralGroupModify));
    }
  }
  refreshTable = () => {
    if (!MathS.isNull(this.listManagerService.counterStateValue))
      this.updateOnChangedCounterState(this.listManagerService.counterStateValue);
    else {
      this.listManagerService.showSnackWarn(EN_messages.insert_counterState);
    }
  }
  resetDataSourceView = () => {
    // on each change of ChangedCounterState
    this.tempMainDataSource.totalNum = 0;
  }
  filterHelper = (): any => {
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
  filterHelp2 = (tempDataSource: any): any => {
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
        this.closeTabService.saveDataForLMGeneralGroupModify = tempDataSource;
      }
    }
    // if tempDataSource is null but filter is not null
    else {
      this.closeTabService.saveDataForLMGeneralGroupModify = tempDataSource;
    }
  }
  filterOptions = (e: any, filterValid: string) => {
    if (MathS.isNull(e.value)) {
      this.tempFilter[filterValid] = [];
    }
    if (!this.tempFilter[filterValid].includes(e.value)) {
      this.tempFilter[filterValid] = e.value;
    }

    if (this.tempMainDataSource.totalNum == 0) {
      // for single use only on each 'component init'
      this.tempMainDataSource.data = JSON.parse(JSON.stringify(this.closeTabService.saveDataForLMGeneralGroupModify));
      this.tempMainDataSource.totalNum = 1;
    }
    let tempDataSource: any[] = [];
    tempDataSource = this.filterHelper();

    let tempDataSource2: any[] = [];
    tempDataSource2 = this.filterHelp2(tempDataSource);

    if (!MathS.isNull(tempDataSource2)) {
      this.closeTabService.saveDataForLMGeneralGroupModify = tempDataSource2;
    }
    if (this.tempFilter.first.length == 0 && this.tempFilter.second.length == 0) {
      this.closeTabService.saveDataForLMGeneralGroupModify = this.tempMainDataSource.data;
    }
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
    return this.counterStateByZoneDictionary.find(item => {
      if (item.title === dataSource)
        return item;
    })
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
      if (!MathS.isNull(this.closeTabService.saveDataForLMGeneralGroupModify[index].modifyType)) {

        temp.push({
          id: this.closeTabService.saveDataForLMGeneralGroupModify[index].id,
          modifyType: this.convertTitleToIdByModifyType(this.closeTabService.saveDataForLMGeneralGroupModify[index].modifyType).id,
          checkedItems: [0],
          counterStateId: this.convertTitleToId(this.closeTabService.saveDataForLMGeneralGroupModify[index].counterStateId).id,
          counterNumber: this.closeTabService.saveDataForLMGeneralGroupModify[index].counterNumber,
          jalaliDay: this.closeTabService.saveDataForLMGeneralGroupModify[index].offloadDateJalali,
          description: this.closeTabService.saveDataForLMGeneralGroupModify[index].description
        })
      }
    }
    if (MathS.isNull(temp)) {
      this.listManagerService.showSnackWarn(EN_messages.no_modifyFound);
    } else {
      // TODO: Should convert Arabic Numbers to ENG to counterNumbers
      // to upload valid data to server and get valid response
      this.manageModifyBatchResponse(await this.listManagerService.postArrays(ENInterfaces.trackingToOffloadedGroupModifyBatch, temp));
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
  filterCounterState = () => {
    // if OnOffloadComponent rendering
    let temp: any[] = [];
    // should be false on initial(_generalGroupHeaderCheckbox) because filter on DataSource happen
    if (this.listManagerService.columnManager._generalGroupHeaderCheckbox) {
      this.tempOriginDataSource = JSON.parse(JSON.stringify(this.closeTabService.saveDataForLMGeneralGroupModify));
      for (let index = 0; index < this.closeTabService.saveDataForLMGeneralGroupModify.length; index++) {
        if (this.closeTabService.saveDataForLMGeneralGroupModify[index].counterStateId !== null)
          temp.push(this.closeTabService.saveDataForLMGeneralGroupModify[index]);
      }
      this.closeTabService.saveDataForLMGeneralGroupModify = temp;
    }
    else {
      if (!MathS.isNull(this.tempOriginDataSource))
        this.closeTabService.saveDataForLMGeneralGroupModify = this.tempOriginDataSource;
    }
  }
  getExcel = async () => {
    const res = await this.listManagerService.getExcel(ENInterfaces.GeneralModifyAllExcelInGroup, this.allListsService.generalModifyListsGrouped_pageSign.groupId);
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

    this.browserStorageService.set(this._outputFileName, newArray);
    this.utilsService.snackBarMessageSuccess(EN_messages.tableSaved);
  }
  resetSavedColumns = () => {
    if (!MathS.isNull(this._outputFileName)) {
      if (this.browserStorageService.isExists(this._outputFileName)) {
        this.browserStorageService.removeLocal(this._outputFileName);
        this.utilsService.snackBarMessageSuccess(EN_messages.tableResetSaved);
      } else {
        this.utilsService.snackBarMessageSuccess(EN_messages.tableDefaultColumnOrder);
      }
    }
    else
      this.utilsService.snackBarMessageWarn(EN_messages.done);
  }
  getLocalReOrderable = (): boolean => {
    return this.profileService.getLocalReOrderable();
  }

}