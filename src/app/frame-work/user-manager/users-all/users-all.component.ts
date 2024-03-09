import { Component, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
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

  convertLoginTime = () => {
    this.closeTabService.saveDataForAllUsers.forEach(item => {
      item.lockTimeSpan = this.dateJalaliService.getDate(item.lockTimeSpan) + '   ' + this.dateJalaliService.getTime(item.lockTimeSpan);
      item.lastActivityDateTime = this.dateJalaliService.getDate(item.lastActivityDateTime) + '   ' + this.dateJalaliService.getTime(item.lastActivityDateTime);
    })
  }
  callAPI = async () => {
    this.closeTabService.saveDataForAllUsers = await this.usersAllService.ajaxReqWrapperService.getDataSource(ENInterfaces.userGET);
    this.convertLoginTime();
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForAllUsers)) {
      this.callAPI();
    }
  }
  showExactConfig = (dataSource: IUserManager) => {
    this.closeTabService.utilsService.showUserConfigDialog(dataSource);
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
          this.callAPI();
      });
    });
  }

}
