import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-upload-attempts',
  templateUrl: './upload-attempts.component.html',
  styleUrls: ['./upload-attempts.component.scss']
})
export class UploadAttemptsComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.uploadAttempts = [];
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
      this.verification();
    }
  }
  connectToServer = async () => {
    this.closeTabService.uploadAttempts = await this.securityService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.requestLogUploadAttempts, this.closeTabService.uploadAttemptsReq);
  }
  verification = async () => {
    const temp = this.securityService.verificationDates(this.closeTabService.uploadAttemptsReq);
    if (temp)
      this.connectToServer();
  }

}