import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IUserManager } from 'interfaces/iuser-manager';
import { CloseTabService } from 'services/close-tab.service';
import { UserAddManagerService } from 'services/user-add-manager.service';
import { UserLogginsService } from 'services/user-loggins.service';
import { UsersAllService } from 'services/users-all.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent extends FactoryONE {
  constructor(
    public userAddManagerService: UserAddManagerService,
    public usersAllService: UsersAllService,
    public userLogginsService: UserLogginsService,
    public closeTabService: CloseTabService
  ) {
    super();
  }
  searchUsers = async () => {
    const temp = this.userAddManagerService.userSearchConnectToServer(this.closeTabService.saveDataForUserSearch);
    if (!MathS.isNull(temp)) {
      this.closeTabService.saveDataForUserSearchRes = await this.userAddManagerService.postUserBody(ENInterfaces.userSearch, temp);
    }
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (!this.closeTabService.saveDataForUserSearchRes) {
      this.closeTabService.saveDataForUserSearch = await this.userAddManagerService.getUserAdd();
    }

  }
  showExactConfig = (index: number) => {
    let a = document.querySelectorAll('.more_configs');
    a[index].classList.toggle('showConfigs');
  }
  ActivateUser = (dataSource: IUserManager) => {
    this.usersAllService.changeUserStatus(ENInterfaces.userACTIVATE, dataSource['dataSource'].id);
  }
  DeActivateUser = (dataSource: object) => {
    this.usersAllService.changeUserStatus(ENInterfaces.userDEACTIVATE, dataSource['dataSource'].id);
  }
  resetPasswordUser = (dataSource: object) => {
    this.usersAllService.changeUserStatus(ENInterfaces.userRESETPASS, dataSource['dataSource'].id);
  }

}
