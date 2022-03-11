import { Location } from '@angular/common';
import { Component } from '@angular/core';
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

import { MapDgComponent } from './map-dg/map-dg.component';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent extends FactoryONE {
  woumInfosDataSource: IOnOffLoadFlat;
  dataSource: IOnOffLoadFlat[] = [];
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
    private _location: Location,
    private dialogService: DialogService,
    public allListsService: AllListsService,
    private closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (!this.allListsService.allLists_pageSign.GUid) {
      this._location.back();
    }

    else {
      if (canRefresh) {
        this.closeTabService.saveDataForLMAll = null;
      }      
      if (this.closeTabService.saveDataForLMAllReq === this.allListsService.allLists_pageSign.GUid && this.closeTabService.saveDataForLMAll) {
        this.dataSource = this.closeTabService.saveDataForLMAll;
      }
      else {
        this.dataSource = await this.listManagerService.getLM(ENInterfaces.ListOffloadedALL, this.allListsService.allLists_pageSign.GUid);
        console.log(this.allListsService.allLists_pageSign);

        this.closeTabService.saveDataForLMAllReq = this.allListsService.allLists_pageSign.GUid;
        this.closeTabService.saveDataForLMAll = this.dataSource;
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
  routeToOffload = (event: object) => {
    this.carouselDataSource = event['dataSource'];
    this.rowIndex = event['ri'];
    this.showCarousel = true;
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
    this._location.back();
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
    this.rowIndex >= this.filterableDataSource.length - 1 ? this.rowIndex = 0 : this.rowIndex++;
    this.woumInfosDataSource = this.filterableDataSource[this.rowIndex];
  }
  carouselWOUMPrevItem = () => {
    this.rowIndex < 1 ? this.rowIndex = this.filterableDataSource.length - 1 : this.rowIndex--;
    this.woumInfosDataSource = this.filterableDataSource[this.rowIndex];
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