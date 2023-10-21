import { SecurityService } from 'services/security.service';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IUserLoggins } from 'interfaces/iuser-manager';
import { DateJalaliService } from 'services/date-jalali.service';
import { FactoryONE } from 'src/app/classes/factory';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { Converter } from 'src/app/classes/converter';
import { EN_messages } from 'interfaces/enums.enum';

@Component({
  selector: 'app-user-loggins',
  templateUrl: './user-loggins.component.html',
  styleUrls: ['./user-loggins.component.scss']
})
export class UserLogginsComponent extends FactoryONE {
  dataSource: IUserLoggins[];
  logoutReasonDictionary: IDictionaryManager[] = [];
  invalidLoginReasonDictionary: IDictionaryManager[] = [];

  constructor(
    public securityService: SecurityService,
    private dateJalaliService: DateJalaliService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (!this.securityService.userLoggins_pageSign.GUid) {
      this.securityService.utilsService.backToPreviousPage();
    }
    else {
      this.dataSource = await this.securityService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.userLOGINS, this.securityService.userLoggins_pageSign.GUid);
      this.logoutReasonDictionary = this.securityService.utilsService.getLogoutReason();
      this.invalidLoginReasonDictionary = this.securityService.utilsService.getInvalidLoginReason();
      this.convertLoginTime();
      Converter.convertIdToTitle(this.dataSource, this.logoutReasonDictionary, 'logoutReasonId');
      Converter.convertIdToTitle(this.dataSource, this.invalidLoginReasonDictionary, 'invalidLoginReasonId');
    }
  }

  convertLoginTime = () => {
    this.dataSource.forEach(item => {
      item.loginDateTime = this.dateJalaliService.getDate(item.loginDateTime) + '   ' + this.dateJalaliService.getTime(item.loginDateTime);
      item.twoStepType = item.twoStepExpireDateTime ? EN_messages.twoStepTypeByTwo : EN_messages.twoStepTypeByUserPass;
      if (item.logoutDateTime)
        item.logoutDateTime = this.dateJalaliService.getDate(item.logoutDateTime) + '   ' + this.dateJalaliService.getTime(item.logoutDateTime);
    })
  }

}