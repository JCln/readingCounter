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

  classWrapper = async () => {
    this.closeTabService.getSearchInOrderTo();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
    this.getFragmentByZone();
  }
  getFragmentByZone = async () => {
    if (this.closeTabService.traverseReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getFragmentMasterByZoneIdDictionary(this.closeTabService.traverseReq.zoneId);
  }
  afterZoneChanged() {
    // TODO: CLEAR period dictionaries and selected periodId and kindId values
    this.closeTabService.traverseReq.fragmentMasterIds = [];
    this.readingPeriodDictionary = [];
    this.closeTabService.traverseReq.readingPeriodId = null;
    this.closeTabService.traverseReq._selectedKindId = null;
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.closeTabService.traverseReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionaryByZoneAndKind(this.closeTabService.traverseReq.zoneId, +this.closeTabService.traverseReq._selectedKindId);
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRRTraverse = await this.readingReportManagerService.portRRTest(ENInterfaces.ListTraverse, this.closeTabService.traverseReq);
    this.karbariByCodeDictionary = await this.readingReportManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRTraverse, this.karbariByCodeDictionary, 'possibleKarbariCode');
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRTraverse, this.karbariByCodeDictionary, 'karbariCode');
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.traverseReq, this.closeTabService._isOrderByDate);
    if (temp)
      this.connectToServer();
  }

}
