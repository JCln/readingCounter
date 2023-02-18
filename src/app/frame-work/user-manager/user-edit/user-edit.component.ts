import { Component } from '@angular/core';
import { CloseTabService } from 'services/close-tab.service';
import { UsersAllService } from 'services/users-all.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent extends FactoryONE {

  constructor(
    private usersAllService: UsersAllService,
    public closeTabService: CloseTabService

  ) {
    super();
  }
  connectToServer = () => {
    this.usersAllService.userEditA(this.usersAllService.userEdit_pageSign.GUid, this.closeTabService.saveDataForEditUsers);
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
      if (
        !this.closeTabService.saveDataForEditUsers ||
        this.closeTabService.saveDataForEditUsersGUID !== this.usersAllService.userEdit_pageSign.GUid
      ) {
        this.closeTabService.saveDataForEditUsers = await this.usersAllService.getUserInfoByGUID(this.usersAllService.userEdit_pageSign.GUid);
        this.closeTabService.saveDataForEditUsersGUID = this.usersAllService.userEdit_pageSign.GUid;
      }

    }
  }

}
