import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
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
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];
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
    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
    this.getFragmentByZone();
    this.receiveYear();
  }
  getFragmentByZone = async () => {
    if (this.readingReportManagerService.karkardReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.getFragmentMasterByZoneDictionary(this.readingReportManagerService.karkardReq.zoneId);
  }
  receiveYear = () => {
    this._years = this.readingReportManagerService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.getReadingPeriodDictionary(this._selectedKindId);
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
