import { Component, ViewChild } from '@angular/core';
import { appItems, IRoleItems } from 'interfaces/iuser-manager';
import { CloseTabService } from 'services/close-tab.service';
import { UserAddManagerService } from 'services/user-add-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

import { UserInputsComponent } from './user-inputs/user-inputs.component';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent extends FactoryONE {
  dataSource: any;

  provinceItemsData: any;
  userAppItems: appItems[] = [];
  roleItemsData: IRoleItems[] = [];
  @ViewChild(UserInputsComponent) userInfos: any;

  constructor(
    private userAddManagerService: UserAddManagerService,     
    private closeTabService: CloseTabService
  ) {
    super();
  }
  addUser = () => {
    this.userAddManagerService.userAddA(this.dataSource, this.userInfos.userInputForm);
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForAddUsers = null;
    }
    if (this.closeTabService.saveDataForAddUsers) {
      this.dataSource = this.closeTabService.saveDataForAddUsers;
    }
    else {
      this.dataSource = await this.userAddManagerService.getUserAdd();
      this.closeTabService.saveDataForAddUsers = this.dataSource;
    }

    this.roleItemsData = this.dataSource.roleItems;
    this.userAppItems = this.dataSource.appItems;
    this.provinceItemsData = this.dataSource.provinceItems;
  }
}
