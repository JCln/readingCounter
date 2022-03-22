import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService } from 'primeng/dynamicdialog';
import { AllListsService } from 'services/all-lists.service';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';
import { EN_Routes } from 'src/app/Interfaces/routes.enum';

import { ListSearchMoshDgComponent } from '../list-search-mosh-dg/list-search-mosh-dg.component';

@Component({
  selector: 'app-list-modify',
  templateUrl: './list-modify.component.html',
  styleUrls: ['./list-modify.component.scss']
})
export class ListModifyComponent extends AllListsFactory {
  dataSource: IOnOffLoadFlat[] = [];

  pageSignTrackNumber: number = null;
  zoneDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  showWouImages: boolean = false;

  constructor(
    public listManagerService: ListManagerService,
    private router: Router,
    public dialogService: DialogService,
    private closeTabService: CloseTabService,
    public allListsService: AllListsService
  ) {
    super(dialogService, listManagerService);
  }

  classWrapper = async (canRefresh?: boolean) => {

    if (!this.allListsService.modifyLists_pageSign.GUid) {
      this.router.navigateByUrl(EN_Routes.wrmtrackoffloaded);
    }
    else {
      if (canRefresh) {
        this.closeTabService.saveDataForLMModify = null;
        this.closeTabService.saveDataForLMModifyReq = null;
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

      this.listManagerService.setDynamicPartRanges(this.dataSource);
      this.listManagerService.makeHadPicturesToBoolean(this.dataSource);
    }
  }
  toPrePage = () => {
    this.router.navigate([EN_Routes.wrmtrackoffloaded]);
  } 
  /*
  water officer upload carousel images
  */
  assignToPageSign = () => {
    this.pageSignTrackNumber = this.dataSource[0].trackNumber;
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
  carouselCancelClicked = () => {
    this.showCarousel = false;
    this.showWouImages = false;
  }
}