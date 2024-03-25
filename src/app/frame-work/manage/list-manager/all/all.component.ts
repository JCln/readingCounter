import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { EN_Routes } from 'interfaces/routes.enum';
import { DialogService } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { PageSignsService } from 'services/page-signs.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent extends AllListsFactory {
  zoneDictionary: IDictionaryManager[] = [];
  deleteDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  highLowStateDictionary: IDictionaryManager[] = [];

  constructor(
    public listManagerService: ListManagerService,
    public dialogService: DialogService,
    public pageSignsService: PageSignsService,
    public closeTabService: CloseTabService
  ) {
    super(dialogService, listManagerService);
  }
  dictionaryWrapps = async (): Promise<any> => {
    console.log(1);

    this.deleteDictionary = this.listManagerService.getDeleteDictionary();
    this.highLowStateDictionary = this.listManagerService.getHighLowDictionary();
    this.zoneDictionary = await this.listManagerService.dictionaryWrapperService.getZoneDictionary();
    this.karbariDictionaryCode = await this.listManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.qotrDictionary = await this.listManagerService.dictionaryWrapperService.getQotrDictionary();
    this.counterStateDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateByZoneIdDictionary(this.pageSignsService.allLists_pageSign.zoneId);
    this.counterStateByCodeDictionary = await this.listManagerService.dictionaryWrapperService.getCounterStateByCodeDictionary(this.pageSignsService.allLists_pageSign.zoneId);
    this.closeTabService.saveDataForLMAll =
      Converter.convertIdsToTitles(
        this.closeTabService.saveDataForLMAll,
        {
          deleteDictionary: this.deleteDictionary,
          zoneDictionary: this.zoneDictionary,
          counterStateDictionary: this.counterStateDictionary,
          counterStateByCodeDictionary: this.counterStateByCodeDictionary,
          karbariDictionaryCode: this.karbariDictionaryCode,
          qotrDictionary: this.qotrDictionary
        },
        {
          hazf: 'hazf',
          zoneId: 'zoneId',
          counterStateId: 'counterStateId',
          preCounterStateCode: 'preCounterStateCode',
          possibleKarbariCode: 'possibleKarbariCode',
          qotrCode: 'qotrCode'
        })
    Converter.convertIdToTitle(this.closeTabService.saveDataForLMAll, this.karbariDictionaryCode, 'karbariCode');
    this.closeTabService.makeHadPicturesToBoolean(this.closeTabService.saveDataForLMAll);
    return new Promise((resolve) => {
      resolve(true);
    });
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (!this.pageSignsService.allLists_pageSign.GUid) {
      if (this.pageSignsService.allLists_pageSign.prePage.length > 0)
        this.listManagerService.utilsService.routeTo(this.pageSignsService.allLists_pageSign.prePage);
      else
        this.listManagerService.utilsService.routeTo(EN_Routes.wr);
    }

    else {
      if (canRefresh) {
        this.closeTabService.saveDataForLMAll = [];
      }

      if (MathS.isNull(this.closeTabService.saveDataForLMAll) || this.closeTabService.saveDataForLMAllReq.GUID != this.pageSignsService.allLists_pageSign.GUid) {
        this.closeTabService.saveDataForLMAll = await this.listManagerService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.ListOffloadedALL, this.pageSignsService.allLists_pageSign.GUid);
        this.closeTabService.saveDataForLMAllReq.GUID = this.pageSignsService.allLists_pageSign.GUid;
      }

      await this.dictionaryWrapps();

      // setDynamics should implement before new instance of dataSource create
      // this.closeTabService.saveDataForLMAll = JSON.parse(JSON.stringify(this.closeTabService.saveDataForLMAll));
      this.listManagerService.setDynamicPartRanges(this.closeTabService.saveDataForLMAll);

    }
  }

}