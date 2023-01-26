import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { IReadingReportKarkard } from 'interfaces/ireports';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-rr-fragment',
  templateUrl: './rr-fragment.component.html',
  styleUrls: ['./rr-fragment.component.scss']
})
export class RrFragmentComponent extends FactoryONE {
  dataSource: IReadingReportKarkard[] = [];

  _selectedKindId: string = '';
  _years: ITitleValue[] = [];

  zoneDictionary: IDictionaryManager[] = [];
  fragmentByZoneDictionary: IDictionaryManager[] = [];

  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForRRFragment = null;
      this.verification();
    }
    if (this.closeTabService.saveDataForRRFragment) {
      this.dataSource = this.closeTabService.saveDataForRRFragment;
      this.setGetRanges();
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
    if (this._selectedKindId)
      this.readingPeriodDictionary = await this.readingReportManagerService.getReadingPeriodDictionary(this._selectedKindId);
  }
  getFragmentByZone = async () => {
    if (this.readingReportManagerService.rrFragmentKarkardReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.getFragmentMasterByZoneDictionary(this.readingReportManagerService.rrFragmentKarkardReq.zoneId);
  }
  validation = (): boolean => {
    console.log(this.readingReportManagerService.rrFragmentKarkardReq);

    return this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.rrFragmentKarkardReq, this.readingReportManagerService._isOrderByDate);
  }
  verification = async () => {
    if (this.validation())
      this.connectToServer();
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.portRRTest(ENInterfaces.ListKarkardByFragment, this.readingReportManagerService.rrFragmentKarkardReq);
    this.setGetRanges();
    this.closeTabService.saveDataForRRFragment = this.dataSource;
  }
  refreshTable = () => {
    if (this.validation())
      this.connectToServer();
  }
  private setGetRanges = () => {
    this.dataSource.forEach(item => {
      item.duration = parseFloat(MathS.getRange(item.duration));
    })
  }


}