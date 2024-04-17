import { TrackingManagerService } from 'services/tracking-manager.service';
import { Component, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, IProvinceHierarchy } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';
import { TreeSelect } from 'primeng/treeselect';

@Component({
  selector: 'app-user-karkard',
  templateUrl: './user-karkard.component.html',
  styleUrls: ['./user-karkard.component.scss'],
  animations: [transitionAnimation]
})
export class UserKarkardComponent extends FactoryONE {
  trackingStatesDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  provinceHierarchy: IProvinceHierarchy[] = [];
  @ViewChild('myTreeSelect', { static: false }) myTreeSelect!: TreeSelect;
selectedZoneIds= [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService
  ) {
    super();
  }

  classWrapper = async () => {
    this.provinceHierarchy = await this.readingReportManagerService.dictionaryWrapperService.getProvinceHierarchy();
    this.trackingStatesDictionary = await this.readingReportManagerService.dictionaryWrapperService.getTrackingStatesDictionary();
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
  }
  callAPI = async () => {
    this.closeTabService.saveDataForUserKarkard = await this.readingReportManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.trackingUserKarkard, this.closeTabService.userKarkardReq);
  }
  verification = async () => {
    this.closeTabService.userKarkardReq.zoneIds = this.readingReportManagerService.utilsService.getZoneHierarical(this.myTreeSelect.value);
    const temp = this.readingReportManagerService.verificationService.verificationUserKarkard(this.closeTabService.userKarkardReq);
    if (temp)
      this.callAPI();
  }

}
