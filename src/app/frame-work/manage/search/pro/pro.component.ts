import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { ISearchProReportInput } from 'interfaces/search';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { SearchService } from 'services/search.service';
import { UtilsService } from 'services/utils.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

import { SearchDgComponentComponent } from './search-dg-component/search-dg-component.component';

@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.scss']
})
export class ProComponent extends FactoryONE {

  _empty_message: string = '';

  _selectCols: any[] = [];
  _selectedColumns: any[];

  dataSource: IOnOffLoadFlat[] = [];
  searchReq: ISearchProReportInput;
  zoneDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  ref: DynamicDialogRef;

  constructor(
    public interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public searchService: SearchService,    
    private utilsService: UtilsService,
    private dialogService: DialogService,
  ) {
    super();
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
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');

    this.insertSelectedColumns();
    this.searchService.setDynamicPartRanges(this.dataSource);
  }
  connectToServer = async () => {
    this.dataSource = await this.searchService.doSearch(ENInterfaces.ListSearchPro, this.searchReq);
    this.counterStateDictionary = await this.searchService.getCounterStateByZoneDictionary(this.searchReq.zoneId);
    this.counterStateByCodeDictionary = await this.searchService.getCounterStateByCodeDictionary(this.searchReq.zoneId);
    this.karbariDictionary = await this.searchService.getKarbariDictionary();
    this.karbariDictionaryCode = await this.searchService.getKarbariDictionaryCode();
    this.qotrDictionary = await this.searchService.getQotrDictionary();

    this.converts();
    this.searchService.makeHadPicturesToBoolean(this.dataSource);

    this.closeTabService.saveDataForSearchPro = this.dataSource;
  }
  nullSavedSource = () => this.closeTabService.saveDataForSearchPro = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      // this.nullSavedSource();
      this.connectToServer();
    }
    if (!MathS.isNull(this.closeTabService.saveDataForSearchPro)) {
      this.dataSource = this.closeTabService.saveDataForSearchPro;
      this.converts();
      return;
    }
    if (MathS.isNull(this.searchReq)) {
      this.showSearchOptionsDialog();
      this.toDefaultVals();
    }
    else
      this.connectToServer();
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  toDefaultVals = () => {
    this.dataSource = [];
  }

  showSearchOptionsDialog = () => {
    this.ref = this.dialogService.open(SearchDgComponentComponent, {
      rtl: true,
      width: '90%'
    })
    this.ref.onClose.subscribe((res) => {
      if (res) {
        this.searchReq = res;
        this.connectToServer();
      }
    });
  }
  getReadingReportTitles = async ($event) => {
    const a = await this.searchService.postById(ENInterfaces.ReadingReportTitles, $event)
    if (a.length) {
      this.searchService.showResDialog(a, false, EN_messages.insert_rrDetails);
      return;
    }
    this.searchService.snackEmptyValue();
  }
}
