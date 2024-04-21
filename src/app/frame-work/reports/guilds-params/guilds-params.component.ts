import { Component, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, IProvinceHierarchy } from 'interfaces/ioverall-config';
import { TreeSelect } from 'primeng/treeselect';
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
  @ViewChild('myTreeSelect', { static: false }) myTreeSelect!: TreeSelect;
  selectedZoneIds = [];
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
    if (this.myTreeSelect.value)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.getFragmentMastersInZones(this.myTreeSelect.value);
  }
  classWrapper = async () => {
    this.closeTabService.getSearchInOrderTo();
    this.provinceHierarchy = await this.readingReportManagerService.dictionaryWrapperService.getProvinceHierarchy();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.getFragmentByZone();
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.closeTabService.guildsWithParamsReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    if (this.closeTabService.guildsWithParamsReq._selectedKindId)
      this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionary(this.closeTabService.guildsWithParamsReq._selectedKindId);
  }
  verification = async () => {
    this.closeTabService.guildsWithParamsReq.zoneIds = this.readingReportManagerService.utilsService.getZoneHierarical(this.myTreeSelect.value);
    const temp = this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.guildsWithParamsReq, this.closeTabService._isOrderByDate);
    if (temp)
      this.callAPI();
  }
  callAPI = async () => {
    this.closeTabService.RRGuildsWithParam = await this.readingReportManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.postRRGuildWithParams, this.closeTabService.guildsWithParamsReq);
    // this.karbariByCodeDictionary = await this.readingReportManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
    // Converter.convertIdToTitle(this.closeTabService.RRGuildsWithParam, this.karbariByCodeDictionary, 'possibleKarbariCode');
    // Converter.convertIdToTitle(this.closeTabService.RRGuildsWithParam, this.karbariByCodeDictionary, 'karbariCode');
  }

}