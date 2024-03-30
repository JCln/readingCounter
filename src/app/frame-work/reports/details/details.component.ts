import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  animations: [transitionAnimation]
})
export class DetailsComponent extends FactoryONE {

  zoneDictionary: IDictionaryManager[] = [];
  karbariByCodeDictionary: IDictionaryManager[] = [];
  fragmentByZoneDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];


  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  getFragmentByZone = async () => {
    if (this.closeTabService.detailsReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getFragmentMasterByZoneIdDictionary(this.closeTabService.detailsReq.zoneId);
  }
  classWrapper = async () => {
    this.closeTabService.getSearchInOrderTo();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
    this.getReadingPeriod();
    this.getFragmentByZone();
  }
  afterZoneChanged() {
    // TODO: CLEAR period dictionaries and selected periodId and kindId values
    this.closeTabService.detailsReq.fragmentMasterIds = [];
    this.readingPeriodDictionary = [];
    this.closeTabService.detailsReq.readingPeriodId = null;
    this.closeTabService.detailsReq._selectedKindId = null;
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.closeTabService.detailsReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    if (this.closeTabService.detailsReq._selectedKindId)
      this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionaryByZoneAndKind(this.closeTabService.detailsReq.zoneId, +this.closeTabService.detailsReq._selectedKindId);
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.detailsReq, this.closeTabService._isOrderByDate);
    if (temp)
      this.callAPI();
  }
  callAPI = async () => {
    this.closeTabService.saveDataForRRDetails = await this.readingReportManagerService.portRRTest(ENInterfaces.ReadingReportDETAILSWithParam, this.closeTabService.detailsReq);
    this.karbariByCodeDictionary = await this.readingReportManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRDetails, this.karbariByCodeDictionary, 'possibleKarbariCode');
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRDetails, this.karbariByCodeDictionary, 'karbariCode');
  }

}
