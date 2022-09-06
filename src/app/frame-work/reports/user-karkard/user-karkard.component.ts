import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IUserKarkard } from 'interfaces/ireports';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-user-karkard',
  templateUrl: './user-karkard.component.html',
  styleUrls: ['./user-karkard.component.scss']
})
export class UserKarkardComponent extends FactoryONE {
  dataSource: IUserKarkard[] = [];
  trackingStatesDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    private closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForUserKarkard = null;
      this.verification();
    }
    if (this.closeTabService.saveDataForUserKarkard) {
      this.dataSource = this.closeTabService.saveDataForUserKarkard;
    }
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.portRRTest(ENInterfaces.trackingUserKarkard, this.readingReportManagerService.userKarkardReq);
    this.trackingStatesDictionary = await this.readingReportManagerService.getTrackingStatesDictionary();
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();

    this.closeTabService.saveDataForUserKarkard = this.dataSource;
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationUserKarkard(this.readingReportManagerService.userKarkardReq);
    if (temp)
      this.connectToServer();
  }
}
