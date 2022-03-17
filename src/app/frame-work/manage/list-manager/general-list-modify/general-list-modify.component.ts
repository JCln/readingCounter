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
import { OffloadModify } from 'src/app/classes/offload-modify-type';
import { EN_Routes } from 'src/app/Interfaces/routes.enum';

import { MapDgComponent } from '../all/map-dg/map-dg.component';

@Component({
  selector: 'app-general-list-modify',
  templateUrl: './general-list-modify.component.html',
  styleUrls: ['./general-list-modify.component.scss']
})
export class GeneralListModifyComponent extends FactoryONE {
  dataSource: IOnOffLoadFlat[] = [];
  woumInfosDataSource: IOnOffLoadFlat;
  carouselDataSource: IOnOffLoadFlat;
  filterableDataSource: IOnOffLoadFlat[] = [];
  clonedProducts: object = {};

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
    counterStateId: null,
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
      }
      if (this.closeTabService.saveDataForLMGeneralModifyReq === this.allListsService.generalModifyLists_pageSign.GUid && this.closeTabService.saveDataForLMGeneralModify) {
        this.dataSource = this.closeTabService.saveDataForLMGeneralModify;
      }
      this.insertSelectedColumns();
      this.dataSource = JSON.parse(JSON.stringify(this.dataSource));

      this.setDynamicRages();
      this.makeHadPicturesToBoolean();
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
  convertTitleToId = (dataSource: any): any => {
    return this.counterStateDictionary.find(item => {
      if (item.title === dataSource)
        return item;
    })
  }
  onRowEditInit(dataSource: object) {
    this.clonedProducts = dataSource;
    console.log(this.clonedProducts);

  }
  onRowEditCancel(dataSource: any) {
    console.log(dataSource);
    console.log(dataSource['dataSource']);

    //  this.clonedProducts;
  }
  async onRowEditSave(dataSource: any) {
    // TODO editSingleLine
    dataSource = dataSource['dataSource'];

    this.offloadModifyReq.id = dataSource.id;
    this.offloadModifyReq.counterStateId = this.convertTitleToId(dataSource.counterStateCode).id;
    this.offloadModifyReq.jalaliDay = dataSource.offloadDateJalali;
    this.offloadModifyReq.counterNumber = dataSource.counterNumber;
    this.offloadModifyReq.description = dataSource.description;

    if (this.listManagerService.offloadModifyValidation(this.offloadModifyReq)) {
      await this.listManagerService.postOffloadModifyEdited(this.offloadModifyReq);
    }
  }
  /*
  water officer upload carousel images
  */
  routeToWoui = (object: any) => {
    this.woumInfosDataSource = object['dataSource'];
    this.rowIndex = object['ri'];
    this.showWouImages = true;
  }
  carouselWOUMNextItem = () => {
    this.rowIndex >= this.dataSource.length - 1 ? this.rowIndex = 0 : this.rowIndex++;
    this.woumInfosDataSource = this.dataSource[this.rowIndex];
  }
  carouselWOUMPrevItem = () => {
    this.rowIndex < 1 ? this.rowIndex = this.dataSource.length - 1 : this.rowIndex--;
    this.woumInfosDataSource = this.dataSource[this.rowIndex];
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

}