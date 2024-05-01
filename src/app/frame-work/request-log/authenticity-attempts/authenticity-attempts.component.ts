import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-authenticity-attempts',
  templateUrl: './authenticity-attempts.component.html',
  styleUrls: ['./authenticity-attempts.component.scss'],
  animations: [transitionAnimation]
})
export class AuthenticityAttemptsComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService,
    private dateJalaliService: DateJalaliService
  ) {
    super();
  }

  classWrapper = async () => {
  }
  connectToServer = async () => {
    this.closeTabService.authenticityAttempts = await this.securityService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.policyAuthenticityAttempts, this.closeTabService.authenticityAttemptsReq);
    this.convertLoginTime();
  }
  verification = async () => {
    const temp = this.securityService.verificationService.verificationDates(this.closeTabService.authenticityAttemptsReq);
    if (temp)
      this.connectToServer();
  }
  convertLoginTime = () => {
    this.closeTabService.authenticityAttempts.forEach(item => {
      item.insertDateTime = this.dateJalaliService.getDate(item.insertDateTime) + '   ' + this.dateJalaliService.getTime(item.insertDateTime);
    })
  }

}