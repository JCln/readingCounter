import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
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
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];

  zoneDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  deleteDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService,
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
      this.closeTabService.saveDataForRRPreNumShown = this.closeTabService.saveDataForRRPreNumShown;
      this.converts();
    }
    this.readingReportManagerService.getSearchInOrderTo();
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
    const temp = this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.preNumberShownReq, this.readingReportManagerService._isOrderByDate);
    if (temp)
      this.connectToServer();
  }
  converts = async () => {
    const tempZone: number = parseInt(this.closeTabService.saveDataForRRPreNumShown[0].zoneId.toString());
    if (tempZone) {
      this.counterStateDictionary = await this.readingReportManagerService.getCounterStateByZoneDictionary(tempZone);
      this.counterStateByCodeDictionary = await this.readingReportManagerService.getCounterStateByCodeDictionary(tempZone);
      Converter.convertIdToTitle(this.closeTabService.saveDataForRRPreNumShown, this.counterStateByCodeDictionary, 'preCounterStateCode');
    }
    this.deleteDictionary = this.listManagerService.getDeleteDictionary();
    this.karbariDictionaryCode = await this.readingReportManagerService.getKarbariDictionaryCode();
    this.qotrDictionary = await this.readingReportManagerService.getQotrDictionary();

    Converter.convertIdToTitle(this.closeTabService.saveDataForRRPreNumShown, this.deleteDictionary, 'hazf');
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRPreNumShown, this.counterStateDictionary, 'counterStateId');
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRPreNumShown, this.karbariDictionaryCode, 'possibleKarbariCode');
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRPreNumShown, this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRPreNumShown, this.qotrDictionary, 'qotrCode');

    this.listManagerService.setDynamicPartRanges(this.closeTabService.saveDataForRRPreNumShown);
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRRPreNumShown = await this.readingReportManagerService.portRRTest(ENInterfaces.ListRRPreNumberShown, this.readingReportManagerService.preNumberShownReq);
    this.listManagerService.makeHadPicturesToBoolean(this.closeTabService.saveDataForRRPreNumShown);
    this.converts();
  }

}
