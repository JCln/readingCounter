import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENGroupByNames } from 'interfaces/enums.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { EN_Routes } from 'interfaces/routes.enum';
import { CloseTabService } from 'services/close-tab.service';
import { SearchService } from 'services/search.service';
import { Converter } from 'src/app/classes/converter';
import { MathS } from 'src/app/classes/math-s';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
  animations: [transitionAnimation]
})
export class SimpleComponent implements OnInit {
  zoneDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  ENGroupByNames = ENGroupByNames;

  constructor(
    public closeTabService: CloseTabService,
    public searchService: SearchService
  ) {
  }

  converts = async () => {
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchSimple, this.zoneDictionary, 'changableZoneId');
  }
  insertToAuxZoneid = () => {
    this.closeTabService.saveDataForSearchSimple.forEach(item => {
      item.changableZoneId = item.zoneId;
    })
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForSearchSimple = [];
    if (!this.searchService.verificationSimpleSearch(this.closeTabService._searchSimpleReq, this.closeTabService._isOrderByDate))
      return;
    this.closeTabService.saveDataForSearchSimple = await this.searchService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ListSearchSimple, this.closeTabService._searchSimpleReq);
    this.insertToAuxZoneid();
    this.converts();
  }
  classWrapper = async () => {
    if (!MathS.isNull(this.closeTabService.saveDataForSearchSimple)) {
      this.converts();
    }
    this.readingPeriodKindDictionary = await this.searchService.dictionaryWrapperService.getPeriodKindDictionary();
    this.zoneDictionary = await this.searchService.dictionaryWrapperService.getZoneDictionary();
    this.closeTabService.getSearchInOrderTo();
  }
  ngOnInit() {
    this.classWrapper();
  }
  afterZoneChanged() {
    // TODO: CLEAR period dictionaries and selected periodId and kindId values
    this.readingPeriodDictionary = [];
    this.closeTabService._searchSimpleReq.readingPeriodId = null;
    this.closeTabService._searchSimpleReq._selectedKindId = null;
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.closeTabService._searchSimpleReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.searchService.dictionaryWrapperService.getReadingPeriodDictionaryByZoneAndKind(this.closeTabService._searchSimpleReq.zoneId, +this.closeTabService._searchSimpleReq._selectedKindId);
  }
  routeToLMAll = ($event: any) => {
    this.searchService.routeToLMAll($event, EN_Routes.wrmssimple);
  }
}
