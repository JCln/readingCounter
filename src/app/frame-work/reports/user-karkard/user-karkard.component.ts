import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-user-karkard',
  templateUrl: './user-karkard.component.html',
  styleUrls: ['./user-karkard.component.scss'],
  animations: [transitionAnimation]
})
export class UserKarkardComponent extends FactoryONE {
  trackingStatesDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForUserKarkard = null;
    }
    this.trackingStatesDictionary = await this.readingReportManagerService.getTrackingStatesDictionary();
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();

  }
  connectToServer = async () => {
    this.closeTabService.saveDataForUserKarkard = await this.readingReportManagerService.portRRTest(ENInterfaces.trackingUserKarkard, this.readingReportManagerService.userKarkardReq);
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationUserKarkard(this.readingReportManagerService.userKarkardReq);
    if (temp)
      this.connectToServer();
  }
}
