import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { IReadingReportTraverseDifferentialRes } from 'interfaces/ireports';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { EN_Routes } from 'src/app/interfaces/routes.enum';

@Component({
  selector: 'app-traverse-differential',
  templateUrl: './traverse-differential.component.html',
  styleUrls: ['./traverse-differential.component.scss']
})
export class TraverseDifferentialComponent extends FactoryONE {
  dataSource: IReadingReportTraverseDifferentialRes[] = [];
  karbariDictionaryByCode: IDictionaryManager[] = [];

  _selectedKindId: string = '';
  _years: ITitleValue[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  traverseDiffrentialDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];


  constructor(
    public readingReportManagerService: ReadingReportManagerService,

    public route: ActivatedRoute,
    private closeTabService: CloseTabService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForRRTraverseDifferential = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
      this.verification();
    }
    if (this.closeTabService.saveDataForRRTraverseDifferential) {
      this.dataSource = this.closeTabService.saveDataForRRTraverseDifferential;
    }
    this.readingReportManagerService.getSearchInOrderTo();

    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.traverseDiffrentialDictionary = await this.readingReportManagerService.getTraverseDiffrentialDictionary();
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
    this.receiveYear();
  }
  routeToChartView = () => {
    this.readingReportManagerService.routeTo(EN_Routes.wrrptsmamtrvchchart);
  }
  receiveYear = () => {
    this._years = this.readingReportManagerService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.getReadingPeriodDictionary(this._selectedKindId);
  }
  validation = (): boolean => {
    return this.readingReportManagerService.verificationRRTraverseDifferential(this.readingReportManagerService.trvchReq, this.readingReportManagerService._isOrderByDate);
  }
  verification = async () => {
    if (this.validation())
      document.activeElement.id == 'grid_view' ? this.connectToServer() : this.routeToChartView();
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.portRRTest(ENInterfaces.ListTraverseDifferential, this.readingReportManagerService.trvchReq);
    this.karbariDictionaryByCode = await this.readingReportManagerService.getKarbariDictionaryCode();

    if (this.readingReportManagerService.trvchReq.traverseType == 0) {
      Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryByCode, 'newValue');
      Converter.convertIdToTitle(this.dataSource, this.karbariDictionaryByCode, 'value');
    }
    this.closeTabService.saveDataForRRTraverseDifferential = this.dataSource;
  }
  refreshTable = () => {
    if (this.validation())
      this.connectToServer();
  }

}
