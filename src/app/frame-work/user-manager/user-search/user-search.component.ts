import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IUserManager } from 'interfaces/iuser-manager';
import { CloseTabService } from 'services/close-tab.service';
import { UserAddManagerService } from 'services/user-add-manager.service';
import { UsersAllService } from 'services/users-all.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { UserBlockingComponent } from 'src/app/shared/user-blocking/user-blocking.component';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent extends FactoryONE {
  constructor(
    public userAddManagerService: UserAddManagerService,
    public usersAllService: UsersAllService,
    public closeTabService: CloseTabService
  ) {
    super();
  }
  searchUsers = async () => {
    const temp = this.userAddManagerService.userSearchConnectToServer(this.closeTabService.saveDataForUserSearch);
    if (!MathS.isNull(temp)) {
      this.closeTabService.saveDataForUserSearchRes = await this.userAddManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.userSearch, temp);
    }
  }
  classWrapper = async () => {
    if (!this.closeTabService.saveDataForUserSearchRes) {
      this.closeTabService.saveDataForUserSearch = await this.userAddManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.userADD);
    }
    this.usersAllService.getLatestZoneViewType();
  }
  showUserConfigDialog = (dataSource: IUserManager) => {
    this.closeTabService.utilsService.showUserConfigDialog(dataSource);
  }
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
