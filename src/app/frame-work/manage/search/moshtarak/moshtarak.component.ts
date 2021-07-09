import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { OutputManagerService } from 'services/output-manager.service';
import { SearchService } from 'services/search.service';
import { UtilsService } from 'services/utils.service';
import { Search } from 'src/app/classes/search';
import { EN_messages } from 'src/app/Interfaces/enums.enum';
import { IOnOffLoadFlat, ISearchMoshReq } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';


@Component({
  selector: 'app-moshtarak',
  templateUrl: './moshtarak.component.html',
  styleUrls: ['./moshtarak.component.scss']
})
export class MoshtarakComponent implements OnInit, AfterViewInit, OnDestroy {
  searchReq: ISearchMoshReq = {
    zoneId: null,
    searchBy: null,
    item: '',
    similar: true
  }
  dataSource: IOnOffLoadFlat[] = [];
  searchType: Search[];
  searchByText: string = '';
  _empty_message: string = '';

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
    public searchService: SearchService,
    public outputManagerService: OutputManagerService,
    private utilsService: UtilsService
  ) {
  }

  insertSelectedColumns = () => {
    this._selectCols = this.searchService.columnSearchMoshtarakin();
    this._selectedColumns = this.searchService.customizeSelectedColumns(this._selectCols);
  }
  converts = () => {
    this._empty_message = EN_messages.notFound;
    this.searchService.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    this.searchService.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'counterStateCode');
    this.searchService.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
    this.searchService.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    this.searchService.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');

    this.insertSelectedColumns();
    this.searchService.setDynamicPartRanges(this.dataSource);
  }
  connectToServer = async () => {
    if (!this.searchService.verificationMosh(this.searchReq))
      return;
    this.dataSource = await this.searchService.searchMoshterakin(this.searchReq);
    this.counterStateDictionary = await this.searchService.getCounterStateByZoneDictionary(this.searchReq.zoneId);
    this.counterStateByCodeDictionary = await this.searchService.getCounterStateByCodeDictionary(this.searchReq.zoneId);
    this.karbariDictionary = await this.searchService.getKarbariDictionary();
    this.qotrDictionary = await this.searchService.getQotrDictionary();

    this.converts();
    this.searchService.makeHadPicturesToBoolean(this.dataSource);

    this.closeTabService.saveDataForSearchMoshtarakin = this.dataSource;
  }
  nullSavedSource = () => this.closeTabService.saveDataForSearchMoshtarakin = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.utilsService.isNull(this.closeTabService.saveDataForSearchMoshtarakin)) {
      this.dataSource = this.closeTabService.saveDataForSearchMoshtarakin;
      this.converts();
    }
    else
      this.toDefaultVals();

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
  toDefaultVals = () => {
    this.dataSource = [];
  }
}
