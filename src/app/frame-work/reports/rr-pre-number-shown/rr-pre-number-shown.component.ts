import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IDictionaryManager, ISearchInOrderTo, ITitleValue } from 'interfaces/ioverall-config';
import { SortEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';

@Component({
  selector: 'app-rr-pre-number-shown',
  templateUrl: './rr-pre-number-shown.component.html',
  styleUrls: ['./rr-pre-number-shown.component.scss']
})
export class RrPreNumberShownComponent extends AllListsFactory {
  isCollapsed: boolean = false;
  searchInOrderTo: ISearchInOrderTo[] = [
    {
      title: 'تاریخ',
      isSelected: true
    },
    {
      title: 'دوره',
      isSelected: false
    }
  ]
  _isOrderByDate: boolean = true;
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];

  zoneDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];

  dataSource: IOnOffLoadFlat[] = [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    private closeTabService: CloseTabService,
    public dialogService: DialogService,
    public listManagerService: ListManagerService
  ) {
    super(dialogService, listManagerService);
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.verification();
    }
    if (this.closeTabService.saveDataForRRPreNumShown) {
      this.dataSource = this.closeTabService.saveDataForRRPreNumShown;
      this.converts();
    }
    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
    this.receiveYear();
  }
  receiveYear = () => {
    this._years = this.readingReportManagerService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.getReadingPeriodDictionary(this._selectedKindId);
  }
  verification = async () => {
    this._isOrderByDate ? (this.readingReportManagerService.preNumberShownReq.readingPeriodId = null, this.readingReportManagerService.preNumberShownReq.year = 0) : (this.readingReportManagerService.preNumberShownReq.fromDate = '', this.readingReportManagerService.preNumberShownReq.toDate = '');
    const temp = this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.preNumberShownReq, this._isOrderByDate);
    if (temp)
      this.connectToServer();
  }
  converts = async () => {
    const tempZone: number = parseInt(this.dataSource[0].zoneId.toString());
    if (tempZone) {
      this.counterStateDictionary = await this.readingReportManagerService.getCounterStateByZoneDictionary(tempZone);
      this.counterStateByCodeDictionary = await this.readingReportManagerService.getCounterStateByCodeDictionary(tempZone);
      Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
    }
    this.karbariDictionary = await this.readingReportManagerService.getKarbariDictionary();
    this.karbariDictionaryCode = await this.readingReportManagerService.getKarbariDictionaryCode();
    this.qotrDictionary = await this.readingReportManagerService.getQotrDictionary();

    // Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    Converter.convertIdToTitle(this.dataSource, this.counterStateDictionary, 'counterStateId');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');

    this.listManagerService.setDynamicPartRanges(this.dataSource);
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.portRRTest(ENInterfaces.ListRRPreNumberShown, this.readingReportManagerService.preNumberShownReq);
    this.converts();
    this.closeTabService.saveDataForRRPreNumShown = this.dataSource;
  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }

}
