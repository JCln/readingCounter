import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { appItems, IRoleItems, IUserInfo } from 'interfaces/iuser-manager';
import { filter } from 'rxjs/internal/operators/filter';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { UserEditManagerService } from 'services/user-edit-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent extends FactoryONE {
  UUid: string = '';
  personalizeInfo: IUserInfo;
  provinceItemsData: any;
  dataSource: any;
  subscription: Subscription[] = [];

  addUserData: appItems[] = [];
  // add role config
  roleItemsData: IRoleItems[] = [];
  // 

  constructor(
    private editUserManagerService: UserEditManagerService,
    private interfaceManagerService: InterfaceManagerService,
    private route: ActivatedRoute,
    private router: Router,
    public interactionService: InteractionService,
    private closeTabService: CloseTabService
  ) {
    super(interactionService);
    this.detectRouteChange();
  }
  addAUser = () => {
    this.editUserManagerService.userEditA(this.UUid, this.dataSource);
  }
  nullSavedSource = () => this.closeTabService.saveDataForEditUsers = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.interfaceManagerService.GETID(ENInterfaces.userEDIT, this.UUid).subscribe((res: any) => {
      if (res) {
        this.dataSource = res;
        this.closeTabService.saveDataForEditUsers = res;
        this.roleItemsData = this.dataSource.roleItems;
        this.addUserData = this.dataSource.appItems;
        this.provinceItemsData = this.dataSource.provinceItems;
        this.personalizeInfo = this.dataSource.userInfo;
      }
    })
  }
  detectRouteChange = () => {
    this.subscription.push(this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.UUid = this.route.snapshot.paramMap.get('id');
        this.classWrapper();
      })
    )
  }

}
