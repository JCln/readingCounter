import { Component } from '@angular/core';
import { appItems, IRoleItems } from 'interfaces/iuser-manager';
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
    public interactionService: InteractionService
  ) {
    super(interactionService);
  }
  connectToServer = () => {
    this.userEditManagerService.verificationEditOnRole(this.dataSource);
  }
  classWrapper = async (canRefresh?: boolean) => {
    // this.dataSource = await this.userEditManagerService.();
    if (!this.dataSource)
      return;

    this.userRoles = this.dataSource.roleItems;
    this.userActions = this.dataSource.appItems;
  }
}
