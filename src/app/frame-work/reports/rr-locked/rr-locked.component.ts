import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { SortEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';

@Component({
  selector: 'app-rr-locked',
  templateUrl: './rr-locked.component.html',
  styleUrls: ['./rr-locked.component.scss']
})
export class RrLockedComponent extends AllListsFactory {
  isCollapsed: boolean = false;
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];

  zoneDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  deleteDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];

  dataSource: IOnOffLoadFlat[] = [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public dialogService: DialogService,
    private closeTabService: CloseTabService,
    public listManagerService: ListManagerService
  ) {
    super(dialogService, listManagerService);
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.verification();
    }
    if (this.closeTabService.saveDataForRRLocked) {
      this.dataSource = this.closeTabService.saveDataForRRLocked;
      this.converts();
    }
    this.readingReportManagerService.getSearchInOrderTo();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
    this.receiveYear();
  }
  converts = async () => {
    const tempZone: number = parseInt(this.dataSource[0].zoneId.toString());
    if (tempZone) {
      this.counterStateDictionary = await this.readingReportManagerService.getCounterStateByZoneDictionary(tempZone);
      this.counterStateByCodeDictionary = await this.readingReportManagerService.getCounterStateByCodeDictionary(tempZone);
    }
    this.deleteDictionary = this.listManagerService.getDeleteDictionary();
    this.karbariDictionary = await this.readingReportManagerService.getKarbariDictionary();
    this.karbariDictionaryCode = await this.readingReportManagerService.getKarbariDictionaryCode();
    this.qotrDictionary = await this.readingReportManagerService.getQotrDictionary();

    Converter.convertIdToTitle(this.dataSource, this.deleteDictionary, 'hazf');
    Converter.convertIdToTitle(this.dataSource, this.counterStateDictionary, 'counterStateId');
    Converter.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'possibleKarbariCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');

    this.listManagerService.setDynamicPartRanges(this.dataSource);
  }
  receiveYear = () => {
    this._years = this.readingReportManagerService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.getReadingPeriodDictionary(this._selectedKindId);
  }
  verification = async () => {    
    const temp = this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.lockedReq, this.readingReportManagerService._isOrderByDate);
    if (temp)
      this.connectToServer();
  }

  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.portRRTest(ENInterfaces.ListRRLocked, this.readingReportManagerService.lockedReq);
    this.listManagerService.makeHadPicturesToBoolean(this.dataSource);
    this.converts();
    this.closeTabService.saveDataForRRLocked = this.dataSource;
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
