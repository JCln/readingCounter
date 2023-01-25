import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService } from 'primeng/dynamicdialog';
import { AllListsService } from 'services/all-lists.service';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';

import { ListSearchMoshDgComponent } from '../list-search-mosh-dg/list-search-mosh-dg.component';
import { BriefKardexComponent } from './../brief-kardex/brief-kardex.component';

@Component({
  selector: 'app-list-modify',
  templateUrl: './list-modify.component.html',
  styleUrls: ['./list-modify.component.scss']
})
export class ListModifyComponent extends AllListsFactory {
  dataSource: IOnOffLoadFlat[] = [];

  karbariDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  deleteDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  showWouImages: boolean = false;

  constructor(
    public listManagerService: ListManagerService,
    public dialogService: DialogService,
    private closeTabService: CloseTabService,
    public allListsService: AllListsService
  ) {
    super(dialogService, listManagerService);
  }


  classWrapper = async (canRefresh?: boolean) => {

    if (!this.allListsService.modifyLists_pageSign.GUid) {
      this.toPrePage();
    }
    else {
      if (canRefresh) {
        this.closeTabService.saveDataForLMModify = null;
        this.closeTabService.saveDataForLMModifyReq = null;
      }
      if (this.closeTabService.saveDataForLMModifyReq === this.allListsService.modifyLists_pageSign.GUid && this.closeTabService.saveDataForLMModify) {
        this.dataSource = this.closeTabService.saveDataForLMModify;
      }
      else {
        this.dataSource = await this.listManagerService.getLM(ENInterfaces.ListOffloadedALL, this.allListsService.modifyLists_pageSign.GUid);
        this.listManagerService.makeHadPicturesToBoolean(this.dataSource);
        this.closeTabService.saveDataForLMModifyReq = this.allListsService.modifyLists_pageSign.GUid;
        this.closeTabService.saveDataForLMModify = this.dataSource;
      }
      // setDynamics should implement before new instance of dataSource create
      this.listManagerService.setDynamicPartRanges(this.dataSource);
      this.dataSource = JSON.parse(JSON.stringify(this.dataSource));

      this.deleteDictionary = this.listManagerService.getDeleteDictionary();
      this.karbariDictionary = await this.listManagerService.getKarbariDictionary();
      this.karbariDictionaryCode = await this.listManagerService.getKarbariDictionaryCode();
      this.qotrDictionary = await this.listManagerService.getQotrDictionary();

      Converter.convertIdToTitle(this.dataSource, this.counterStateDictionary, 'counterStateId');
      const tempZone: number = parseInt(this.dataSource[0].zoneId.toString());
      if (tempZone) {
        this.counterStateByCodeDictionary = await this.listManagerService.getCounterStateByCodeDictionary(tempZone);
        this.counterStateDictionary = await this.listManagerService.getCounterStateByZoneIdDictionary(tempZone);
        Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
        Converter.convertIdToTitle(this.dataSource, this.counterStateDictionary, 'counterStateId');
      }

      Converter.convertIdToTitle(this.dataSource, this.deleteDictionary, 'hazf');
      Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'possibleKarbariCode');
      Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'karbariCode');
      Converter.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');
    }
  }
  toPrePage = () => {
    this.listManagerService.routeToOffloaded();
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
  carouselCancelClicked = () => {
    this.showCarousel = false;
    this.showWouImages = false;
  }
}