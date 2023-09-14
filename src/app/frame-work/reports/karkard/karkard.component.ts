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
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForRRKarkard = null;
      this.verification();
    }
    if (this.closeTabService.saveDataForRRKarkard) {
      this.setGetRanges();
    }
    this.readingReportManagerService.getSearchInOrderTo();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
    this.getFragmentByZone();
  }
  getFragmentByZone = async () => {
    if (this.readingReportManagerService.karkardReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getFragmentMasterByZoneIdDictionary(this.readingReportManagerService.karkardReq.zoneId);
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionary(this.readingReportManagerService.karkardReq._selectedKindId);
  }
  validation = (): boolean => {
    return this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.karkardReq, this.readingReportManagerService._isOrderByDate);
  }
  verification = async () => {
    if (this.validation())
      document.activeElement.id === 'grid_view' ? this.connectToServer() : this.routeToChartView();
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRRKarkard = await this.readingReportManagerService.portRRTest(ENInterfaces.ListOFFKarkard, this.readingReportManagerService.karkardReq);
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
