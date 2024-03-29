import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';

import { ListSearchMoshDgComponent } from '../list-search-mosh-dg/list-search-mosh-dg.component';
import { BriefKardexComponent } from './../brief-kardex/brief-kardex.component';
import { PageSignsService } from 'services/page-signs.service';

@Component({
  selector: 'app-list-modify',
  templateUrl: './list-modify.component.html',
  styleUrls: ['./list-modify.component.scss']
})
export class ListModifyComponent extends AllListsFactory {
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  deleteDictionary: IDictionaryManager[] = [];
  highLowStateDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  showWouImages: boolean = false;

  constructor(
    public listManagerService: ListManagerService,
    public dialogService: DialogService,
    public closeTabService: CloseTabService,
    public pageSignsService: PageSignsService
  ) {
    super(dialogService, listManagerService);
  }

  classWrapper = async (canRefresh?: boolean) => {

    if (!this.pageSignsService.modifyLists_pageSign.GUid) {
      this.toPrePage();
    }
    else {
      if (canRefresh) {
        this.closeTabService.saveDataForLMModify = null;
        this.closeTabService.saveDataForLMModifyReq = null;
      }
      if (this.closeTabService.saveDataForLMModifyReq != this.pageSignsService.modifyLists_pageSign.GUid || !this.closeTabService.saveDataForLMModify) {
        this.closeTabService.saveDataForLMModify = await this.listManagerService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.ListOffloadedALL, this.pageSignsService.modifyLists_pageSign.GUid);
        this.closeTabService.makeHadPicturesToBoolean(this.closeTabService.saveDataForLMModify);
        this.closeTabService.saveDataForLMModifyReq = this.pageSignsService.modifyLists_pageSign.GUid;
      }
      // setDynamics should implement before new instance of dataSource create
      // this.listManagerService.setDynamicPartRanges(this.closeTabService.saveDataForLMModify);
      this.closeTabService.saveDataForLMModify = JSON.parse(JSON.stringify(this.closeTabService.saveDataForLMModify));

      this.deleteDictionary = this.listManagerService.getDeleteDictionary();
      this.highLowStateDictionary = this.listManagerService.getHighLowDictionary();
      this.karbariDictionaryCode = await this.listManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
      this.qotrDictionary = await this.listManagerService.dictionaryWrapperService.getQotrDictionary();
      const tempZone: number = parseInt(this.closeTabService.saveDataForLMModify[0].zoneId.toString());
      this.counterStateByCodeDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateByCodeDictionary(tempZone);
      this.counterStateDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateByZoneIdDictionary(tempZone);

      this.closeTabService.saveDataForLMModify =
        Converter.convertIdsToTitles(
          this.closeTabService.saveDataForLMModify,
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
      Converter.convertIdToTitle(this.closeTabService.saveDataForLMModify, this.karbariDictionaryCode, 'karbariCode');
      this.listManagerService.setDynamicPartRanges(this.closeTabService.saveDataForLMModify);
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