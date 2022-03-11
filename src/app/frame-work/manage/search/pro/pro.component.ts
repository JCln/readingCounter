import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { SearchService } from 'services/search.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

import { MapDgComponent } from '../../list-manager/all/map-dg/map-dg.component';
import { SearchDgComponentComponent } from './search-dg-component/search-dg-component.component';

@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.scss']
})
export class ProComponent extends FactoryONE {

  _empty_message: string = '';

  dataSource: IOnOffLoadFlat[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  ref: DynamicDialogRef;

  constructor(
    private closeTabService: CloseTabService,
    public searchService: SearchService,
    private dialogService: DialogService,
  ) {
    super();
  }

  converts = async () => {
    // this._empty_message = EN_messages.notFound;
    this.counterStateDictionary = await this.searchService.getCounterStateByZoneDictionary(this.closeTabService.saveDataForSearchProReq.zoneId);
    this.counterStateByCodeDictionary = await this.searchService.getCounterStateByCodeDictionary(this.closeTabService.saveDataForSearchProReq.zoneId);
    this.karbariDictionary = await this.searchService.getKarbariDictionary();
    this.karbariDictionaryCode = await this.searchService.getKarbariDictionaryCode();
    this.qotrDictionary = await this.searchService.getQotrDictionary();

    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    Converter.convertIdToTitle(this.dataSource, this.counterStateDictionary, 'counterStateId');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'counterStateCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');
    this.searchService.setDynamicPartRanges(this.dataSource);
    this.searchService.makeHadPicturesToBoolean(this.dataSource);
  }
  classWrapper = async (canRefresh?: boolean) => {

    if (canRefresh) {
      this.closeTabService.saveDataForSearchPro = null;
    }
    if (this.closeTabService.saveDataForSearchPro) {
      this.dataSource = this.closeTabService.saveDataForSearchPro;
    }
    else {
      if (this.closeTabService.saveDataForSearchProReq) {
        this.dataSource = await this.searchService.doSearch(ENInterfaces.ListSearchPro, this.closeTabService.saveDataForSearchProReq);
        this.closeTabService.saveDataForSearchPro = this.dataSource;
      }
      else {
        this.showSearchOptionsDialog();
      }
    }

    this.converts();

    // if (canRefresh) {
    //   // this.nullSavedSource();
    //   this.connectToServer();
    // }
    // if (!MathS.isNull(this.closeTabService.saveDataForSearchPro)) {
    //   this.dataSource = this.closeTabService.saveDataForSearchPro;
    //   this.converts();
    //   return;
    // }
    // if (MathS.isNull(this.searchReq)) {
    //   this.showSearchOptionsDialog();
    //   this.toDefaultVals();
    // }
    // else
    //   this.connectToServer();
  }
  // toDefaultVals = () => {
  //   this.dataSource = [];
  // }

  showSearchOptionsDialog = () => {
    this.ref = this.dialogService.open(SearchDgComponentComponent, {
      rtl: true,
      width: '90%'
    })
    this.ref.onClose.subscribe((res) => {
      if (res) {
        this.closeTabService.saveDataForSearchProReq = res;
        this.classWrapper();
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
  openMapDialog = (dataSource: any) => {
    if (this.searchService.showInMapSingleValidation(dataSource))
      this.ref = this.dialogService.open(MapDgComponent, {
        data: dataSource,
        rtl: true,
        width: '70%'
      })
    this.ref.onClose.subscribe(async res => {
      if (res)
        this.classWrapper();
    });
  }
}
