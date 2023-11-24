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
  rowGroupMetadata: any;
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

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForRRMaster = null;
      this.verification();
    }

    this.readingReportManagerService.getSearchInOrderTo();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    // this.refreshTableAfterGrouping(this.closeTabService.offloadedGroupReq._selectedAggregate);
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionary(this.readingReportManagerService.masterReq._selectedKindId);
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.masterReq, this.readingReportManagerService._isOrderByDate);
    if (temp) {
      this.connectToServer();
    }
  }

  connectToServer = async () => {
    this.closeTabService.saveDataForRRMaster = await this.readingReportManagerService.portRRTest(ENInterfaces.ReadingReportMasterWithParam, this.readingReportManagerService.masterReq);
  }

}