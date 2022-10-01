import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { IReadingReportDetails } from 'interfaces/ireports';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent extends FactoryONE {
  dataSource: IReadingReportDetails[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  karbariByCodeDictionary: IDictionaryManager[] = [];

  _selectedKindId: string = '';
  _years: ITitleValue[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];


  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    private closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForRRDetails = null;
      this.verification();
    }
    if (this.closeTabService.saveDataForRRDetails) {
      this.dataSource = this.closeTabService.saveDataForRRDetails;
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
    const temp = this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.detailsReq, this.readingReportManagerService._isOrderByDate);
    if (temp)
      this.connectToServer();
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.portRRTest(ENInterfaces.ReadingReportDETAILSWithParam, this.readingReportManagerService.detailsReq);
    this.karbariDictionary = await this.readingReportManagerService.getKarbariDictionary();// todo remove karbari
    this.karbariByCodeDictionary = await this.readingReportManagerService.getKarbariDictionaryCode();
    Converter.convertIdToTitle(this.dataSource, this.karbariByCodeDictionary, 'possibleKarbariCode');
    Converter.convertIdToTitle(this.dataSource, this.karbariByCodeDictionary, 'karbariCode');
    this.closeTabService.saveDataForRRDetails = this.dataSource;
  }

}
