import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-guilds-params',
  templateUrl: './guilds-params.component.html',
  styleUrls: ['./guilds-params.component.scss'],
  animations: [transitionAnimation]
})
export class GuildsParamsComponent extends FactoryONE {

  zoneDictionary: IDictionaryManager[] = [];
  // karbariByCodeDictionary: IDictionaryManager[] = [];
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
    if (this.readingReportManagerService.guildsWithParamsReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getFragmentMasterByZoneIdDictionary(this.readingReportManagerService.guildsWithParamsReq.zoneId);
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.RRGuildsWithParam = null;
      this.verification();
    }
    this.readingReportManagerService.getSearchInOrderTo();

    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
    this.getFragmentByZone();
  }
  afterZoneChanged() {
    // TODO: CLEAR period dictionaries and selected periodId and kindId values
    this.readingReportManagerService.guildsWithParamsReq.fragmentMasterIds = [];
    this.readingPeriodDictionary = [];
    this.readingReportManagerService.guildsWithParamsReq.readingPeriodId = null;
    this.readingReportManagerService.guildsWithParamsReq._selectedKindId = null;
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.readingReportManagerService.guildsWithParamsReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionaryByZoneAndKind(this.readingReportManagerService.guildsWithParamsReq.zoneId, +this.readingReportManagerService.guildsWithParamsReq._selectedKindId);
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.guildsWithParamsReq, this.readingReportManagerService._isOrderByDate);
    if (temp)
      this.connectToServer();
  }
  connectToServer = async () => {
    this.closeTabService.RRGuildsWithParam = await this.readingReportManagerService.portRRTest(ENInterfaces.postRRGuildWithParams, this.readingReportManagerService.guildsWithParamsReq);
    // this.karbariByCodeDictionary = await this.readingReportManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
    // Converter.convertIdToTitle(this.closeTabService.RRGuildsWithParam, this.karbariByCodeDictionary, 'possibleKarbariCode');
    // Converter.convertIdToTitle(this.closeTabService.RRGuildsWithParam, this.karbariByCodeDictionary, 'karbariCode');
  }

}