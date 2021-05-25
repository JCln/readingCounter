import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Search } from 'src/app/classes/search';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { OutputManagerService } from 'src/app/services/output-manager.service';
import { SearchService } from 'src/app/services/search.service';

import { IOnOffLoadFlat, ISearchMoshReq } from './../../../../Interfaces/imanage';

@Component({
  selector: 'app-moshtarak',
  templateUrl: './moshtarak.component.html',
  styleUrls: ['./moshtarak.component.scss']
})
export class MoshtarakComponent implements OnInit {
  searchReq: ISearchMoshReq = {
    zoneId: null,
    searchBy: null,
    item: '',
    similar: true
  }
  dataSource: IOnOffLoadFlat[] = [];
  searchType: Search[];
  searchByText: string = '';

  _selectCols: any[] = [];
  _selectedColumns: any[];

  subscription: Subscription[] = [];

  zoneDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private searchService: SearchService,
    public outputManagerService: OutputManagerService
  ) {
  }

  insertSelectedColumns = () => {
    this._selectCols = this.searchService.columnSearchMoshtarakin();
    this._selectedColumns = this.searchService.customizeSelectedColumns(this._selectCols);
  }
  connectToServer = async () => {
    if (!this.searchService.verificationMosh(this.searchReq))
      return;
    this.dataSource = await this.searchService.searchMoshterakin(this.searchReq);
    this.counterStateDictionary = await this.searchService.getCounterStateDictionary(this.searchReq.zoneId);
    this.counterStateByCodeDictionary = await this.searchService.getCounterStateByCodeDictionary(this.searchReq.zoneId);
    this.karbariDictionary = await this.searchService.getKarbariDictionary();
    this.qotrDictionary = await this.searchService.getQotrDictionary();

    this.insertSelectedColumns();

    this.searchService.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    this.searchService.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'counterStateCode');
    this.searchService.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
    this.searchService.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    this.searchService.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');
    
    this.searchService.setDynamicPartRanges(this.dataSource);
  }
  nullSavedSource = () => this.closeTabService.saveDataForSearchMoshtarakin = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.searchType = this.searchService.getSearchTypes();
    this.zoneDictionary = await this.searchService.getZoneDictionary();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/s/searchMosh') {
          this.classWrapper(true);
        }
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  refreshTable = () => {
    this.connectToServer();
  }

}
