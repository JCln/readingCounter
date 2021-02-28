import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { appItems, IRoleItems, IUserInfo } from 'src/app/Interfaces/iuser-manager';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { EditContactManagerService } from 'src/app/services/edit-contact-manager.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements AfterViewInit, OnDestroy {
  UUid: string = '';
  personalizeInfo: IUserInfo;
  provinceItemsData: any;
  dataSource: any;
  subscription: Subscription[] = [];

  addContactData: appItems[] = [];
  // add role config
  roleItemsData: IRoleItems[] = [];
  // 

  constructor(
    private editUserManagerService: EditContactManagerService,
    private interfaceManagerService: InterfaceManagerService,
    private route: ActivatedRoute,
    private router: Router,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService
  ) {
    this.detectRouteChange();
  }
  addAContact = () => {
    this.editUserManagerService.editAUserContact(this.UUid, this.dataSource);
  }
  nullSavedSource = () => this.closeTabService.saveDataForEditContacts = null;
  private classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.interfaceManagerService.getUserContactManager(this.UUid).subscribe((res: any) => {
      if (res) {
        this.dataSource = res;
        this.closeTabService.saveDataForEditContacts = res;
        this.roleItemsData = this.dataSource.roleItems;
        this.addContactData = this.dataSource.appItems;
        this.provinceItemsData = this.dataSource.provinceItems;
        this.personalizeInfo = this.dataSource.userInfo;
      }
    })
  }
  detectRouteChange = () => {
    this.subscription.push(this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.UUid = this.route.snapshot.paramMap.get('id');
        this.classWrapper();
      }
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
