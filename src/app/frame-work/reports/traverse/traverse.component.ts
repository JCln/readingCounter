import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-traverse',
  templateUrl: './traverse.component.html',
  styleUrls: ['./traverse.component.scss'],
  animations: [transitionAnimation]
})
export class TraverseComponent extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];
  karbariByCodeDictionary: IDictionaryManager[] = [];
  fragmentByZoneDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForRRTraverse = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
      this.verification();
    }
    this.readingReportManagerService.getSearchInOrderTo();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
    this.getFragmentByZone();
  }
  getFragmentByZone = async () => {
    if (this.readingReportManagerService.traverseReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getFragmentMasterByZoneIdDictionary(this.readingReportManagerService.traverseReq.zoneId);
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionary(this.readingReportManagerService.traverseReq._selectedKindId);
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.traverseReq, this.readingReportManagerService._isOrderByDate);
    if (temp)
      this.connectToServer();
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRRTraverse = await this.readingReportManagerService.portRRTest(ENInterfaces.ListTraverse, this.readingReportManagerService.traverseReq);
    this.karbariByCodeDictionary = await this.readingReportManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRTraverse, this.karbariByCodeDictionary, 'possibleKarbariCode');
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRTraverse, this.karbariByCodeDictionary, 'karbariCode');
  }

}
