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
  karbariDictionary: IDictionaryManager[] = [];

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private searchService: SearchService,
    public outputManagerService: OutputManagerService
  ) {
  }

  convertKarbariIdToTitle = (dataSource: any, dictionary: IDictionaryManager[]) => {
    dataSource.map(dataSource => {
      dictionary.map(Dict => {
        if (Dict.id === dataSource.karbariCode)
          dataSource.karbariCode = Dict.title;
      })
    });
  }
  convertCounterStateIdToTitle = (dataSource: any, dictionary: IDictionaryManager[]) => {
    dataSource.map(dataSource => {
      dictionary.map(Dict => {
        if (Dict.id === dataSource.counterStateCode)
          dataSource.counterStateCode = Dict.title;
      })
    });
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
    this.karbariDictionary = await this.searchService.getKarbariDictionary();

    this.convertCounterStateIdToTitle(this.dataSource, this.counterStateDictionary);
    this.convertKarbariIdToTitle(this.dataSource, this.karbariDictionary);
    this.insertSelectedColumns();
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
        if (res === ('/wr/m/s/searchMosh')) {
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
