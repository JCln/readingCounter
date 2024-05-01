import { DateJalaliService } from 'services/date-jalali.service';
import { ReqlogUsersLoginsDetailsComponent } from './reqlog-users-logins-details/reqlog-users-logins-details.component';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';
import { IUsersLoginBriefInfo } from 'services/DI/privacies';
import { transitionAnimation } from 'src/app/directives/animation.directive';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { Converter } from 'src/app/classes/converter';
import { EN_messages } from 'interfaces/enums.enum';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-reqlog-users-logins',
  templateUrl: './reqlog-users-logins.component.html',
  styleUrls: ['./reqlog-users-logins.component.scss'],
  animations: [transitionAnimation]
})
export class ReqlogUsersLoginsComponent extends FactoryONE {
  ref: DynamicDialogRef;
  logoutReasonDictionary: IDictionaryManager[] = [];
  invalidLoginReasonDictionary: IDictionaryManager[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService,
    private dialogService: DialogService,
    private dateJalaliService: DateJalaliService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.usersLogins = [];
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
      this.verification();
    }
  }
  routeToUserLogginsDetails = (data: IUsersLoginBriefInfo) => {
    this.ref = this.dialogService.open(ReqlogUsersLoginsDetailsComponent, {
      data: data,
      rtl: true,
      width: '80%'
    })
  }
  connectToServer = async () => {
    this.closeTabService.usersLogins = await this.securityService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.requestLogUsersLogins, this.closeTabService.usersLoginsReq);
    this.logoutReasonDictionary = this.securityService.utilsService.getLogoutReason();
    this.invalidLoginReasonDictionary = this.securityService.utilsService.getInvalidLoginReason();
    this.convertLoginTime();
    Converter.convertIdToTitle(this.closeTabService.usersLogins, this.logoutReasonDictionary, 'logoutReasonId');
    Converter.convertIdToTitle(this.closeTabService.usersLogins, this.invalidLoginReasonDictionary, 'invalidLoginReasonId');
  }
  verification = async () => {
    const temp = this.securityService.verificationService.verificationDates(this.closeTabService.usersLoginsReq);
    if (temp)
      this.connectToServer();
  }
  convertLoginTime = () => {
    this.closeTabService.usersLogins.forEach(item => {
      item.loginDateTime = this.dateJalaliService.getDate(item.loginDateTime) + '   ' + this.dateJalaliService.getTime(item.loginDateTime);
      item.logoutDateTime = this.dateJalaliService.getDate(item.logoutDateTime) + '   ' + this.dateJalaliService.getTime(item.logoutDateTime);
      item.twoStepEnterDateTime = this.dateJalaliService.getDate(item.twoStepEnterDateTime) + '   ' + this.dateJalaliService.getTime(item.twoStepEnterDateTime);
      item.twoStepExpireDateTime = this.dateJalaliService.getDate(item.twoStepExpireDateTime) + '   ' + this.dateJalaliService.getTime(item.twoStepExpireDateTime);
      item.twoStepType = MathS.isBoolean(item.twoStepWasSuccessful) ? EN_messages.twoStepTypeByTwo : EN_messages.twoStepTypeByUserPass;
    })
  }

}