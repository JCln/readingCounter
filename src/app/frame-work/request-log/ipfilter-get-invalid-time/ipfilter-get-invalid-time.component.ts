import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-ipfilter-get-invalid-time',
  templateUrl: './ipfilter-get-invalid-time.component.html',
  styleUrls: ['./ipfilter-get-invalid-time.component.scss'],
  animations: [transitionAnimation]
})
export class IpfilterGetInvalidTimeComponent extends FactoryONE {

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
    this.closeTabService.ipFilterGetInvalidTime = await this.securityService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.PostIpFilterGetInvalidTime, this.closeTabService.ipFilterGetInvalidTimeReq);
    this.convertLoginTime();
  }
  verification = async () => {
    const temp = this.securityService.verificationService.verificationDates(this.closeTabService.ipFilterGetInvalidTimeReq);
    if (temp)
      this.connectToServer();
  }
  convertLoginTime = () => {
    this.closeTabService.ipFilterGetInvalidTime.forEach(item => {
      item.insertDateTime = this.dateJalaliService.getDate(item.insertDateTime) + '   ' + this.dateJalaliService.getTime(item.insertDateTime);
    })
  }

}