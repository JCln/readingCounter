import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { appItems, IRoleItems } from 'interfaces/iuser-manager';
import { CloseTabService } from 'services/close-tab.service';
import { UsersAllService } from 'services/users-all.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-user-edit-on-role',
  templateUrl: './user-edit-on-role.component.html',
  styleUrls: ['./user-edit-on-role.component.scss']
})
export class UserEditOnRoleComponent extends FactoryONE {
  dataSource: any;

  userActions: appItems[] = [];
  userRoles: IRoleItems[] = [];

  constructor(
    private usersAllService: UsersAllService,
    private closeTabService: CloseTabService
  ) {
    super();
  }
  connectToServer = () => {
    this.usersAllService.userEditOnRole(this.dataSource);
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForEditOnRole = '';
    }
    if (this.closeTabService.saveDataForEditOnRole) {
      this.dataSource = this.closeTabService.saveDataForEditOnRole;
    }
    else {
      this.dataSource = await this.usersAllService.connectToServer(ENInterfaces.userADD);
      this.closeTabService.saveDataForEditOnRole = this.dataSource;
    }
    this.usersAllService.firstConfirmDialog(EN_messages.confirmUserGroupChange1, EN_messages.confirmUserGroupChange2);
    this.userRoles = this.dataSource.roleItems;
    this.userActions = this.dataSource.appItems;
  }
}
