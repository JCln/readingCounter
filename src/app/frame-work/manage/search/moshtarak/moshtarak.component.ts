import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { SearchService } from 'services/search.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';
import { Search } from 'src/app/classes/search';

import { BriefKardexComponent } from '../../list-manager/brief-kardex/brief-kardex.component';

@Component({
  selector: 'app-moshtarak',
  templateUrl: './moshtarak.component.html',
  styleUrls: ['./moshtarak.component.scss']
})

export class MoshtarakComponent extends AllListsFactory {
  searchType: Search[];
  _searchByInfo: string = 'اشتراک';

  zoneDictionary: IDictionaryManager[] = [];
  deleteDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public searchService: SearchService,
    public dialogService: DialogService,
    public listManagerService: ListManagerService
  ) {
    super(dialogService, listManagerService);
  }

  converts = async () => {
    if (this.searchService.searchReqMosh.zoneId) {
      this.counterStateByCodeDictionary = await this.searchService.getCounterStateByCodeShowAllDictionary(this.searchService.searchReqMosh.zoneId);
      this.counterStateDictionary = await this.searchService.getCounterStateByZoneShowAllDictionary(this.searchService.searchReqMosh.zoneId);
      Converter.convertIdToTitle(this.closeTabService.saveDataForSearchMoshtarakin, this.counterStateByCodeDictionary, 'preCounterStateCode');
    }
    else {
      this.counterStateDictionary = await this.searchService.getCounterStateDictionary();
    }
    this.deleteDictionary = this.listManagerService.getDeleteDictionary();
    this.karbariDictionaryCode = await this.searchService.getKarbariDictionaryCode();
    this.qotrDictionary = await this.searchService.getQotrDictionary();

    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchMoshtarakin, this.deleteDictionary, 'hazf');
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchMoshtarakin, this.zoneDictionary, 'zoneId');
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchMoshtarakin, this.karbariDictionaryCode, 'possibleKarbariCode');
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchMoshtarakin, this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchMoshtarakin, this.qotrDictionary, 'qotrCode');
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchMoshtarakin, this.counterStateDictionary, 'counterStateId');

    this.searchService.setDynamicPartRanges(this.closeTabService.saveDataForSearchMoshtarakin);
  }
  connectToServer = async () => {
    if (this.searchService.verificationMosh(this.searchService.searchReqMosh)) {
      this.closeTabService.saveDataForSearchMoshtarakin = await this.searchService.doSearch(ENInterfaces.ListSearchMoshtarak, this.searchService.searchReqMosh);
      this.converts();
      this.searchService.makeHadPicturesToBoolean(this.closeTabService.saveDataForSearchMoshtarakin);
    }
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForSearchMoshtarakin = null;
      this.closeTabService.saveDataForSearchMoshtarakinReq = null;
    }
    if (this.closeTabService.saveDataForSearchMoshtarakin) {
      this.converts();
    }
    else
      this.toDefaultVals();

    this.searchType = this.searchService.getSearchTypes();
    this.getZoneDictionary();
  }
  refreshTable = () => {
    this.connectToServer();
  }
  toDefaultVals = () => {
    this.closeTabService.saveDataForSearchMoshtarakin = [];
  }
  getZoneDictionary = async () => {
    this.zoneDictionary = JSON.parse(JSON.stringify(await this.searchService.getZoneDictionary()));
    if (this.zoneDictionary[0].id !== 0)
      this.zoneDictionary.unshift({ id: 0, title: 'مناطق مجاز', isSelected: true })
  }
  convertTitleToId = (dataSource: any): any => {
    return this.zoneDictionary.find(item => {
      if (item.title === dataSource)
        return item;
    })
  }
  openBriefKardexDialog = (dataSource: any) => {
    const temp = this.convertTitleToId(dataSource.zoneId);
    this.ref = this.dialogService.open(BriefKardexComponent, {
      data: {
        radif: dataSource.radif,
        zoneId: temp.id
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
