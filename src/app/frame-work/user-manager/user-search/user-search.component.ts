import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IRoleItems, IUserManager } from 'interfaces/iuser-manager';
import { CloseTabService } from 'services/close-tab.service';
import { UserAddManagerService } from 'services/user-add-manager.service';
import { UsersAllService } from 'services/users-all.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { EN_Routes } from 'src/app/Interfaces/routes.enum';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent extends FactoryONE {
  dataSource: any;
  dataSourceRes: any;

  provinceItemsData: any;
  userAppItems: any[] = [];
  roleItemsData: IRoleItems[] = [];

  constructor(
    public userAddManagerService: UserAddManagerService,
    private route: ActivatedRoute,
    private router: Router,
    public usersAllService: UsersAllService,
    private closeTabService: CloseTabService
  ) {
    super();
  }
  searchUsers = async () => {
    const temp = this.userAddManagerService.userSearchConnectToServer(this.dataSource);
    if (!MathS.isNull(temp)) {
      this.closeTabService.saveDataForUserSearchRes = await this.userAddManagerService.postUserBody(ENInterfaces.userSearch, temp);
      this.dataSourceRes = this.closeTabService.saveDataForUserSearchRes;
    }
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForUserSearch = null;
      this.closeTabService.saveDataForUserSearchRes = null;
    }
    if (this.closeTabService.saveDataForUserSearchRes) {
      this.dataSource = this.closeTabService.saveDataForUserSearch;
      this.dataSourceRes = this.closeTabService.saveDataForUserSearchRes;
    }
    else {
      this.dataSource = await this.userAddManagerService.getUserAdd();
      this.closeTabService.saveDataForUserSearch = this.dataSource;
    }

    this.roleItemsData = this.dataSource.roleItems;
    this.userAppItems = this.dataSource.appItems;
    this.provinceItemsData = this.dataSource.provinceItems;
  }
  showExactConfig = (index: number) => {
    let a = document.querySelectorAll('.more_configs');
    a[index].classList.toggle('showConfigs');
  }
  routeToEditPage(e) {
    this.router.navigate([EN_Routes.edit, e], { relativeTo: this.route.parent })
  }
  routeToLoggs(e: string) {
    this.router.navigate([EN_Routes.wrmuallloggins, e])
  }
  ActivateUser = (dataSource: IUserManager) => {
    this.usersAllService.Activate(dataSource['dataSource'].id);
  }
  DeActivateUser = (dataSource: object) => {
    this.usersAllService.DeActivate(dataSource['dataSource'].id);
  }
  resetPasswordUser = (dataSource: object) => {
    this.usersAllService.resetPassword(dataSource['dataSource'].id);
  }

}
