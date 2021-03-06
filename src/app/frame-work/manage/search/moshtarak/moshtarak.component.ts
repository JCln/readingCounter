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
import { MathS } from 'src/app/classes/math-s';
import { Search } from 'src/app/classes/search';

import { MapDgComponent } from '../../list-manager/all/map-dg/map-dg.component';

@Component({
  selector: 'app-moshtarak',
  templateUrl: './moshtarak.component.html',
  styleUrls: ['./moshtarak.component.scss']
})

export class MoshtarakComponent extends FactoryONE {
  dataSource: IOnOffLoadFlat[] = [];
  searchType: Search[];
  searchByText: string = '';
  ref: DynamicDialogRef;
  _searchByInfo: string = 'مقدار';

  zoneDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];

  constructor(

    private closeTabService: CloseTabService,
    public searchService: SearchService,
    private dialogService: DialogService
  ) {
    super();
  }

  converts = async () => {
    if (this.searchService.searchReqMosh.zoneId) {
      this.counterStateByCodeDictionary = await this.searchService.getCounterStateByCodeDictionary(this.searchService.searchReqMosh.zoneId);
      Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'counterStateCode');
      Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
    }
    this.counterStateDictionary = await this.searchService.getCounterStateDictionary();
    this.karbariDictionary = await this.searchService.getKarbariDictionary();
    this.karbariDictionaryCode = await this.searchService.getKarbariDictionaryCode();
    this.qotrDictionary = await this.searchService.getQotrDictionary();

    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');
    Converter.convertIdToTitle(this.dataSource, this.counterStateDictionary, 'counterStateId');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'counterStateCode');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');

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
        this.refreshTable();
    });
  }
  getZoneDictionary = async () => {
    this.zoneDictionary = JSON.parse(JSON.stringify(await this.searchService.getZoneDictionary()));
    if (this.zoneDictionary[0].id !== 0)
      this.zoneDictionary.unshift({ id: 0, title: 'مناطق مجاز', isSelected: true })
  }


}
