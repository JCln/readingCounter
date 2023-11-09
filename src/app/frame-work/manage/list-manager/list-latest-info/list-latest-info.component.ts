import { DialogService } from 'primeng/dynamicdialog';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOffloadModifyReq } from 'interfaces/inon-manage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { ListManagerService } from 'services/list-manager.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';
import { OffloadModify } from 'src/app/classes/offload-modify-type';
import { Search } from 'src/app/classes/search';

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
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  counterStateByZoneDictionary: IDictionaryManager[] = [];
  counterStateForModifyDictionary: IDictionaryManager[] = [];

  editModifyReq: IOffloadModifyReq = {
    id: '',
    modifyType: null,
    checkedItems: [],
    counterStateId: null,
    counterNumber: null,
    jalaliDay: '',
    description: ''
  };

  constructor(
    public listManagerService: ListManagerService,
    public closeTabService: CloseTabService,
    public dateJalaliService: DateJalaliService,
    public dialogService: DialogService
  ) {
    super(dialogService, listManagerService);
  }

  uploadSingleToModifyBatch = async () => {

    if (this.listManagerService.vertificationLatestInfoModifyBatchReq(this.editModifyReq)) {
      this.listManagerService.ajaxReqWrapperService.postDataSourceArray(ENInterfaces.trackingToOffloadedGroupModifyBatch, [this.editModifyReq]);

    }
    // TODO: Should convert Arabic Numbers to ENG to counterNumbers
    // to upload valid data to server and get valid response      
  }
  getCounterStateDictionaryAndAddSelectable = (zone: number): Promise<any> => {
    return new Promise(async (resolve) => {
      this.counterStateByZoneDictionary = JSON.parse(JSON.stringify(await this.listManagerService.dictionaryWrapperService.getCounterStateByZoneIdDictionary(zone)));
      if (this.counterStateByZoneDictionary[0].id !== null)
        this.counterStateByZoneDictionary.unshift({ id: null, title: 'انتخاب کنید', isSelected: true })
      resolve(true);
    });
  }
  insertSelectedColumns = () => {
    this._selectCols = this.listManagerService.columnManager.getColumnsMenus(this._outputFileName);
    this._selectColsAccordion = this.listManagerService.columnManager.getColumnsMenus(this._outputFileNameAccordion);
    this.searchType = this.listManagerService.getSearchTypes();
    this.modifyType = this.listManagerService.getOffloadModifyType();
  }
  insertToModifyReq = () => {
    this.editModifyReq = {
      id: this.closeTabService.listLatestInfo.id,
      modifyType: null,
      checkedItems: [0],
      counterStateId: null,
      counterNumber: this.closeTabService.listLatestInfo.counterNumber,
      jalaliDay: this.closeTabService.listLatestInfo.offloadDateJalali ? this.closeTabService.listLatestInfo.offloadDateJalali : this.dateJalaliService.getCurrentDate(),
      description: ''
    }
  }
  dictionaryWrapper = async () => {
    console.log(1);

    this.deleteDictionary = this.listManagerService.getDeleteDictionary();
    this.karbariDictionaryCode = await this.listManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.qotrDictionary = await this.listManagerService.dictionaryWrapperService.getQotrDictionary();
    this.counterStateByCodeDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateByCodeShowAllDictionary(this.closeTabService.listLatestInfo.zoneId);
    this.counterStateDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateByZoneShowAllDictionary(this.closeTabService.listLatestInfo.zoneId);

    Converter.convertIdToTitle([this.closeTabService.listLatestInfo], this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle([this.closeTabService.listLatestInfo], this.deleteDictionary, 'hazf');
    Converter.convertIdToTitle([this.closeTabService.listLatestInfo], this.counterStateDictionary, 'counterStateId');
    Converter.convertIdToTitle([this.closeTabService.listLatestInfo], this.counterStateByCodeDictionary, 'preCounterStateCode');
    Converter.convertIdToTitle([this.closeTabService.listLatestInfo], this.karbariDictionaryCode, 'possibleKarbariCode');
    Converter.convertIdToTitle([this.closeTabService.listLatestInfo], this.qotrDictionary, 'qotrCode');

    this.listManagerService.setDynamicPartRanges([this.closeTabService.listLatestInfo]);
  }
  connectToServer = async () => {
    this.closeTabService.listLatestInfo = await this.listManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.getLatestOnOffloadInfo, this.closeTabService.listLatestInfoReq);
    this.dictionaryWrapper();
    this.insertSelectedColumns();
    console.log(this.closeTabService.listLatestInfo);
    // insert server response to modifyReq for any future user edit
    this.insertToModifyReq();

  }
  verification = async () => {
    const temp = this.listManagerService.verificationLatestInfo(this.closeTabService.listLatestInfoReq);
    if (temp)
      this.connectToServer();
  }
  classWrapper = async (canRefresh?: boolean) => {
    console.log(this.closeTabService.listLatestInfo.id);

    if (canRefresh) {
      this.closeTabService.listLatestInfo.id = null;
      this.verification();
    }
    if (this.closeTabService.listLatestInfo.zoneId) {
      await this.getCounterStateDictionaryAndAddSelectable(this.closeTabService.listLatestInfo.zoneId);
      this.counterStateForModifyDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateForModifyDictionary(this.closeTabService.listLatestInfo.zoneId);
      this.dictionaryWrapper();
    }
    this.insertSelectedColumns();
    console.log(this.searchType);
  }

}