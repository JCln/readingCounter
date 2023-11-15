import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-ipfilter-get-invalid-time',
  templateUrl: './ipfilter-get-invalid-time.component.html',
  styleUrls: ['./ipfilter-get-invalid-time.component.scss']
})
export class IpfilterGetInvalidTimeComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService,
    private dateJalaliService: DateJalaliService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.ipFilterGetInvalidTime = [];
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
      this.verification();
    }
  }
  connectToServer = async () => {
    this.closeTabService.ipFilterGetInvalidTime = await this.securityService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.PostIpFilterGetInvalidTime, this.closeTabService.ipFilterGetInvalidTimeReq);
    this.convertLoginTime();
  }
  verification = async () => {
    const temp = this.securityService.verificationDates(this.closeTabService.ipFilterGetInvalidTimeReq);
    if (temp)
      this.connectToServer();
  }
  convertLoginTime = () => {
    this.closeTabService.ipFilterGetInvalidTime.forEach(item => {
      item.insertDateTime = this.dateJalaliService.getDate(item.insertDateTime) + '   ' + this.dateJalaliService.getTime(item.insertDateTime);
    })
  }

}