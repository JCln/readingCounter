import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { appItems, IAddAUserManager, IAddUserInfos, IRoleItems } from './../../../Interfaces/iuser-manager';
import { AddUserManagerService } from './../../../services/add-user-manager.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit, AfterViewInit, OnDestroy {
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
  personalizeInfo: IAddAUserManager;
  provinceItemsData: any;
  dataSource: any;
  subscription: Subscription[] = [];

  // stepper
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  // 

  addContactData: appItems[] = [];
  // add role config
  roleItemsData: IRoleItems[] = [];
  // 

  constructor(
    private addUserManagerService: AddUserManagerService,
    private interfaceManagerService: InterfaceManagerService,
    private interactionService: InteractionService,
    private router: Router
  ) {
  }
  addAContact = () => {
    this.addUserManagerService.addAContact(this.dataSource);
  }
  nullSavedSource = () => this.interactionService.saveDataForForAddContacts = null;

  getContactSource = (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.interactionService.saveDataForForAddContacts) {
      this.dataSource = this.interactionService.saveDataForForAddContacts;
      this.roleItemsData = this.dataSource.roleItems;
      this.addContactData = this.dataSource.appItems;
      this.provinceItemsData = this.dataSource.provinceItems;
    }
    else {
      this.interfaceManagerService.getAddUserContactManager().subscribe((res: any) => {
        if (res) {
          this.dataSource = res;
          this.interactionService.saveDataForForAddContacts = res;

          this.roleItemsData = this.dataSource.roleItems;
          this.addContactData = this.dataSource.appItems;
          this.provinceItemsData = this.dataSource.provinceItems;
        }
      })
    }

  }
  ngOnInit(): void {
    this.getContactSource();

  }
  closeTabStatus = () => {
    this.subscription.push(this.interactionService.getClosedPage().subscribe((res: string) => {
      if (res) {
        if (res === this.router.url) {
          this.nullSavedSource();
        }
      }
    })
    )
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === this.router.url)
          this.getContactSource(true);
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.closeTabStatus();
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

}
