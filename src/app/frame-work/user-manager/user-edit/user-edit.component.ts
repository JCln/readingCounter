import { Component } from '@angular/core';
import { appItems, IRoleItems, IUserInfo } from 'interfaces/iuser-manager';
import { CloseTabService } from 'services/close-tab.service';
import { UsersAllService } from 'services/users-all.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent extends FactoryONE {
  dataSource: any;

  personalizeInfo: IUserInfo;
  provinceItemsData: any;
  addUserData: appItems[] = [];
  roleItemsData: IRoleItems[] = [];

  constructor(
    private usersAllService: UsersAllService,
    private closeTabService: CloseTabService

  ) {
    super();
  }
  connectToServer = () => {
    this.usersAllService.userEditA(this.usersAllService.userEdit_pageSign.GUid, this.dataSource);
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (!this.usersAllService.userEdit_pageSign.GUid) {
      this.usersAllService.routeToUsersAll();
    }
    else {
      if (canRefresh) {
        this.closeTabService.saveDataForEditUsers = null;
        this.closeTabService.saveDataForEditUsersGUID = '';
      }
      if (this.closeTabService.saveDataForEditUsers && this.closeTabService.saveDataForEditUsersGUID === this.usersAllService.userEdit_pageSign.GUid) {
        this.dataSource = this.closeTabService.saveDataForEditUsers;
      }
      else {
        this.dataSource = await this.usersAllService.getUserInfoByGUID(this.usersAllService.userEdit_pageSign.GUid);
        this.closeTabService.saveDataForEditUsers = this.dataSource;
        this.closeTabService.saveDataForEditUsersGUID = this.usersAllService.userEdit_pageSign.GUid;
      }
      this.roleItemsData = this.dataSource.roleItems;
      this.addUserData = this.dataSource.appItems;
      this.provinceItemsData = this.dataSource.provinceItems;
      this.personalizeInfo = this.dataSource.userInfo;
    }
  }

}
