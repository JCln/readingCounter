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
    this.securityService.utilsService.routeTo(EN_Routes.userRoleHistoryDetails);
  }
  routeToUserMasterHistory(e: IUserManager) {
    this.securityService.userMasterDetailsHistory_pageSign.id = e.id;
    this.securityService.utilsService.routeTo(EN_Routes.userMasterHistory);
  }
  routeToUserCompare(e: IUserManager) {
    this.securityService.userMasterDetailsHistory_pageSign.id = e.id;
    this.securityService.utilsService.routeTo(EN_Routes.userCompare);
  }
  convertLoginTime = () => {
    this.closeTabService.saveDataForAllUsers.forEach(item => {
      item.lastActivityDateTime = this.dateJalaliService.getDate(item.lastActivityDateTime) + '   ' + this.dateJalaliService.getTime(item.lastActivityDateTime);
    })
  }
  nullSavedSource = () => this.closeTabService.saveDataForAllUsers = [];
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (MathS.isNull(this.closeTabService.saveDataForAllUsers)) {
      this.closeTabService.saveDataForAllUsers = await this.securityService.ajaxReqWrapperService.getDataSource(ENInterfaces.userGET);
    }
    this.convertLoginTime();
  }

}