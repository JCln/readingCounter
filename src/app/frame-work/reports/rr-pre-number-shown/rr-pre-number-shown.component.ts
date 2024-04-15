import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
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
  highLowStateDictionary: IDictionaryManager[] = [];
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

  classWrapper = async () => {
    if (!MathS.isNull(this.closeTabService.saveDataForRRPreNumShown)) {
      this.converts();
    }
    this.closeTabService.getSearchInOrderTo();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
  }
  afterZoneChanged() {
    // TODO: CLEAR period dictionaries and selected periodId and kindId values
    this.readingPeriodDictionary = [];
    this.closeTabService.preNumberShownReq.readingPeriodId = null;
    this.closeTabService.preNumberShownReq._selectedKindId = null;
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.closeTabService.preNumberShownReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionaryByZoneAndKind(this.closeTabService.preNumberShownReq.zoneId, +this.closeTabService.preNumberShownReq._selectedKindId);
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRRPreNumShown = await this.readingReportManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ListRRPreNumberShown, this.closeTabService.preNumberShownReq);
    this.closeTabService.makeHadPicturesToBoolean(this.closeTabService.saveDataForRRPreNumShown);
    this.converts();
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.preNumberShownReq, this.closeTabService._isOrderByDate);
    if (temp)
      this.connectToServer();
  }
  converts = async () => {
    const tempZone: number = parseInt(this.closeTabService.saveDataForRRPreNumShown[0].zoneId.toString());
    this.counterStateDictionary = await this.readingReportManagerService.dictionaryWrapperService.getCounterStateByZoneIdDictionary(tempZone);
    this.counterStateByCodeDictionary = await this.readingReportManagerService.dictionaryWrapperService.getCounterStateByCodeDictionary(tempZone);
    this.deleteDictionary = this.listManagerService.getDeleteDictionary();
    this.highLowStateDictionary = this.listManagerService.getHighLowDictionary();
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
          qotrDictionary: this.qotrDictionary
        },
        {
          hazf: 'hazf',
          counterStateId: 'counterStateId',
          preCounterStateCode: 'preCounterStateCode',
          possibleKarbariCode: 'possibleKarbariCode',
          qotrCode: 'qotrCode'
        })
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRPreNumShown, this.karbariDictionaryCode, 'karbariCode');
    this.listManagerService.setDynamicPartRanges(this.closeTabService.saveDataForRRPreNumShown);
  }

}
