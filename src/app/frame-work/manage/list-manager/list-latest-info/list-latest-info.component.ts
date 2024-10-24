import { DialogService } from 'primeng/dynamicdialog';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IBatchModifyRes } from 'interfaces/inon-manage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { ListManagerService } from 'services/list-manager.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';
import { OffloadModify } from 'src/app/classes/offload-modify-type';
import { Search } from 'src/app/classes/search';
import { GeneralGroupInfoResComponent } from '../general-group-list-modify/general-group-info-res/general-group-info-res.component';
import { MathS } from 'src/app/classes/math-s';
import { EN_Routes } from 'interfaces/routes.enum';

@Component({
  selector: 'app-list-latest-info',
  templateUrl: './list-latest-info.component.html',
  styleUrls: ['./list-latest-info.component.scss']
})
export class ListLatestInfoComponent extends AllListsFactory {
  _searchByInfo: string = 'اشتراک';
  private readonly _outputFileName: string = 'listLatestInfo';
  private readonly _outputFileNameAccordion: string = 'listLatestInfoAccordion';
  _selectCols: any = [];
  _selectColsAccordion: any = [];

  searchType: Search[] = [];
  modifyType: OffloadModify[] = [];
  deleteDictionary: IDictionaryManager[] = [];
  highLowStateDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  counterStateByZoneDictionary: IDictionaryManager[] = [];
  counterStateForModifyDictionary: IDictionaryManager[] = [];

  constructor(
    public listManagerService: ListManagerService,
    public closeTabService: CloseTabService,
    public dateJalaliService: DateJalaliService,
    public dialogService: DialogService
  ) {
    super(dialogService, listManagerService);
  }

  uploadSingleToModifyBatch = async () => {
    console.log(this.closeTabService.editModifyReq);
    if (this.listManagerService.vertificationLatestInfoModifyBatchReq(this.closeTabService.editModifyReq)) {

      const res = await this.listManagerService.ajaxReqWrapperService.postDataSourceArray(ENInterfaces.trackingToOffloadedGroupModifyBatch, [this.closeTabService.editModifyReq]);
      this.openEditedModifyBatch(res);
    }
    // TODO: Should convert Arabic Numbers to ENG to counterNumbers
    // to upload valid data to server and get valid response      
  }
  changeTitle() {
    this._searchByInfo = this.searchType.find((element) => element.id == this.closeTabService.listLatestInfoReq.searchBy).searchBy;
  }
  getCounterStateDictionaryAndAddSelectable = (zone: number): Promise<any> => {
    return new Promise(async (resolve) => {
      this.counterStateByZoneDictionary = JSON.parse(JSON.stringify(await this.listManagerService.dictionaryWrapperService.getCounterStateByZoneIdDictionary(zone)));
      if (this.counterStateByZoneDictionary[0].id !== null)
        this.counterStateByZoneDictionary.unshift({ id: null, title: 'انتخاب کنید', isSelected: true })
      resolve(true);
    });
  }
  getCounterStateByZoneDictionaryAndAddSelectable = (): Promise<any> => {
    return new Promise(async (resolve) => {
      this.counterStateDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateByZoneShowAllDictionary(this.closeTabService.listLatestInfo.zoneId);
      if (this.counterStateDictionary[0].id !== null)
        this.counterStateDictionary.unshift({ id: null, title: 'انتخاب کنید', isSelected: true })
      resolve(true);
    });
  }
  insertSelectedColumns = () => {
    this.modifyType = this.listManagerService.getOffloadModifyType();
    this._selectCols = this.listManagerService.columnManager.getColumnsMenus(this._outputFileName);
    this._selectColsAccordion = this.listManagerService.columnManager.getColumnsMenus(this._outputFileNameAccordion);
  }
  insertToModifyReq = () => {
    this.closeTabService.editModifyReq = {
      id: this.closeTabService.listLatestInfo.id,
      modifyType: null,
      checkedItems: [0],
      counterStateId: this.closeTabService.listLatestInfo.counterStateId,
      counterNumber: this.closeTabService.listLatestInfo.counterNumber,
      jalaliDay: this.closeTabService.listLatestInfo.offloadDateJalali ? this.closeTabService.listLatestInfo.offloadDateJalali : this.dateJalaliService.getCurrentDate(),
      description: ''
    }
  }
  dictionaryWrapper = async () => {
    this.deleteDictionary = this.listManagerService.getDeleteDictionary();
    this.highLowStateDictionary = this.listManagerService.getHighLowDictionary();
    this.karbariDictionaryCode = await this.listManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.qotrDictionary = await this.listManagerService.dictionaryWrapperService.getQotrDictionary();
    this.counterStateByCodeDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateByCodeShowAllDictionary(this.closeTabService.listLatestInfo.zoneId);
    await this.getCounterStateByZoneDictionaryAndAddSelectable();

    Converter.convertIdToTitle([this.closeTabService.listLatestInfo], this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle([this.closeTabService.listLatestInfo], this.deleteDictionary, 'hazf');
    Converter.convertIdToTitle([this.closeTabService.listLatestInfo], this.counterStateDictionary, 'counterStateId');
    Converter.convertIdToTitle([this.closeTabService.listLatestInfo], this.counterStateByCodeDictionary, 'preCounterStateCode');
    Converter.convertIdToTitle([this.closeTabService.listLatestInfo], this.karbariDictionaryCode, 'possibleKarbariCode');
    Converter.convertIdToTitle([this.closeTabService.listLatestInfo], this.qotrDictionary, 'qotrCode');
    Converter.convertIdToTitle([this.closeTabService.listLatestInfo], this.highLowStateDictionary, 'highLowStateId');

    this.listManagerService.setDynamicPartRanges([this.closeTabService.listLatestInfo]);
  }
  connectToServer = async (canRefresh?: boolean) => {
    await this.listManagerService.ajaxReqWrapperService.interfaceManagerService.POSTBODY(ENInterfaces.getLatestOnOffloadInfo, this.closeTabService.listLatestInfoReq).toPromise().then(res => {
      this.closeTabService.listLatestInfo = res;
      this.dictionaryWrapper();
      this.insertSelectedColumns();
      // insert server response to modifyReq for any future user edit
      this.insertToModifyReq();
    }).catch(() => {
      this.closeTabService.cleanData(EN_Routes.listLatestInfo);
    });
  }
  verification = async (canRefresh?: boolean) => {
    this.closeTabService.listLatestInfoReq.item = this.closeTabService.listLatestInfoReq.item.length > 0 ? this.closeTabService.listLatestInfoReq.item.trim() : '';
    const temp = this.listManagerService.verificationLatestInfo(this.closeTabService.listLatestInfoReq);
    if (temp)
      this.connectToServer(canRefresh);
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.verification(canRefresh);
    }

    if (!MathS.isNull(this.closeTabService.listLatestInfo.zoneId)) {
      await this.getCounterStateDictionaryAndAddSelectable(this.closeTabService.listLatestInfo.zoneId);
      this.counterStateForModifyDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateForModifyDictionary(this.closeTabService.listLatestInfo.zoneId);
      this.dictionaryWrapper();
    }
    this.searchType = this.listManagerService.getSearchTypes();
    this.insertSelectedColumns();
  }
  openEditedModifyBatch = (data: IBatchModifyRes) => {
    this.ref = this.dialogService.open(GeneralGroupInfoResComponent, {
      data: {
        doneCount: data.doneCount, errorCount: data.errorCount, isLatestInfo: true, detailsInfo: [{ errorDescription: data.detailsInfo[0].errorDescription }]
      },
      rtl: true,
      width: '60%',
      showHeader: true,
      closable: true
    })
  }

}