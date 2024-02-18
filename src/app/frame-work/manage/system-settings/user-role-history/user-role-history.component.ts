import { EN_Routes } from 'interfaces/routes.enum';
import { SecurityService } from 'services/security.service';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { IUserManager } from 'interfaces/iuser-manager';
import { DateJalaliService } from 'services/date-jalali.service';

@Component({
  selector: 'app-user-role-history',
  templateUrl: './user-role-history.component.html',
  styleUrls: ['./user-role-history.component.scss']
})
export class UserRoleHistoryComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService,
    private dateJalaliService: DateJalaliService
  ) {
    super();
  }

  routeToLoggs(e: IUserManager) {
    this.securityService.updateUserLogginsInfo(e);
  }
  routeToUserRoleHistory(e: IUserManager) {
    this.securityService.userRoleHistoryDetails_pageSign.id = e.id;
    this.securityService.userRoleHistoryDetails_pageSign.username = e.username;
    this.securityService.userRoleHistoryDetails_pageSign.displayName = e.displayName;
    this.securityService.userRoleHistoryDetails_pageSign.defaultZoneTitle = e.defaultZoneTitle;
    this.securityService.utilsService.routeTo(EN_Routes.userRoleHistoryDetails);
  }
  routeToUserMasterHistory(e: IUserManager) { //user change accesses
    this.securityService.userMasterDetailsHistory_pageSign.id = e.id;
    this.securityService.userMasterDetailsHistory_pageSign.username = e.username;
    this.securityService.userMasterDetailsHistory_pageSign.displayName = e.displayName;
    this.securityService.userMasterDetailsHistory_pageSign.defaultZoneTitle = e.defaultZoneTitle;
    // for user compare
    this.securityService.userCompare_pageSign.id = e.id;
    this.securityService.userCompare_pageSign.username = e.username;
    this.securityService.userCompare_pageSign.displayName = e.displayName;
    this.securityService.userCompare_pageSign.defaultZoneTitle = e.defaultZoneTitle;
    this.securityService.utilsService.routeTo(EN_Routes.userMasterHistory);
  }
  routeToUserCompare(e: IUserManager) {
    this.securityService.userCompare_pageSign.changeOrInsertUserLogId = e.changeOrInsertUserLogId;
    this.securityService.utilsService.routeTo(EN_Routes.userCompare);
  }
  convertLoginTime = () => {
    this.closeTabService.saveDataForAllUsers.forEach(item => {
      item.lastActivityDateTime = this.dateJalaliService.getDate(item.lastActivityDateTime) + '   ' + this.dateJalaliService.getTime(item.lastActivityDateTime);
      item.lockTimeSpan = this.dateJalaliService.getDate(item.lockTimeSpan) + '   ' + this.dateJalaliService.getTime(item.lockTimeSpan);
    })
  }
  callApi = async () => {
    this.closeTabService.saveDataForAllUsers = await this.securityService.ajaxReqWrapperService.getDataSource(ENInterfaces.userGET);
    this.convertLoginTime();
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForAllUsers)) {
      this.callApi();
    }

  }

}