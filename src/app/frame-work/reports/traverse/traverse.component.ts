import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { IReadingReportTraverse } from 'interfaces/ireports';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-traverse',
  templateUrl: './traverse.component.html',
  styleUrls: ['./traverse.component.scss']
})
export class TraverseComponent extends FactoryONE {
  isCollapsed: boolean = false;
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  karbariByCodeDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];

  dataSource: IReadingReportTraverse[] = [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,

    private closeTabService: CloseTabService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForRRTraverse = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
      this.verification();
    }
    if (this.closeTabService.saveDataForRRTraverse) {
      this.dataSource = this.closeTabService.saveDataForRRTraverse;
    }
    this.readingReportManagerService.getSearchInOrderTo();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
    this.receiveYear();
  }
  receiveYear = () => {
    this._years = this.readingReportManagerService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.getReadingPeriodDictionary(this._selectedKindId);
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.traverseReq, this.readingReportManagerService._isOrderByDate);
    if (temp)
      this.connectToServer();
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.portRRTest(ENInterfaces.ListTraverse, this.readingReportManagerService.traverseReq);
    this.karbariDictionary = await this.readingReportManagerService.getKarbariDictionary();
    this.karbariByCodeDictionary = await this.readingReportManagerService.getKarbariDictionaryCode();
    Converter.convertIdToTitle(this.dataSource, this.karbariByCodeDictionary, 'possibleKarbariCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariByCodeDictionary, 'karbariCode');
    this.closeTabService.saveDataForRRTraverse = this.dataSource;
  }

}
