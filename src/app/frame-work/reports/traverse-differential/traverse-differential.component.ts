import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';
import { EN_Routes } from 'interfaces/routes.enum';

@Component({
  selector: 'app-traverse-differential',
  templateUrl: './traverse-differential.component.html',
  styleUrls: ['./traverse-differential.component.scss'],
  animations: [transitionAnimation]
})
export class TraverseDifferentialComponent extends FactoryONE {
  karbariDictionaryByCode: IDictionaryManager[] = [];

  zoneDictionary: IDictionaryManager[] = [];
  fragmentByZoneDictionary: IDictionaryManager[] = [];
  traverseDiffrentialDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];


  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public route: ActivatedRoute,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForRRTraverseDifferential = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
      this.verification();
    }

    this.readingReportManagerService.getSearchInOrderTo();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.traverseDiffrentialDictionary = await this.readingReportManagerService.dictionaryWrapperService.getTraverseDifferentialDictionary();
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
    this.getFragmentByZone();
  }
  routeToChartView = () => {
    this.readingReportManagerService.routeTo(EN_Routes.wrrptsmamtrvchchart);
  }
  getFragmentByZone = async () => {
    if (this.readingReportManagerService.trvchReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getFragmentMasterByZoneIdDictionary(this.readingReportManagerService.trvchReq.zoneId);
  }
  afterZoneChanged() {
    // TODO: CLEAR period dictionaries and selected periodId and kindId values
    this.readingReportManagerService.trvchReq.fragmentMasterIds = [];
    this.readingPeriodDictionary = [];
    this.readingReportManagerService.trvchReq.readingPeriodId = null;
    this.readingReportManagerService.trvchReq._selectedKindId = null;
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.readingReportManagerService.trvchReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionaryByZoneAndKind(this.readingReportManagerService.trvchReq.zoneId, +this.readingReportManagerService.trvchReq._selectedKindId);
  }
  validation = (): boolean => {
    return this.readingReportManagerService.verificationRRTraverseDifferential(this.readingReportManagerService.trvchReq, this.readingReportManagerService._isOrderByDate);
  }
  verification = async () => {
    if (this.validation())
      document.activeElement.id == 'grid_view' ? this.connectToServer() : this.routeToChartView();
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRRTraverseDifferential = await this.readingReportManagerService.portRRTest(ENInterfaces.ListTraverseDifferential, this.readingReportManagerService.trvchReq);
    this.karbariDictionaryByCode = await this.readingReportManagerService.dictionaryWrapperService.getkarbariCodeDictionary();

    if (this.readingReportManagerService.trvchReq.traverseType == 0) {
      Converter.convertIdToTitle(this.closeTabService.saveDataForRRTraverseDifferential, this.karbariDictionaryByCode, 'newValue');
      Converter.convertIdToTitle(this.closeTabService.saveDataForRRTraverseDifferential, this.karbariDictionaryByCode, 'value');
    }
  }
  refreshTable = () => {
    if (this.validation())
      this.connectToServer();
  }

}
