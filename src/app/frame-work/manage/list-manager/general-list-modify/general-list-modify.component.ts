import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IOffloadModifyReq } from 'interfaces/inon-manage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService } from 'primeng/dynamicdialog';
import { AllListsService } from 'services/all-lists.service';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { OutputManagerService } from 'services/output-manager.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { OffloadModify } from 'src/app/classes/offload-modify-type';

import { BriefKardexComponent } from '../brief-kardex/brief-kardex.component';
import { ListSearchMoshDgComponent } from '../list-search-mosh-dg/list-search-mosh-dg.component';

@Component({
  selector: 'app-general-list-modify',
  templateUrl: './general-list-modify.component.html',
  styleUrls: ['./general-list-modify.component.scss']
})
export class GeneralListModifyComponent extends AllListsFactory {
  clonedProducts: { [s: string]: object; } = {};

  deleteDictionary: IDictionaryManager[] = [];
  highLowStateDictionary: IDictionaryManager[] = [];
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
    public closeTabService: CloseTabService,
    public allListsService: AllListsService,
    public outputManagerService: OutputManagerService
  ) {
    super(dialogService, listManagerService);
  }

  updateOnChangedCounterState = async (val: any, shouldCallApi: boolean) => {
    if (!val)
      return;
    if ((
      !this.closeTabService.saveDataForLMGeneralModify ||
      (
        this.closeTabService.saveDataForLMGeneralModifyReq.GUid !=
        this.allListsService.generalModifyLists_pageSign.GUid
      ) &&
      (
        this.closeTabService.saveDataForLMGeneralModifyReq.groupId !=
        this.allListsService.generalModifyLists_pageSign.groupId
      ) ||
      shouldCallApi
    )) {
      this.deleteDictionary = this.listManagerService.getDeleteDictionary();
      this.highLowStateDictionary = this.listManagerService.getHighLowDictionary();
      this.closeTabService.saveDataForLMGeneralModify = await this.listManagerService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.trackingToOFFLOADEDGeneralModify + this.allListsService.generalModifyLists_pageSign.groupId + '/', val);
      this.listManagerService.makeHadPicturesToBoolean(this.closeTabService.saveDataForLMGeneralModify);
      this.closeTabService.saveDataForLMGeneralModifyReq.GUid = this.allListsService.generalModifyLists_pageSign.GUid;
      this.closeTabService.saveDataForLMGeneralModifyReq.groupId = this.allListsService.generalModifyLists_pageSign.groupId;
      this.karbariDictionaryCode = await this.listManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
      this.qotrDictionary = await this.listManagerService.dictionaryWrapperService.getQotrDictionary();
      this.counterStateDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateByZoneIdDictionary(this.allListsService.generalModifyLists_pageSign.zoneId);
      this.counterStateByCodeDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateByCodeDictionary(this.allListsService.generalModifyLists_pageSign.zoneId);
    }

    this.closeTabService.saveDataForLMGeneralModify =
      Converter.convertIdsToTitles(
        this.closeTabService.saveDataForLMGeneralModify,
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
    Converter.convertIdToTitle(this.closeTabService.saveDataForLMGeneralModify, this.karbariDictionaryCode, 'karbariCode');
    // after clicked on icon convert should happend because there is no data available before then
    this.listManagerService.setDynamicPartRanges(this.closeTabService.saveDataForLMGeneralModify);
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (!this.allListsService.generalModifyLists_pageSign.GUid) {
      this.toPrePage();
    }
    else {
      this.counterStateByZoneDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateByZoneIdDictionary(this.allListsService.generalModifyLists_pageSign.zoneId);
      this.counterStateForModifyDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateForModifyDictionary(this.allListsService.generalModifyLists_pageSign.zoneId);
      if (canRefresh) {
        this.closeTabService.saveDataForLMGeneralModify = null;
        this.closeTabService.saveDataForLMGeneralModifyReq.GUid = null;
      }
      this.updateOnChangedCounterState(this.listManagerService.counterStateGeneralList, false);
      this.insertSelectedColumns();
      // setDynamics should implement before new instance of dataSource create      
      this.listManagerService.setDynamicPartRanges(this.closeTabService.saveDataForLMGeneralModify);
      this.closeTabService.saveDataForLMGeneralModify = JSON.parse(JSON.stringify(this.closeTabService.saveDataForLMGeneralModify));
    }
  }
  refreshTable = () => {
    if (!MathS.isNull(this.listManagerService.counterStateGeneralList))
      this.updateOnChangedCounterState(this.listManagerService.counterStateGeneralList, true);
    else {
      this.listManagerService.showSnackWarn(EN_messages.insert_counterState);
    }
  }
  insertSelectedColumns = () => {
    this.modifyType = this.listManagerService.getOffloadModifyType();
  }
  toPrePage = () => {
    this.listManagerService.routeToOffloaded();
  }
  onRowEditInit(dataSource: object) {
    this.clonedProducts = { dataSource };
  }
  onRowEditCancel(dataSource: any) {
    if (typeof dataSource['dataSource'].counterStateId == 'object') {
      dataSource['dataSource'].counterStateId = null;
    }
    if (typeof dataSource['dataSource'].modifyType == 'object') {
      dataSource['dataSource'].modifyType = null;
    }
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
  toMakeObjectClean = (dataSource: any) => {
    if (typeof dataSource.counterStateId == 'string') {
      this.offloadModifyReq.counterStateId = this.convertTitleToId(dataSource.counterStateId).id;
    }
    if (typeof dataSource.counterStateId == 'object') {
      this.offloadModifyReq.counterStateId = dataSource.counterStateId['id'];
      dataSource.counterStateId = dataSource.counterStateId['title'];
    }
    if (typeof dataSource.modifyType == 'object') {
      dataSource.modifyType = dataSource.modifyType.title;
    }
    if (typeof dataSource.modifyType == 'string') {
      this.offloadModifyReq.modifyType = this.convertTitleToIdByModifyType(dataSource.modifyType).id;
    }
  }
  async onRowEditSave(dataSource: IOnOffLoadFlat) {
    // TODO editSingleLine
    this.offloadModifyReq = JSON.parse(JSON.stringify(this.offloadModifyReq));
    dataSource = dataSource['dataSource'];
    if (dataSource.modifyType === null || dataSource.modifyType === undefined) {
      this.listManagerService.showSnackWarn(EN_messages.insert_modify_type);
      this.toMakeObjectClean(dataSource);
      this.onRowEditCancel(dataSource);
    }
    else {
      this.offloadModifyReq.id = dataSource.id;
      this.offloadModifyReq.counterNumber = dataSource.counterNumber;
      this.offloadModifyReq.description = dataSource.description;
      this.offloadModifyReq.modifyType = dataSource.modifyType.id;

      // if not clicked by user use default date val
      if (MathS.isNull(this.offloadModifyReq.jalaliDay))
        this.offloadModifyReq.jalaliDay = dataSource.offloadDateJalali;

      this.toMakeObjectClean(dataSource);

      if (this.listManagerService.offloadModifyValidation(this.offloadModifyReq)) {
        const serverValidation = await this.listManagerService.postOffloadModifyEdited(this.offloadModifyReq);
        if (serverValidation) {
          console.log('do nothing');
        }
        else {
          this.onRowEditCancel(dataSource);
        }
      }

    }
  }
  receiveTableDate = (event: any) => {
    // to make date updated to latest change by user
    this.offloadModifyReq.jalaliDay = event;
  }
  /*
  water officer upload carousel images
  */
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
    const res = await this.listManagerService.ajaxReqWrapperService.getBlobByIdAsJson(ENInterfaces.GeneralModifyAllExcelInGroup, this.allListsService.generalModifyLists_pageSign.groupId);
    this.outputManagerService.downloadFileWithContentDisposition(res);
  }

}