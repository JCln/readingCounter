import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IOffloadModifyReq } from 'interfaces/inon-manage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService } from 'primeng/dynamicdialog';
import { AllListsService } from 'services/all-lists.service';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { OffloadModify } from 'src/app/classes/offload-modify-type';
import { EN_Routes } from 'src/app/Interfaces/routes.enum';

import { BriefKardexComponent } from '../brief-kardex/brief-kardex.component';
import { ListSearchMoshDgComponent } from '../list-search-mosh-dg/list-search-mosh-dg.component';

@Component({
  selector: 'app-general-list-modify',
  templateUrl: './general-list-modify.component.html',
  styleUrls: ['./general-list-modify.component.scss']
})
export class GeneralListModifyComponent extends AllListsFactory {
  dataSource: IOnOffLoadFlat[] = [];
  clonedProducts: { [s: string]: object; } = {};
  counterStateValue: number;

  pageSignTrackNumber: number = null;

  zoneDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  counterStateByZoneDictionary: IDictionaryManager[] = [];

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
    private router: Router,
    public dialogService: DialogService,
    private closeTabService: CloseTabService,
    public allListsService: AllListsService
  ) {
    super(dialogService, listManagerService);
  }

  updateOnChangedCounterState = async (val: any) => {
    this.dataSource = await this.listManagerService.getLM(ENInterfaces.trackingToOFFLOADEDGeneralModify + this.allListsService.generalModifyLists_pageSign.groupId + '/', val.value);
    this.closeTabService.saveDataForLMGeneralModifyReq = this.allListsService.generalModifyLists_pageSign.GUid;
    this.closeTabService.saveDataForLMGeneralModify = this.dataSource;
    this.zoneDictionary = await this.listManagerService.getLMAllZoneDictionary();
    this.karbariDictionary = await this.listManagerService.getKarbariDictionary();
    this.karbariDictionaryCode = await this.listManagerService.getKarbariDictionaryCode();
    this.qotrDictionary = await this.listManagerService.getQotrDictionary();
    this.counterStateDictionary = await this.listManagerService.getCounterStateDictionary();
    this.counterStateByCodeDictionary = await this.listManagerService.getCounterStateByCodeDictionary(this.allListsService.generalModifyLists_pageSign.zoneId);

    Converter.convertIdToTitle(this.dataSource, this.counterStateDictionary, 'counterStateId');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'counterStateCode');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');

  }
  classWrapper = async (canRefresh?: boolean) => {
    if (!this.allListsService.generalModifyLists_pageSign.GUid) {
      this.router.navigateByUrl(EN_Routes.wrmtrackoffloaded);
    }
    else {
      this.assignToPageSign();
      this.counterStateByZoneDictionary = await this.listManagerService.getCounterStateByZoneIdDictionary(this.allListsService.generalModifyLists_pageSign.zoneId);
      if (canRefresh) {
        this.closeTabService.saveDataForLMGeneralModify = null;
        this.closeTabService.saveDataForLMGeneralModifyReq = null;
      }
      if (this.closeTabService.saveDataForLMGeneralModifyReq === this.allListsService.generalModifyLists_pageSign.GUid && this.closeTabService.saveDataForLMGeneralModify) {
        this.dataSource = this.closeTabService.saveDataForLMGeneralModify;
      }
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
  toPrePage = () => {
    this.router.navigate([EN_Routes.wrmtrackoffloaded]);
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
  assignToPageSign = () => {
    this.pageSignTrackNumber = this.allListsService.generalModifyLists_pageSign.trackNumber;
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

}