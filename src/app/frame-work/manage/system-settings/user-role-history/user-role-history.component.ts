import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { UsersAllService } from 'services/users-all.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-user-role-history',
  templateUrl: './user-role-history.component.html',
  styleUrls: ['./user-role-history.component.scss']
})
export class UserRoleHistoryComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    public usersAllService: UsersAllService
  ) {
    super();
  }

  // routeToLoggs(e: IUserManager) {
  //   this.userLogginsService.updateUserLogginsInfo(e);
  // }
  nullSavedSource = () => this.closeTabService.saveDataForAllUsers = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForAllUsers) {
      this.closeTabService.saveDataForAllUsers = await this.usersAllService.connectToServer(ENInterfaces.userGET);
    }
    // this.convertLoginTime();
  }
  // convertLoginTime = () => {
  //   this.closeTabService.saveDataForAllUsers.forEach(item => {
  //     item.lockTimeSpan = this.dateJalaliService.getDate(item.lockTimeSpan) + '   ' + this.dateJalaliService.getTime(item.lockTimeSpan);
  //   })
  // }  

}