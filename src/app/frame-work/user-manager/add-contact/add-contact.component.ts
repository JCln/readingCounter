import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { appItems, IAddAUserManager, IAddUserInfos, IRoleItems } from './../../../Interfaces/iuser-manager';
import { AddUserManagerService } from './../../../services/add-user-manager.service';
import { UserInputsComponent } from './user-inputs/user-inputs.component';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: any;
  subscription: Subscription[] = [];

  personalizeInfo: IAddAUserManager;
  provinceItemsData: any;

  contactAppItems: appItems[] = [];
  // add role config
  roleItemsData: IRoleItems[] = [];
  // 
  // user input component
  @ViewChild(UserInputsComponent) userInfos: any;
  userInputWrapper: IAddUserInfos;
  userDetails: IAddUserInfos = {
    userCode: 0,
    username: '',
    password: '',
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
    private addUserManagerService: AddUserManagerService,
    private interfaceManagerService: InterfaceManagerService,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService
  ) {
  }
  addAContact = () => {
    this.addUserManagerService.addAContact(this.dataSource, this.userInputWrapper);
  }
  userInputVals = () => {
    this.userInputWrapper = this.userInfos.userInputForm;
  }
  userRolesVals = () => {
    this.roleItemsData = this.userInfos.userInputForm;
  }
  nullSavedSource = () => this.closeTabService.saveDataForForAddContacts = null;

  getContactSource = (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForForAddContacts) {
      this.dataSource = this.closeTabService.saveDataForForAddContacts;
      this.roleItemsData = this.dataSource.roleItems;
      this.contactAppItems = this.dataSource.appItems;
      this.provinceItemsData = this.dataSource.provinceItems;
    }
    else {
      this.interfaceManagerService.getAddUserContactManager().subscribe((res: any) => {
        if (res) {
          this.dataSource = res;
          this.closeTabService.saveDataForForAddContacts = res;

          this.roleItemsData = this.dataSource.roleItems;
          this.contactAppItems = this.dataSource.appItems;
          this.provinceItemsData = this.dataSource.provinceItems;
        }
      })
    }

  }
  ngOnInit(): void {
    this.getContactSource();

  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/mu/add')
          this.getContactSource(true);
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
    this.userInputVals();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

}
