import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-download-attempts',
  templateUrl: './download-attempts.component.html',
  styleUrls: ['./download-attempts.component.scss'],
  animations: [transitionAnimation]
})
export class DownloadAttemptsComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService
  ) {
    super();
  }

  classWrapper = async () => {
  }
  connectToServer = async () => {
    this.closeTabService.downloadAttempts = await this.securityService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.requestLogDownloadAttempts, this.closeTabService.downloadAttemptsReq);
  }
  verification = async () => {
    const temp = this.securityService.verificationDates(this.closeTabService.downloadAttemptsReq);
    if (temp)
      this.connectToServer();
  }

}