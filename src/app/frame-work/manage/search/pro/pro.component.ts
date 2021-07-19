import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { IOnOffLoadFlat, ISearchProReportInput } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { OutputManagerService } from 'services/output-manager.service';
import { SearchService } from 'services/search.service';
import { UtilsService } from 'services/utils.service';
import { Converter } from 'src/app/classes/converter';

import { SearchDgComponentComponent } from './search-dg-component/search-dg-component.component';

@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.scss']
})
export class ProComponent implements OnInit, AfterViewInit, OnDestroy {

  _empty_message: string = '';

  _selectCols: any[] = [];
  _selectedColumns: any[];

  subscription: Subscription[] = [];

  dataSource: IOnOffLoadFlat[] = [];
  searchReq: ISearchProReportInput;
  zoneDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  ref: DynamicDialogRef;

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public searchService: SearchService,
    public outputManagerService: OutputManagerService,
    private utilsService: UtilsService,
    private dialogService: DialogService,
  ) {
  }

  insertSelectedColumns = () => {
    this._selectCols = this.searchService.columnSearchPro();
    this._selectedColumns = this.searchService.customizeSelectedColumns(this._selectCols);
  }
  converts = () => {
    this._empty_message = EN_messages.notFound;
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'counterStateCode');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');

    this.insertSelectedColumns();
    this.searchService.setDynamicPartRanges(this.dataSource);
  }
  connectToServer = async () => {
    this.dataSource = await this.searchService.searchPro(this.searchReq);
    this.counterStateDictionary = await this.searchService.getCounterStateByZoneDictionary(this.searchReq.zoneId);
    this.counterStateByCodeDictionary = await this.searchService.getCounterStateByCodeDictionary(this.searchReq.zoneId);
    this.karbariDictionary = await this.searchService.getKarbariDictionary();
    this.qotrDictionary = await this.searchService.getQotrDictionary();

    this.converts();
    this.searchService.makeHadPicturesToBoolean(this.dataSource);

    this.closeTabService.saveDataForSearchPro = this.dataSource;
  }
  nullSavedSource = () => this.closeTabService.saveDataForSearchPro = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (this.utilsService.isNull(this.searchReq)) {
      this.searchReq = this.searchService.getSearchPro();
      if (this.utilsService.isNull(this.searchReq)) {
        this.showSearchOptionsDialog();
        return;
      }
    }
    if (canRefresh) {
      this.nullSavedSource();

      if (!this.searchService.verificationPro(this.searchReq))
        this.connectToServer();
    }
    else {
      if (!this.utilsService.isNull(this.closeTabService.saveDataForSearchPro)) {
        this.dataSource = this.closeTabService.saveDataForSearchPro;
        this.converts();
      }
      else
        this.toDefaultVals();
    }

  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/s/searchPro') {
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
    this.classWrapper(true);
  }
  toDefaultVals = () => {
    this.dataSource = [];
  }

  showSearchOptionsDialog = () => {
    this.ref = this.dialogService.open(SearchDgComponentComponent, {
      rtl: true,
      width: '90%'
    })
    this.ref.onClose.subscribe((res: ISearchProReportInput) => {
      if (res) {
        this.searchReq = res;
        this.connectToServer();
      }
    });
  }
}
