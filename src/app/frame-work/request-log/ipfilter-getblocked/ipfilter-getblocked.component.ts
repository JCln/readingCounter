import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-ipfilter-getblocked',
  templateUrl: './ipfilter-getblocked.component.html',
  styleUrls: ['./ipfilter-getblocked.component.scss'],
  animations: [transitionAnimation]
})
export class IpfilterGetblockedComponent extends FactoryONE {

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
    this.closeTabService.ipFilterGetBlocked = await this.securityService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.PostIpFilterGetBlocked, this.closeTabService.ipFilterGetBlockedReq);
    this.convertLoginTime();
  }
  verification = async () => {
    const temp = this.securityService.verificationService.verificationDates(this.closeTabService.ipFilterGetBlockedReq);
    if (temp)
      this.connectToServer();
  }
  convertLoginTime = () => {
    this.closeTabService.ipFilterGetBlocked.forEach(item => {
      item.insertDateTime = this.dateJalaliService.getDate(item.insertDateTime) + '   ' + this.dateJalaliService.getTime(item.insertDateTime);
    })
  }

}