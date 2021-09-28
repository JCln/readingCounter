import { Component } from '@angular/core';
import { appItems, IRoleItems } from 'interfaces/iuser-manager';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { UserEditManagerService } from 'services/user-edit-manager.service';
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
    private userEditManagerService: UserEditManagerService,
    public interactionService: InteractionService,
    private closeTabService: CloseTabService
  ) {
    super(interactionService);
  }
  connectToServer = () => {
    this.userEditManagerService.userEditOnRole(this.dataSource);
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForEditOnRole = '';
    }
    if (this.closeTabService.saveDataForEditOnRole) {
      this.dataSource = this.closeTabService.saveDataForEditOnRole;
    }
    else {
      this.dataSource = await this.userEditManagerService.getUserAdd();
      this.closeTabService.saveDataForEditOnRole = this.dataSource;
    }

    this.userRoles = this.dataSource.roleItems;
    this.userActions = this.dataSource.appItems;
  }
}
