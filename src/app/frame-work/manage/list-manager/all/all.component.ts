import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService } from 'primeng/dynamicdialog';
import { AllListsService } from 'services/all-lists.service';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';

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

  constructor(
    public listManagerService: ListManagerService,
    private _location: Location,
    public dialogService: DialogService,
    public allListsService: AllListsService,
    public closeTabService: CloseTabService
  ) {
    super(dialogService, listManagerService);
  }
  dictionaryWrapps = async () => {
    this.deleteDictionary = this.listManagerService.getDeleteDictionary();
    this.zoneDictionary = await this.listManagerService.getLMAllZoneDictionary();
    this.karbariDictionaryCode = await this.listManagerService.getKarbariDictionaryCode();
    this.qotrDictionary = await this.listManagerService.getQotrDictionary();
    const tempZone: number = parseInt(this.closeTabService.saveDataForLMAll[0].zoneId.toString());
    this.counterStateDictionary = await this.listManagerService.getCounterStateByZoneIdDictionary(tempZone);
    this.counterStateByCodeDictionary = await this.listManagerService.getCounterStateByCodeDictionary(tempZone);

    this.closeTabService.saveDataForLMAll =
      Converter.convertIdsToTitles(
        this.closeTabService.saveDataForLMAll,
        {
          deleteDictionary: this.deleteDictionary,
          zoneDictionary: this.zoneDictionary,
          counterStateDictionary: this.counterStateDictionary,
          counterStateByCodeDictionary: this.counterStateByCodeDictionary,
          karbariDictionaryCode: this.karbariDictionaryCode,
          qotrDictionary: this.qotrDictionary,
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

  }
  classWrapper = async (canRefresh?: boolean) => {
    if (!this.allListsService.allLists_pageSign.GUid) {
      this._location.back();
    }

    else {
      if (canRefresh) {
        this.closeTabService.saveDataForLMAll = null;
        this.closeTabService.saveDataForLMAllReq = null;
      }

      if (!this.closeTabService.saveDataForLMAll || this.closeTabService.saveDataForLMAllReq != this.allListsService.allLists_pageSign.GUid) {
        this.closeTabService.saveDataForLMAll = await this.listManagerService.getLM(ENInterfaces.ListOffloadedALL, this.allListsService.allLists_pageSign.GUid);
        this.listManagerService.makeHadPicturesToBoolean(this.closeTabService.saveDataForLMAll);
        this.closeTabService.saveDataForLMAllReq = this.allListsService.allLists_pageSign.GUid;
      }
      // setDynamics should implement before new instance of dataSource create
      this.listManagerService.setDynamicPartRanges(this.closeTabService.saveDataForLMAll);
      this.closeTabService.saveDataForLMAll = JSON.parse(JSON.stringify(this.closeTabService.saveDataForLMAll));

      this.dictionaryWrapps();
    }
  }
  toPrePage = () => {
    this._location.back();
  }

}