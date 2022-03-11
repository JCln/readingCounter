import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AllListsService } from 'services/all-lists.service';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { EN_Routes } from 'src/app/Interfaces/routes.enum';

import { MapDgComponent } from '../all/map-dg/map-dg.component';

@Component({
  selector: 'app-list-modify',
  templateUrl: './list-modify.component.html',
  styleUrls: ['./list-modify.component.scss']
})
export class ListModifyComponent extends FactoryONE {
  dataSource: IOnOffLoadFlat[] = [];
  woumInfosDataSource: IOnOffLoadFlat;
  carouselDataSource: IOnOffLoadFlat;
  filterableDataSource: IOnOffLoadFlat[] = [];

  pageSignTrackNumber: number = null;
  showCarousel: boolean = false;
  showWouImages: boolean = false;
  ref: DynamicDialogRef;

  rowIndex: number = 0;
  zoneDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];

  constructor(
    public listManagerService: ListManagerService,
    private router: Router,
    private dialogService: DialogService,
    private closeTabService: CloseTabService,
    public allListsService: AllListsService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {

    if (!this.allListsService.modifyLists_pageSign.GUid) {
      this.router.navigateByUrl(EN_Routes.wrmtrackoffloaded);
    }
    else {
      if (canRefresh) {
        this.closeTabService.saveDataForLMModify = null;
      }
      console.log(this.closeTabService.saveDataForLMModify);
      if (this.closeTabService.saveDataForLMModifyReq === this.allListsService.modifyLists_pageSign.GUid && this.closeTabService.saveDataForLMModify) {
        this.dataSource = this.closeTabService.saveDataForLMModify;
      }
      else {
        this.dataSource = await this.listManagerService.getLM(ENInterfaces.ListOffloadedALL, this.allListsService.modifyLists_pageSign.GUid);
        this.closeTabService.saveDataForLMModifyReq = this.allListsService.modifyLists_pageSign.GUid;
        this.closeTabService.saveDataForLMModify = this.dataSource;
      }
      this.assignToPageSign();
      this.dataSource = JSON.parse(JSON.stringify(this.dataSource));

      this.zoneDictionary = await this.listManagerService.getLMAllZoneDictionary();
      this.karbariDictionary = await this.listManagerService.getKarbariDictionary();
      this.karbariDictionaryCode = await this.listManagerService.getKarbariDictionaryCode();
      this.qotrDictionary = await this.listManagerService.getQotrDictionary();
      this.counterStateDictionary = await this.listManagerService.getCounterStateDictionary();

      Converter.convertIdToTitle(this.dataSource, this.counterStateDictionary, 'counterStateId');
      const tempZone: number = parseInt(this.dataSource[0].zoneId.toString());
      if (tempZone) {
        this.counterStateByCodeDictionary = await this.listManagerService.getCounterStateByCodeDictionary(tempZone);
        Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'counterStateCode');
        Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
      }
      Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
      Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'karbariCode');
      Converter.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');

      this.setDynamicRages();
      this.makeHadPicturesToBoolean();
    }
  }
  filteredTableEvent = (e: any) => {
    this.filterableDataSource = e;
  }
  routeToOffload = (event: object) => {
    this.carouselDataSource = event['dataSource'];
    this.rowIndex = event['ri'];
    this.showCarousel = true;
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

  /*
  water officer upload carousel images
  */
  routeToWoui = (object: any) => {
    this.woumInfosDataSource = object['dataSource'];
    this.rowIndex = object['ri'];
    this.showWouImages = true;
    scrollTo(0, 0);
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
}