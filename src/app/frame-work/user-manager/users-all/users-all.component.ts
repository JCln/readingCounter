import { Component, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IUserManager } from 'interfaces/iuser-manager';
import { Table } from 'primeng/table';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { UsersAllService } from 'services/users-all.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { UserBlockingComponent } from 'src/app/shared/user-blocking/user-blocking.component';

@Component({
  selector: 'app-users-all',
  templateUrl: './users-all.component.html',
  styleUrls: ['./users-all.component.scss']
})
export class UsersAllComponent extends FactoryONE {
  @ViewChild(Table) UsersAllComponent: Table;

  constructor(
    public closeTabService: CloseTabService,
    public usersAllService: UsersAllService,
    private dateJalaliService: DateJalaliService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForAllUsers = [];
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (MathS.isNull(this.closeTabService.saveDataForAllUsers)) {
      this.closeTabService.saveDataForAllUsers = await this.usersAllService.ajaxReqWrapperService.getDataSource(ENInterfaces.userGET);
    }
    this.convertLoginTime();
  }
  ActivateUser = async (dataSource: IUserManager) => {
    const a = await this.usersAllService.ajaxReqWrapperService.postDataSourceByIdStringly(ENInterfaces.userACTIVATE, dataSource['dataSource'].id);
    this.usersAllService.snackBarMessageSuccess(a);
    this.refreshTable();
  }
  DeActivateUser = async (dataSource: object) => {
    const a = await this.usersAllService.ajaxReqWrapperService.postDataSourceByIdStringly(ENInterfaces.userDEACTIVATE, dataSource['dataSource'].id);
    this.usersAllService.snackBarMessageSuccess(a);
    this.refreshTable();
  }
  resetPasswordUser = async (dataSource: object) => {
    const a = await this.usersAllService.ajaxReqWrapperService.postDataSourceByIdStringly(ENInterfaces.userRESETPASS, dataSource['dataSource'].id);
    this.usersAllService.snackBarMessageSuccess(a);
    this.refreshTable();
  }
  unLockUser = async (dataSource: object) => {
    const a = await this.usersAllService.ajaxReqWrapperService.postDataSourceByIdStringly(ENInterfaces.unlockUser, dataSource['dataSource'].id);
    this.usersAllService.snackBarMessageSuccess(a);
    this.refreshTable();
  }
  removeUser = async (dataSource: IUserManager) => {
    const config = {
      messageTitle: EN_messages.confirm_removeingUser1 + dataSource['dataSource'].displayName + EN_messages.confirm_removeingUser2 + dataSource['dataSource'].username + EN_messages.confirm_IS,
      text: EN_messages.confirm_removeUser,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      icon: 'pi pi-user-minus'
    }
    const confirmed = await this.closeTabService.utilsService.firstConfirmDialog(config);
    if (confirmed) {
      const a = await this.usersAllService.ajaxReqWrapperService.postDataSourceByIdStringly(ENInterfaces.userRemove, dataSource['dataSource'].id);
      this.usersAllService.snackBarMessageSuccess(a);
      this.refreshTable();
    }
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
  openAddDialog = (dataSource: any) => {
    const deepCopy = JSON.parse(JSON.stringify(dataSource));
    deepCopy.userId = dataSource.id;
    deepCopy.id = 0;
    return new Promise(() => {
      const dialogRef = this.closeTabService.utilsService.dialog.open(UserBlockingComponent, {
        disableClose: true,
        minWidth: '65vw',
        data: {
          di: deepCopy
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.refreshTable();
      });
    });
  }

}
