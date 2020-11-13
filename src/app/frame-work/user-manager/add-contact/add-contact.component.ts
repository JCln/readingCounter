import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { appItems, IAddAUserManager, IAddUserInfos, IRoleItems } from './../../../Interfaces/iuser-manager';
import { AddUserManagerService } from './../../../services/add-user-manager.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
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
  dataSource: any;

  // swtich case title
  switchCaseName: string = '';
  // 
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
    private interfaceManagerService: InterfaceManagerService

  ) {
  }

  changeSwitchCase = (item: string) => {
    this.switchCaseName = item;
  }
  addAContact = () => {
    this.addUserManagerService.addAUserActions(this.addContactData);
  }
  getContactSource = () => {
    this.interfaceManagerService.getAddUserContactManager().subscribe((res: any) => {
      if (res) {
        this.dataSource = res;
        this.roleItemsData = res.roleItems;
        this.addContactData = res.appItems;
      }
    })
  }

  ngOnInit(): void {
    this.getContactSource();

  }


}
