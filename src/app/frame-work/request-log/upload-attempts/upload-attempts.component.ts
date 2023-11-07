import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-upload-attempts',
  templateUrl: './upload-attempts.component.html',
  styleUrls: ['./upload-attempts.component.scss'],
  animations: [transitionAnimation]
})
export class UploadAttemptsComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService,
    public dateJalaliService: DateJalaliService
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
  convertDateTime = () => {
    this.closeTabService.uploadAttempts.forEach(item => {
      item.insertDateTime = this.dateJalaliService.getDate(item.insertDateTime) + '   ' + this.dateJalaliService.getTime(item.insertDateTime);
    })
  }
  connectToServer = async () => {
    this.closeTabService.uploadAttempts = await this.securityService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.requestLogUploadAttempts, this.closeTabService.uploadAttemptsReq);
    this.convertDateTime();
  }
  verification = async () => {
    const temp = this.securityService.verificationDates(this.closeTabService.uploadAttemptsReq);
    if (temp)
      this.connectToServer();
  }

}