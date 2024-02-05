import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { CloseTabService } from 'services/close-tab.service';
import { UsersAllService } from 'services/users-all.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-user-edit-on-role',
  templateUrl: './user-edit-on-role.component.html',
  styleUrls: ['./user-edit-on-role.component.scss']
})
export class UserEditOnRoleComponent extends FactoryONE {
  constructor(
    private usersAllService: UsersAllService,
    public closeTabService: CloseTabService
  ) {
    super();
  }
  connectToServer = () => {
    this.usersAllService.userEditOnRole(this.closeTabService.saveDataForEditOnRole);
  }
  callAPI = async () => {
    this.closeTabService.saveDataForEditOnRole = await this.usersAllService.ajaxReqWrapperService.getDataSource(ENInterfaces.userADD);
  }
  classWrapper = async () => {
    if (!this.closeTabService.saveDataForEditOnRole) {
      this.callAPI();
    }
    this.usersAllService.firstConfirmDialog({ messageTitle: EN_messages.confirmUserGroupChange1, doesNotReturnButton: false });
  }
}
