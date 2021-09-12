import { Component, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { appItems, IAddAUserManager, IAddUserInfos, IRoleItems } from 'interfaces/iuser-manager';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { InterfaceManagerService } from 'services/interface-manager.service';
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
 

  personalizeInfo: IAddAUserManager;
  provinceItemsData: any;

  userAppItems: appItems[] = [];
  // add role config
  roleItemsData: IRoleItems[] = [];
  // 
  // user input component
  @ViewChild(UserInputsComponent) userInfos: any;
  userInputWrapper: IAddUserInfos;
  userDetails: IAddUserInfos = {
    userCode: null,
    username: null,
    password: null,
    confirmPassword: '',
    firstName: '',
    sureName: '',
    email: '',
    mobile: '',
    displayMobile: false,
    displayName: '',
    isActive: true,
    deviceId: ''
  }


  constructor(
    private userAddManagerService: UserAddManagerService,
    private interfaceManagerService: InterfaceManagerService,
    public interactionService: InteractionService,
    private closeTabService: CloseTabService
  ) {
    super(interactionService);
  }
  addUser = () => {
    this.userAddManagerService.userAddA(this.dataSource, this.userInputWrapper);
  }
  userInputVals = () => {
    this.userInputWrapper = this.userInfos.userInputForm;
  }
  nullSavedSource = () => this.closeTabService.saveDataForForAddUsers = null;

  classWrapper = (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForForAddUsers) {
      this.dataSource = this.closeTabService.saveDataForForAddUsers;
      this.roleItemsData = this.dataSource.roleItems;
      this.userAppItems = this.dataSource.appItems;
      this.provinceItemsData = this.dataSource.provinceItems;
    }
    else {
      this.interfaceManagerService.GET(ENInterfaces.userADD).subscribe((res: any) => {
        if (res) {
          this.dataSource = res;
          this.closeTabService.saveDataForForAddUsers = res;

          this.roleItemsData = this.dataSource.roleItems;
          this.userAppItems = this.dataSource.appItems;
          this.provinceItemsData = this.dataSource.provinceItems;
        }
      })
    }
    this.userInputVals();
  }
}
