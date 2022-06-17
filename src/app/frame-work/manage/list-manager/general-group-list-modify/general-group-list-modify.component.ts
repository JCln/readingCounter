import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IBatchModifyRes, IOffloadModifyReq } from 'interfaces/inon-manage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService } from 'primeng/dynamicdialog';
import { AllListsService } from 'services/all-lists.service';
import { BrowserStorageService } from 'services/browser-storage.service';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { OutputManagerService } from 'services/output-manager.service';
import { UtilsService } from 'services/utils.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { OffloadModify } from 'src/app/classes/offload-modify-type';
import { EN_Routes } from 'src/app/Interfaces/routes.enum';

import { BriefKardexComponent } from '../brief-kardex/brief-kardex.component';
import { ListSearchMoshDgComponent } from '../list-search-mosh-dg/list-search-mosh-dg.component';
import { GeneralGroupInfoResComponent } from './general-group-info-res/general-group-info-res.component';

@Component({
  selector: 'app-general-group-list-modify',
  templateUrl: './general-group-list-modify.component.html',
  styleUrls: ['./general-group-list-modify.component.scss']
})
export class GeneralGroupListModifyComponent extends AllListsFactory {
  dataSource: IOnOffLoadFlat[] = [];

  _numberOfExtraColumns: number[] = [1, 2, 3, 4, 5, 6];
  _rowsPerPage: number[] = [10, 100, 1000, 5000];
  _selectedColumnsToRemember: string = 'selectedGeneralGroupModify';
  _sessionName: string = 'generalGroupModify';
  _outputFileName: string = 'generalGroupModify';
  _selectCols: any = [];
  _selectedColumns: any[];

  clonedProducts: { [s: string]: object; } = {};
  counterStateValue: number;
  pageSignTrackNumber: number = null;

  // zoneDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  counterStateByZoneDictionary: IDictionaryManager[] = [];
  counterStateForModifyDictionary: IDictionaryManager[] = [];

  modifyType: OffloadModify[];
  offloadModifyReq: IOffloadModifyReq = {
    id: '',
    modifyType: null,
    checkedItems: [],
    counterStateId: 0,
    counterNumber: null,
    jalaliDay: '',
    description: ''
  }

