import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENGroupByNames } from 'interfaces/enums.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
  animations: [transitionAnimation]
})
export class MasterComponent extends FactoryONE {
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  aggregateOptions = [
    { field: 'zoneTitle', header: 'ناحیه' },
    { field: 'reportTitle', header: 'عنوان گزارش' },
    { field: 'itemCount', header: 'تعداد' },
  ];
  canShowTable: boolean = true;
  ENGroupByNames = ENGroupByNames;

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async () => {
    this.closeTabService.getSearchInOrderTo();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    // this.refreshTableAfterGrouping(this.closeTabService.offloadedGroupReq._selectedAggregate);
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionary(this.closeTabService.masterReq._selectedKindId);
  }
  callAPI = async () => {
    this.closeTabService.saveDataForRRMaster = await this.readingReportManagerService.portRRTest(ENInterfaces.ReadingReportMasterWithParam, this.closeTabService.masterReq);
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.masterReq, this.closeTabService._isOrderByDate);
    if (temp) {
      this.callAPI();
    }
  }

}