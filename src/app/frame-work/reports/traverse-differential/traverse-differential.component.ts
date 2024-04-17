import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, IProvinceHierarchy } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';
import { EN_Routes } from 'interfaces/routes.enum';
import { TreeSelect } from 'primeng/treeselect';

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
  provinceHierarchy: IProvinceHierarchy[] = [];
  @ViewChild('myTreeSelect', { static: false }) myTreeSelect!: TreeSelect;

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public route: ActivatedRoute,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async () => {
    this.closeTabService.getSearchInOrderTo();
    this.provinceHierarchy = await this.readingReportManagerService.dictionaryWrapperService.getProvinceHierarchy();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.traverseDiffrentialDictionary = await this.readingReportManagerService.dictionaryWrapperService.getTraverseDifferentialDictionary();
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
    this.getFragmentByZone();
  }
  routeToChartView = () => {
    this.readingReportManagerService.routeTo(EN_Routes.wrrptsmamtrvchchart);
  }
  getFragmentByZone = async () => {
    if (this.closeTabService.trvchReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getFragmentMasterByZoneIdDictionary(this.closeTabService.trvchReq.zoneId);
  }
  afterZoneChanged() {
    // TODO: CLEAR period dictionaries and selected periodId and kindId values
    this.closeTabService.trvchReq.fragmentMasterIds = [];
    this.readingPeriodDictionary = [];
    this.closeTabService.trvchReq.readingPeriodId = null;
    this.closeTabService.trvchReq._selectedKindId = null;
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.closeTabService.trvchReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    if (this.closeTabService.trvchReq._selectedKindId)
      this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionary(this.closeTabService.trvchReq._selectedKindId);
  }
  validation = (): boolean => {
    return this.readingReportManagerService.verificationService.verificationRRTraverseDifferential(this.closeTabService.trvchReq, this.closeTabService._isOrderByDate);
  }
  verification = async () => {
    this.closeTabService.trvchReq.zoneIds = this.readingReportManagerService.utilsService.getZoneHierarical(this.myTreeSelect.value);
    if (this.validation())
      document.activeElement.id == 'grid_view' ? this.connectToServer() : this.routeToChartView();
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRRTraverseDifferential = await this.readingReportManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ListTraverseDifferential, this.closeTabService.trvchReq);
    this.karbariDictionaryByCode = await this.readingReportManagerService.dictionaryWrapperService.getkarbariCodeDictionary();

    if (this.closeTabService.trvchReq.traverseType == 0) {
      Converter.convertIdToTitle(this.closeTabService.saveDataForRRTraverseDifferential, this.karbariDictionaryByCode, 'newValue');
      Converter.convertIdToTitle(this.closeTabService.saveDataForRRTraverseDifferential, this.karbariDictionaryByCode, 'value');
    }
  }
  refreshTable = () => {
    if (this.validation())
      this.connectToServer();
  }

}
