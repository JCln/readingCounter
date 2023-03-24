import { Component, OnDestroy, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { Subscription } from 'rxjs/internal/Subscription';
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
export class SimpleComponent implements OnInit, OnDestroy {
  _years: ITitleValue[] = [];
  subscription: Subscription[] = [];

  zoneDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  _selectedKindId: string = '';

  constructor(
    public closeTabService: CloseTabService,
    public searchService: SearchService
  ) {
  }

  converts = async () => {
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchSimple, this.zoneDictionary, 'zoneId');
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForSearchSimple = [];
    if (!this.searchService.verificationSimpleSearch(this.searchService._searchSimpleReq))
      return;
    this.closeTabService.saveDataForSearchSimple = await this.searchService.doSearch(ENInterfaces.ListSearchSimple, this.searchService._searchSimpleReq);
    if (this.closeTabService.saveDataForSearchSimple.length) {
      this.converts();
    }
  }
  nullSavedSource = () => this.closeTabService.saveDataForSearchSimple = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!MathS.isNull(this.closeTabService.saveDataForSearchSimple)) {
      this.converts();
    }

    this.receiveYear();
    this.readingPeriodKindDictionary = await this.searchService.getReadingPeriodKindDictionary();
    this.zoneDictionary = await this.searchService.getZoneDictionary();
    this.searchService.getSearchInOrderTo();
  }
  ngOnInit() {
    this.classWrapper();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  refreshTable = () => {
    this.connectToServer();
  }
  receiveYear = () => {
    this._years = this.searchService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.searchService.getReadingPeriodDictionary(this._selectedKindId);
  }
}
