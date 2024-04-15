import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, IProvinceHierarchy } from 'interfaces/ioverall-config';
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
  fragmentByZoneDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  provinceHierarchy: IProvinceHierarchy[] = [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  getFragmentByZone = async () => {
    if (this.closeTabService.guildsWithParamsReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getFragmentMasterByZoneIdDictionary(this.closeTabService.guildsWithParamsReq.zoneId);
  }
  classWrapper = async () => {
    this.closeTabService.getSearchInOrderTo();
    this.provinceHierarchy = await this.readingReportManagerService.dictionaryWrapperService.getProvinceHierarchy();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
    this.getFragmentByZone();
  }
  afterZoneChanged() {
    // TODO: CLEAR period dictionaries and selected periodId and kindId values
    this.closeTabService.guildsWithParamsReq.fragmentMasterIds = [];
    this.readingPeriodDictionary = [];
    this.closeTabService.guildsWithParamsReq.readingPeriodId = null;
    this.closeTabService.guildsWithParamsReq._selectedKindId = null;
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.closeTabService.guildsWithParamsReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionaryByZoneAndKind(this.closeTabService.guildsWithParamsReq.zoneId, +this.closeTabService.guildsWithParamsReq._selectedKindId);
  }
  verification = async () => {
    this.closeTabService.guildsWithParamsReq.zoneIds = this.readingReportManagerService.utilsService.getZoneHierarical(this.closeTabService.guildsWithParamsReq.selectedZoneIds);
    const temp = this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.guildsWithParamsReq, this.closeTabService._isOrderByDate);
    if (temp)
      this.callAPI();
  }
  callAPI = async () => {
    this.closeTabService.guildsWithParamsReq.selectedZoneIds = [];
    this.closeTabService.RRGuildsWithParam = await this.readingReportManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.postRRGuildWithParams, this.closeTabService.guildsWithParamsReq);
    // this.karbariByCodeDictionary = await this.readingReportManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
    // Converter.convertIdToTitle(this.closeTabService.RRGuildsWithParam, this.karbariByCodeDictionary, 'possibleKarbariCode');
    // Converter.convertIdToTitle(this.closeTabService.RRGuildsWithParam, this.karbariByCodeDictionary, 'karbariCode');
  }

}