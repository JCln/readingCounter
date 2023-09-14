import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-rr-pre-number-shown',
  templateUrl: './rr-pre-number-shown.component.html',
  styleUrls: ['./rr-pre-number-shown.component.scss'],
  animations: [transitionAnimation]
})
export class RrPreNumberShownComponent extends AllListsFactory {
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
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionary(this.readingReportManagerService.preNumberShownReq._selectedKindId);
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.preNumberShownReq, this.readingReportManagerService._isOrderByDate);
    if (temp)
      this.connectToServer();
  }
  converts = async () => {
    const tempZone: number = parseInt(this.closeTabService.saveDataForRRPreNumShown[0].zoneId.toString());
    this.counterStateDictionary = await this.readingReportManagerService.dictionaryWrapperService.getCounterStateByZoneIdDictionary(tempZone);
    this.counterStateByCodeDictionary = await this.readingReportManagerService.dictionaryWrapperService.getCounterStateByCodeDictionary(tempZone);
    this.deleteDictionary = this.listManagerService.getDeleteDictionary();
    this.karbariDictionaryCode = await this.readingReportManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.qotrDictionary = await this.readingReportManagerService.dictionaryWrapperService.getQotrDictionary();

    this.closeTabService.saveDataForRRPreNumShown =
      Converter.convertIdsToTitles(
        this.closeTabService.saveDataForRRPreNumShown,
        {
          deleteDictionary: this.deleteDictionary,
          counterStateDictionary: this.counterStateDictionary,
          counterStateByCodeDictionary: this.counterStateByCodeDictionary,
          karbariDictionaryCode: this.karbariDictionaryCode,
          qotrDictionary: this.qotrDictionary,
        },
        {
          hazf: 'hazf',
          counterStateId: 'counterStateId',
          preCounterStateCode: 'preCounterStateCode',
          possibleKarbariCode: 'possibleKarbariCode',
          qotrCode: 'qotrCode'
        })
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRPreNumShown, this.karbariDictionaryCode, 'karbariCode');

    // this.listManagerService.setDynamicPartRanges(this.closeTabService.saveDataForRRPreNumShown);
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRRPreNumShown = await this.readingReportManagerService.portRRTest(ENInterfaces.ListRRPreNumberShown, this.readingReportManagerService.preNumberShownReq);
    this.listManagerService.makeHadPicturesToBoolean(this.closeTabService.saveDataForRRPreNumShown);
    this.converts();
  }

}
