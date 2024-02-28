import { Component, ViewChild } from '@angular/core';
import { CloseTabService } from 'services/close-tab.service';
import { UserAddManagerService } from 'services/user-add-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

import { UserInputsComponent } from './user-inputs/user-inputs.component';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { UsersAllService } from 'services/users-all.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent extends FactoryONE {

  @ViewChild(UserInputsComponent) userInfos: UserInputsComponent;

  constructor(
    private userAddManagerService: UserAddManagerService,
    public closeTabService: CloseTabService,
    public userAllService: UsersAllService,
  ) {
    super();
  }
  addUser = () => {
    this.userAddManagerService.userAddA(this.closeTabService.saveDataForAddUsers, this.userInfos.closeTabService._userAddUserInfos);
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForAddUsers = null;
    }
    if (!this.closeTabService.saveDataForAddUsers) {
      this.closeTabService.saveDataForAddUsers = await this.userAddManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.userADD);
    }
    this.userAllService.getLatestZoneViewType();
  }
}
