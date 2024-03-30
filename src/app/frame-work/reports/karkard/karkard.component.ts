import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { transitionAnimation } from 'src/app/directives/animation.directive';
import { EN_Routes } from 'interfaces/routes.enum';


@Component({
  selector: 'app-karkard',
  templateUrl: './karkard.component.html',
  styleUrls: ['./karkard.component.scss'],
  animations: [transitionAnimation]
})
export class KarkardComponent extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];

  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  fragmentByZoneDictionary: IDictionaryManager[] = [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,

    public closeTabService: CloseTabService,
    public route: ActivatedRoute
  ) {
    super();
  }

  routeToChartView = () => {
    this.readingReportManagerService.routeTo(EN_Routes.wrrptsmamkarkardchart);
  }
  classWrapper = async () => {
    if (!MathS.isNull(this.closeTabService.saveDataForRRKarkard)) {
      this.setGetRanges();
    }
    this.closeTabService.getSearchInOrderTo();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
    this.getFragmentByZone();
  }
  getFragmentByZone = async () => {
    if (this.closeTabService.karkardReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getFragmentMasterByZoneIdDictionary(this.closeTabService.karkardReq.zoneId);
  }
  afterZoneChanged() {
    // TODO: CLEAR period dictionaries and selected periodId and kindId values
    this.closeTabService.karkardReq.fragmentMasterIds = [];
    this.readingPeriodDictionary = [];
    this.closeTabService.karkardReq.readingPeriodId = null;
    this.closeTabService.karkardReq._selectedKindId = null;
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.closeTabService.karkardReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionaryByZoneAndKind(this.closeTabService.karkardReq.zoneId, +this.closeTabService.karkardReq._selectedKindId);
  }
  validation = (): boolean => {
    return this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.karkardReq, this.closeTabService._isOrderByDate);
  }
  verification = async () => {
    if (this.validation())
      document.activeElement.id === 'grid_view' ? this.connectToServer() : this.routeToChartView();
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRRKarkard = await this.readingReportManagerService.portRRTest(ENInterfaces.ListOFFKarkard, this.closeTabService.karkardReq);
    this.setGetRanges();
    this.closeTabService.saveDataForRRKarkard = this.closeTabService.saveDataForRRKarkard;
  }
  refreshTable = () => {
    if (this.validation())
      this.connectToServer();
  }
  private setGetRanges = () => {
    this.closeTabService.saveDataForRRKarkard.forEach(item => {
      item.duration = parseFloat(MathS.getRange(item.duration));
    })
  }

}
