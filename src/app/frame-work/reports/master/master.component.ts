import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENGroupByNames } from 'interfaces/enums.enum';
import { IDictionaryManager, IProvinceHierarchy } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
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
  provinceHierarchy: IProvinceHierarchy[] = [];
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
    this.provinceHierarchy = await this.readingReportManagerService.dictionaryWrapperService.getProvinceHierarchy();
    // this.refreshTableAfterGrouping(this.closeTabService.offloadedGroupReq._selectedAggregate);
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionary(this.closeTabService.masterReq._selectedKindId);
  }
  callAPI = async () => {
    this.closeTabService.masterReq.selectedZoneIds = [];
    this.closeTabService.saveDataForRRMaster = await this.readingReportManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ReadingReportMasterWithParam, this.closeTabService.masterReq);
  }
  verification = async () => {
    this.closeTabService.masterReq.zoneIds = this.readingReportManagerService.utilsService.getZoneHierarical(this.closeTabService.masterReq.selectedZoneIds);
    if (this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.masterReq, this.closeTabService._isOrderByDate))
      this.callAPI();
  }

}