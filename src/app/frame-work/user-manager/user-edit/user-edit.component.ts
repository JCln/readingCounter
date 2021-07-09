import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { UserEditManagerService } from 'services/user-edit-manager.service';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { appItems, IRoleItems, IUserInfo } from 'src/app/Interfaces/iuser-manager';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements AfterViewInit, OnDestroy {
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
    private interactionService: InteractionService,
    private closeTabService: CloseTabService
  ) {
    this.detectRouteChange();
  }
  addAUser = () => {
    this.editUserManagerService.userEditA(this.UUid, this.dataSource);
  }
  nullSavedSource = () => this.closeTabService.saveDataForEditUsers = null;
  private classWrapper = async (canRefresh?: boolean) => {
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

  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res.includes('/wr/mu/edit/'))
          this.classWrapper(true);
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

}
