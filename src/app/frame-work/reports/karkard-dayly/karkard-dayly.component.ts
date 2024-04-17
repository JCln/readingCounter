import { Component, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, IProvinceHierarchy } from 'interfaces/ioverall-config';
import { TreeSelect } from 'primeng/treeselect';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { transitionAnimation } from 'src/app/directives/animation.directive';


@Component({
  selector: 'app-karkard-dayly',
  templateUrl: './karkard-dayly.component.html',
  styleUrls: ['./karkard-dayly.component.scss'],
  animations: [transitionAnimation]
})
export class KarkardDaylyComponent extends FactoryONE {
  karbariDictionary: IDictionaryManager[] = [];
  fragmentByZoneDictionary: IDictionaryManager[] = [];
  provinceHierarchy: IProvinceHierarchy[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  @ViewChild('myTreeSelect', { static: false }) myTreeSelect!: TreeSelect;
selectedZoneIds= [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async () => {
    if (this.closeTabService.saveDataForRRkarkardDaily) {
      this.setGetRanges();
    }
    this.closeTabService.getSearchInOrderTo();
    this.provinceHierarchy = await this.readingReportManagerService.dictionaryWrapperService.getProvinceHierarchy();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.getFragmentByZone();
  }
  getFragmentByZone = async () => {
    if (this.closeTabService.karkardDailyReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getFragmentMasterByZoneIdDictionary(this.closeTabService.karkardDailyReq.zoneId);
  }
  afterZoneChanged() {
    // TODO: CLEAR period dictionaries and selected periodId and kindId values
    this.closeTabService.karkardDailyReq.fragmentMasterIds = [];
    this.readingPeriodDictionary = [];
    this.closeTabService.karkardDailyReq.readingPeriodId = null;
    this.closeTabService.karkardDailyReq._selectedKindId = null;
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.closeTabService.karkardDailyReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    if (this.closeTabService.karkardDailyReq._selectedKindId)
      this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionary(this.closeTabService.karkardDailyReq._selectedKindId);
  }
  verification = async () => {
    this.closeTabService.karkardDailyReq.zoneIds = this.readingReportManagerService.utilsService.getZoneHierarical(this.myTreeSelect.value);
    const temp = this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.karkardDailyReq, this.closeTabService._isOrderByDate);
    if (temp)
      this.connectToServer();
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRRkarkardDaily = await this.readingReportManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ListKarkardDaily, this.closeTabService.karkardDailyReq);
    this.setGetRanges();
  }
  private setGetRanges = () => {
    this.closeTabService.saveDataForRRkarkardDaily.forEach(item => {
      item.duration = parseFloat(MathS.getRange(item.duration));
    })
  }
}
