import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IOffloadModifyReq } from 'interfaces/inon-manage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AllListsService } from 'services/all-lists.service';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { OffloadModify } from 'src/app/classes/offload-modify-type';
import { EN_Routes } from 'src/app/Interfaces/routes.enum';

import { MapDgComponent } from '../all/map-dg/map-dg.component';
import { ListSearchMoshDgComponent } from '../list-search-mosh-dg/list-search-mosh-dg.component';

@Component({
  selector: 'app-general-list-modify',
  templateUrl: './general-list-modify.component.html',
  styleUrls: ['./general-list-modify.component.scss']
})
export class GeneralListModifyComponent extends FactoryONE {
  dataSource: IOnOffLoadFlat[] = [];
  carouselDataSource: IOnOffLoadFlat;
  filterableDataSource: IOnOffLoadFlat[] = [];
  clonedProducts: { [s: string]: object; } = {};
  counterStateValue: number;

  pageSignTrackNumber: number = null;
  showCarousel: boolean = false;
  showWouImages: boolean = false;
  ref: DynamicDialogRef;
  _selectCols: any[] = [];
  _selectedColumns: any[];

  rowIndex: number = 0;
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
    private dialogService: DialogService,
    private closeTabService: CloseTabService,
    public allListsService: AllListsService
  ) {
    super();
  }

  updateOnChangedCounterState = async (val: any) => {
    this.dataSource = await this.listManagerService.getLM(ENInterfaces.trackingToOFFLOADEDGeneralModify + this.allListsService.generalModifyLists_pageSign.groupId + '/', val.value);
    this.closeTabService.saveDataForLMGeneralModifyReq = this.allListsService.generalModifyLists_pageSign.GUid;
    this.closeTabService.saveDataForLMGeneralModify = this.dataSource;
    this.assignToPageSign();
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

      this.assignToPageSign();
      this.setDynamicRages();
      this.makeHadPicturesToBoolean();
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
    this._selectCols = this.listManagerService.generalListModify();
    this._selectedColumns = this.listManagerService.customizeSelectedColumns(this._selectCols);
  }
  filteredTableEvent = (e: any) => {
    this.filterableDataSource = e;
  }
  carouselNextItem = () => {
    this.rowIndex >= this.filterableDataSource.length - 1 ? this.rowIndex = 0 : this.rowIndex++;
    this.carouselDataSource = this.filterableDataSource[this.rowIndex];
  }
  carouselPrevItem = () => {
    this.rowIndex < 1 ? this.rowIndex = this.filterableDataSource.length - 1 : this.rowIndex--;
    this.carouselDataSource = this.filterableDataSource[this.rowIndex];
  }
  carouselCancelClicked = () => {
    this.showCarousel = false;
    this.showWouImages = false;
  }
  toPrePage = () => {
    this.router.navigate([EN_Routes.wrmtrackoffloaded]);
  }
  setDynamicRages = () => {
    this.listManagerService.setDynamicPartRanges(this.dataSource);
  }
  makeHadPicturesToBoolean = () => {
    this.dataSource.forEach(item => {
      if (item.imageCount > 0)
        item.imageCount = true;
      else
        item.imageCount = false;
    })
  }
  getReadingReportTitles = async ($event) => {
    const a = await this.listManagerService.postById(ENInterfaces.ReadingReportTitles, $event)
    if (a.length) {
      this.listManagerService.showResDialog(a, false, EN_messages.insert_rrDetails);
      return;
    }
    this.listManagerService.snackEmptyValue();
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
  async onRowEditSave(dataSource: any) {
    // TODO editSingleLine
    this.offloadModifyReq = JSON.parse(JSON.stringify(this.offloadModifyReq));
    dataSource = dataSource['dataSource'];

    if (!MathS.isNull(dataSource.modifyType) && !MathS.isNull(dataSource.counterStateId)) {
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
    else {
      this.toMakeObjectClean(dataSource);
      this.onRowEditCancel(dataSource);
      this.listManagerService.showSnackWarn(EN_messages.insert_modify_type);
    }
  }
  receiveTableDate = (event: any) => {
    // to make date updated to latest change by user
    this.offloadModifyReq.jalaliDay = event;
  }
  /*
  water officer upload carousel images
  */
  routeToWoui = (object: any) => {
    this.carouselDataSource = object['dataSource'];
    this.rowIndex = object['ri'];
    this.showWouImages = true;
  }
  openMapDialog = (dataSource: any) => {
    if (this.listManagerService.showInMapSingleValidation(dataSource))
      this.ref = this.dialogService.open(MapDgComponent, {
        data: dataSource,
        rtl: true,
        width: '70%'
      })
    this.ref.onClose.subscribe(async res => {
      if (res)
        this.refreshTable();
    });
  }
  assignToPageSign = () => {
    this.pageSignTrackNumber = this.dataSource[0].trackNumber;
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
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
}