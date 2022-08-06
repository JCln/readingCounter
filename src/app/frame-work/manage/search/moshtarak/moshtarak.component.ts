import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { SearchService } from 'services/search.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { Search } from 'src/app/classes/search';

@Component({
  selector: 'app-moshtarak',
  templateUrl: './moshtarak.component.html',
  styleUrls: ['./moshtarak.component.scss']
})

export class MoshtarakComponent extends AllListsFactory {
  dataSource: IOnOffLoadFlat[] = [];
  searchType: Search[];
  _searchByInfo: string = 'اشتراک';

  zoneDictionary: IDictionaryManager[] = [];
  deleteDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];

  constructor(

    private closeTabService: CloseTabService,
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
      Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
    }
    else {
      this.counterStateDictionary = await this.searchService.getCounterStateDictionary();
    }
    this.deleteDictionary = this.listManagerService.getDeleteDictionary();
    this.karbariDictionary = await this.searchService.getKarbariDictionary();
    this.karbariDictionaryCode = await this.searchService.getKarbariDictionaryCode();
    this.qotrDictionary = await this.searchService.getQotrDictionary();

    Converter.convertIdToTitle(this.dataSource, this.deleteDictionary, 'hazf');
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'possibleKarbariCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');
    Converter.convertIdToTitle(this.dataSource, this.counterStateDictionary, 'counterStateId');

    this.searchService.setDynamicPartRanges(this.dataSource);
  }
  connectToServer = async () => {
    if (!this.searchService.verificationMosh(this.searchService.searchReqMosh))
      return;
    this.dataSource = await this.searchService.doSearch(ENInterfaces.ListSearchMoshtarak, this.searchService.searchReqMosh);
    this.converts();
    this.searchService.makeHadPicturesToBoolean(this.dataSource);

    this.closeTabService.saveDataForSearchMoshtarakin = this.dataSource;
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForSearchMoshtarakin = null;
      this.closeTabService.saveDataForSearchMoshtarakinReq = null;
    }
    if (!MathS.isNull(this.closeTabService.saveDataForSearchMoshtarakin)) {
      this.dataSource = this.closeTabService.saveDataForSearchMoshtarakin;
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
    this.dataSource = [];
  }
  getZoneDictionary = async () => {
    this.zoneDictionary = JSON.parse(JSON.stringify(await this.searchService.getZoneDictionary()));
    if (this.zoneDictionary[0].id !== 0)
      this.zoneDictionary.unshift({ id: 0, title: 'مناطق مجاز', isSelected: true })
  }


}
