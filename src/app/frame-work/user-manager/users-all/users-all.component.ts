import { Component, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IUserManager } from 'interfaces/iuser-manager';
import { Table } from 'primeng/table';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { UserLogginsService } from 'services/user-loggins.service';
import { UsersAllService } from 'services/users-all.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-users-all',
  templateUrl: './users-all.component.html',
  styleUrls: ['./users-all.component.scss']
})
export class UsersAllComponent extends FactoryONE {
  @ViewChild(Table) UsersAllComponent: Table;

  constructor(
    private userLogginsService: UserLogginsService,
    public closeTabService: CloseTabService,
    public usersAllService: UsersAllService,
    private dateJalaliService: DateJalaliService
  ) {
    super();
  }

  routeToLoggs(e: IUserManager) {
    this.userLogginsService.updateUserLogginsInfo(e);
  }
  nullSavedSource = () => this.closeTabService.saveDataForAllUsers = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (MathS.isNull(this.closeTabService.saveDataForAllUsers)) {
      this.closeTabService.saveDataForAllUsers = await this.usersAllService.connectToServer(ENInterfaces.userGET);
    }
    this.convertLoginTime();
  }
  ActivateUser = (dataSource: IUserManager) => {
    this.usersAllService.changeUserStatus(ENInterfaces.userACTIVATE, dataSource['dataSource'].id);
    this.refreshTable();
  }
  DeActivateUser = (dataSource: object) => {
    this.usersAllService.changeUserStatus(ENInterfaces.userDEACTIVATE, dataSource['dataSource'].id);
    this.refreshTable();
  }
  resetPasswordUser = (dataSource: object) => {
    this.usersAllService.changeUserStatus(ENInterfaces.userRESETPASS, dataSource['dataSource'].id);
    this.refreshTable();
  }
  unLockUser = (dataSource: object) => {
    this.usersAllService.changeUserStatus(ENInterfaces.unlockUser, dataSource['dataSource'].id);
    this.refreshTable();
  }
  showExactConfig = (index: number) => {
    let a = document.querySelectorAll('.more_configs');
    a[index].classList.toggle('showConfigs');
  }
  convertLoginTime = () => {
    this.closeTabService.saveDataForAllUsers.forEach(item => {
      item.lockTimeSpan = this.dateJalaliService.getDate(item.lockTimeSpan) + '   ' + this.dateJalaliService.getTime(item.lockTimeSpan);
    })
  }
  refetchTable = (index: number) => this.closeTabService.saveDataForAllUsers = this.closeTabService.saveDataForAllUsers.slice(0, index).concat(this.closeTabService.saveDataForAllUsers.slice(index + 1));

}