  constructor(
    public listManagerService: ListManagerService,
    public dialogService: DialogService,
    private closeTabService: CloseTabService,
    public allListsService: AllListsService,
    public outputManagerService: OutputManagerService,
    public columnManager: ColumnManager,
    public browserStorageService: BrowserStorageService,
    public utilsService: UtilsService
  ) {
    super(dialogService, listManagerService);
  }
  updateOnChangedCounterState = async (val: any) => {
    this.dataSource = await this.listManagerService.getLM(ENInterfaces.trackingToOFFLOADEDGeneralModify + this.allListsService.generalModifyListsGrouped_pageSign.groupId + '/', val.value);
    this.closeTabService.saveDataForLMGeneralGroupModifyReq = this.allListsService.generalModifyListsGrouped_pageSign.GUid;
    this.closeTabService.saveDataForLMGeneralGroupModify = this.dataSource;
    // this.zoneDictionary = await this.listManagerService.getLMAllZoneDictionary();
    this.karbariDictionary = await this.listManagerService.getKarbariDictionary();
    this.karbariDictionaryCode = await this.listManagerService.getKarbariDictionaryCode();
    this.qotrDictionary = await this.listManagerService.getQotrDictionary();
    this.counterStateDictionary = await this.listManagerService.getCounterStateByZoneIdDictionary(this.allListsService.generalModifyListsGrouped_pageSign.zoneId);
    this.counterStateByCodeDictionary = await this.listManagerService.getCounterStateByCodeDictionary(this.allListsService.generalModifyListsGrouped_pageSign.zoneId);

    Converter.convertIdToTitle(this.dataSource, this.counterStateDictionary, 'counterStateId');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');

  }
  classWrapper = async (canRefresh?: boolean) => {
    if (!this.allListsService.generalModifyListsGrouped_pageSign.GUid) {
      this.utilsService.routeTo(EN_Routes.wrmtrackoffloadedGroup);
    }
    else {
      this.assignToPageSign();
      this.counterStateByZoneDictionary = await this.listManagerService.getCounterStateByZoneIdDictionary(this.allListsService.generalModifyListsGrouped_pageSign.zoneId);
      this.counterStateForModifyDictionary = await this.listManagerService.getCounterStateForModifyDictionary(this.allListsService.generalModifyListsGrouped_pageSign.zoneId);
      if (canRefresh) {
        this.closeTabService.saveDataForLMGeneralGroupModify = null;
        this.closeTabService.saveDataForLMGeneralGroupModifyReq = null;
      }
      if (this.closeTabService.saveDataForLMGeneralGroupModifyReq === this.allListsService.generalModifyListsGrouped_pageSign.GUid && this.closeTabService.saveDataForLMGeneralGroupModify) {
        this.dataSource = this.closeTabService.saveDataForLMGeneralGroupModify;
      }
      if (this.browserStorageService.isExists(this._outputFileName)) {
        this._selectCols = this.browserStorageService.get(this._outputFileName);
      }
      else {
        this._selectCols = this.columnManager.columnSelectedMenus(this._outputFileName);
      }
      this._selectedColumns = this.columnManager.customizeSelectedColumns(this._selectCols);
      this.insertSelectedColumns();
      this.dataSource = JSON.parse(JSON.stringify(this.dataSource));

      this.listManagerService.setDynamicPartRanges(this.dataSource);
      this.listManagerService.makeHadPicturesToBoolean(this.dataSource);
    }
  }
  refreshTable = () => {
    if (!MathS.isNull(this.counterStateValue))
      this.updateOnChangedCounterState({ value: this.counterStateValue });
    else {
      this.listManagerService.showSnackWarn(EN_messages.insert_counterState);
    }
  }
  insertSelectedColumns = () => {
    this.modifyType = this.listManagerService.getOffloadModifyType();
  }
  // toPrePage = () => {
  //   this.router.navigate([EN_Routes.wrmtrackoffloadedGroup]);
  // }  
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
    console.log(data);
    for (let index = 0; index < data.detailsInfo.length; index++) {
      for (let j = 0; j < this.dataSource.length; j++) {
        if (data.detailsInfo[index].onOffLoadId === this.dataSource[j].id) {
          console.log(data.detailsInfo[index].hasError);
          if (data.detailsInfo[index].hasError) {
            this.dataSource[j].editedErrorDescription = data.detailsInfo[index].errorDescription;
          }
          else {
            // successful
            this.dataSource[j].editedShowHasError = true;
            this.dataSource[j].modify = null;
          }
        }
      }

    }
    this.openEditedModifyBatch(data);
  }
  uploadAll = async () => {
    const temp: IOffloadModifyReq[] = [];
    for (let index = 0; index < this.dataSource.length; index++) {
      if (!MathS.isNull(this.dataSource[index].modify)) {
        temp.push({
          id: this.dataSource[index].id,
          modifyType: this.dataSource[index].modify.id,
          checkedItems: [0],
          counterStateId: this.convertTitleToId(this.dataSource[index].counterStateId).id,
          counterNumber: this.dataSource[index].counterNumber,
          jalaliDay: this.dataSource[index].offloadDateJalali,
          description: this.dataSource[index].description
        })
        console.log(temp);
      }
      else {
        console.log(this.dataSource[index].modifyType);

        // if (typeof this.dataSource[index].modifyType == 'object') {
        //   this.dataSource[index].modifyType = this.dataSource[index].modifyType.title;
        // }
        // if (typeof this.dataSource[index].modifyType == 'string') {
        //   this.offloadModifyReq.modifyType = this.convertTitleToIdByModifyType(this.dataSource[index].modifyType).id;
        // }
      }
    }
    if (MathS.isNull(temp)) {
      this.listManagerService.showSnackWarn(EN_messages.no_modifyFound);
    } else {
      // to upload valid data to server and get valid response
      this.manageModifyBatchResponse(await this.listManagerService.postArrays(ENInterfaces.trackingToOffloadedGroupModifyBatch, temp));
    }
  }
  receiveDateJalali = (event: any, rowIndex: number) => {
    // to make date updated to latest change by user
    this.dataSource[rowIndex].offloadDateJalali = event;
    // this.offloadModifyReq.jalaliDay = event;
  }
  assignToPageSign = () => {
    this.pageSignTrackNumber = this.allListsService.generalModifyListsGrouped_pageSign.trackNumber;
  }
  openEditedModifyBatch = (data: IBatchModifyRes) => {
    this.ref = this.dialogService.open(GeneralGroupInfoResComponent, {
      data: {
        doneCount: data.doneCount, errorCount: data.errorCount
      },
      rtl: true,
      width: '70%'
    })
  }
  openMoshtarakinDialog = (dataSource: any) => {
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

}