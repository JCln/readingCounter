import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { OfflineModeService } from 'services/offline-mode.service';
import { CloseTabService } from 'services/close-tab.service';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-single-reading-counter',
  templateUrl: './single-reading-counter.component.html',
  styleUrls: ['./single-reading-counter.component.scss'],
  animations: [transitionAnimation]
})
export class SingleReadingCounterComponent extends FactoryONE {
  _searchByInfo: string = 'اشتراک';

  constructor(
    public closeTabService: CloseTabService,
    private offlineModeService: OfflineModeService,
    public dictionaryWrapperService: DictionaryWrapperService
  ) {
    super();
  }

  getNesseseriesByZone = async () => {
    // const _zone = this.closeTabService.saveDataForSearchProReq.zoneId;
    // if (!_zone) {
    //   this.counterStateDictionary = await this.searchService.dictionaryWrapperService.getCounterStateDictionary();
    // }
    // else {
    //   this.fragmentMasterIds = await this.searchService.dictionaryWrapperService.getFragmentMasterByZoneIdDictionary(_zone);
    //   this.counterReportDictionary = await this.searchService.dictionaryWrapperService.getCounterReportByZoneIdDictionary(_zone);
    //   this.counterStateByZoneIdDictionary = await this.searchService.dictionaryWrapperService.getCounterStateByZoneIdDictionary(_zone);
    //   this.counterStateDictionary = await this.searchService.dictionaryWrapperService.getCounterStateByZoneIdDictionary(_zone);
    //   this.counterStateByCodeDictionary = await this.searchService.dictionaryWrapperService.getCounterStateByCodeDictionary(_zone);
    // }

    // this.deleteDictionary = this.listManagerService.getDeleteDictionary();
    // this.masrafState = this.searchService.getMasrafStates();
    // this.qotrDictionary = await this.searchService.dictionaryWrapperService.getQotrDictionary();
    // this.karbariDictionaryCode = await this.searchService.dictionaryWrapperService.getkarbariCodeDictionary();

    // Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.deleteDictionary, 'hazf');
    // Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.zoneDictionary, 'zoneId');
    // Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.karbariDictionaryCode, 'karbariCode');
    // Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.karbariDictionaryCode, 'possibleKarbariCode');
    // Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.qotrDictionary, 'qotrCode');
    // Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.counterStateDictionary, 'counterStateId');
    // Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.eslahType, 'eslahType');
    // Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.counterStateByCodeDictionary, 'preCounterStateCode');

    // this.searchService.setDynamicPartRanges(this.closeTabService.saveDataForSearchPro);
    // this.searchService.makeHadPicturesToBoolean(this.closeTabService.saveDataForSearchPro);
  }
  
  connectToServer = async () => {
    if (this.offlineModeService.vertificationSingleReadingRequest(this.closeTabService.offlineSingleReadingCounterReq)) {
      this.closeTabService.offlineSingleReadingCounter = await this.offlineModeService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.offlineSingleReadingCounter, this.closeTabService.offlineSingleReadingCounterReq);
      console.log(this.closeTabService.offlineSingleReadingCounter);

    }
  }
  classWrapper = async (canRefresh?: boolean) => {
    console.log(1);

    this.closeTabService.offlineSingleReadingCounterReq.searchType = this.offlineModeService.getSearchTypes();
  }

}
