import { Component, ViewChild } from '@angular/core';
import { appItems, IRoleItems } from 'interfaces/iuser-manager';
import { InteractionService } from 'services/interaction.service';
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
    public interactionService: InteractionService
  ) {
    super(interactionService);
  }
  addUser = () => {
    this.userAddManagerService.userAddA(this.dataSource, this.userInfos.userInputForm);
  }
  classWrapper = async (canRefresh?: boolean) => {
    this.dataSource = await this.userAddManagerService.getUserAdd();
    if (this.dataSource)

      this.roleItemsData = this.dataSource.roleItems;
    this.userAppItems = this.dataSource.appItems;
    this.provinceItemsData = this.dataSource.provinceItems;
  }
}
