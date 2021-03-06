import { Location } from '@angular/common';
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

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent extends AllListsFactory {
  dataSource: IOnOffLoadFlat[] = [];
  pageSignTrackNumber: number = null;

  zoneDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];

  constructor(
    public listManagerService: ListManagerService,
    private _location: Location,
    public dialogService: DialogService,
    public allListsService: AllListsService,
    private closeTabService: CloseTabService
  ) {
    super(dialogService, listManagerService);
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (!this.allListsService.allLists_pageSign.GUid) {
      this._location.back();
    }

    else {
      this.pageSignTrackNumber = this.allListsService.allLists_pageSign.trackNumber;
      if (canRefresh) {
        this.closeTabService.saveDataForLMAll = null;
        this.closeTabService.saveDataForLMAllReq = null;
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
      // this.assignToPageSign();
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
    this._location.back();
  }
  assignToPageSign = () => {
    this.pageSignTrackNumber = this.dataSource[0].trackNumber;
  }

}