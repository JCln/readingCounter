import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  animations: [transitionAnimation]
})
export class DetailsComponent extends FactoryONE {

  _selectedKindId: string = '';
  _years: ITitleValue[] = [];
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

  getFragmentByZone = async () => {
    if (this.readingReportManagerService.detailsReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getFragmentMasterByZoneIdDictionary(this.readingReportManagerService.detailsReq.zoneId);
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForRRDetails = null;
      this.verification();
    }
    this.readingReportManagerService.getSearchInOrderTo();

    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
    this.receiveYear();
    this.getFragmentByZone();
  }
  receiveYear = () => {
    this._years = this.readingReportManagerService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionary(this._selectedKindId);
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.detailsReq, this.readingReportManagerService._isOrderByDate);
    if (temp)
      this.connectToServer();
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRRDetails = await this.readingReportManagerService.portRRTest(ENInterfaces.ReadingReportDETAILSWithParam, this.readingReportManagerService.detailsReq);
    this.karbariByCodeDictionary = await this.readingReportManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRDetails, this.karbariByCodeDictionary, 'possibleKarbariCode');
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRDetails, this.karbariByCodeDictionary, 'karbariCode');
  }

}
