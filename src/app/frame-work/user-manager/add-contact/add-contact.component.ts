import { Component, OnInit } from '@angular/core';
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
  provinceItemsData: any;
  dataSource: any;

  // swtich case title
  switchCaseName: string = '';
  // 

  addContactData: appItems[] = [];
  // province config
  title: string = '';
  allComplete: boolean = false;
  status: boolean = false;
  // 
  // add role config
  roleItemsData: IRoleItems[] = [];
  // 

  constructor(private addUserManagerService: AddUserManagerService,
    private interfaceManagerService: InterfaceManagerService
  ) {
  }
  changeSwitchCase = (item: string) => {
    this.switchCaseName = item;
  }
  addAContact = () => {
    this.addUserManagerService.addAContact(this.dataSource);
  }
  getContactSource = () => {
    this.interfaceManagerService.getAddUserContactManager().subscribe((res: any) => {
      if (res) {
        this.dataSource = res;
        this.provinceItemsData = res.provinceItems;
        this.roleItemsData = res.roleItems;
        this.addContactData = res.appItems;
      }
    })
  }

  ngOnInit(): void {
    // this.dataSource = this.addUserManagerService.addUserManagerConfig();
    this.getContactSource();
  }
  // province checkbox items ////////////////
  someComplete(): boolean {
    const a: Array<any> = [];
    a.push(this.provinceItemsData);
    if (this.provinceItemsData.regionItems == null) {
      return false;
    }
    return this.provinceItemsData.regionItem.filter(t => t.isSelected).length > 0 && !this.allComplete
  }
  setAll(completed: boolean) {

    this.allComplete = completed;
    // if (this.provinceItemsData.regionItems == null) {
    //   return;
    // }
    // console.log(completed);
    this.provinceItemsData.forEach(l1 => {
      l1.isSelected = completed,
        l1.regionItems.forEach(l2 => {
          l2.isSelected = completed,
            l2.zoneItems.forEach(l3 => {
              l3.isSelected = completed
            })
        });
    })
  }
  updateAll = (provinceIt: any) => {
    const a = provinceIt.regionItems.every(l1 => {
      return l1.isSelected
    })
    provinceIt.isSelected = a;
  }
  updateAllL2Complete(regionIt: any) {
    const a = regionIt.zoneItems.every(zoneIt => {
      return zoneIt.isSelected && this.updateAll
    })
    regionIt.isSelected = a;
  }
  setAllL2(completed: boolean, subtask: any) {
    subtask.zoneItems.forEach(t => {
      t.isSelected = completed
    });
  }
  provinceDisplayType = () => {
    let a = document.querySelector('._content') as HTMLElement;
    let b = document.querySelector('.l_3_c') as HTMLElement;
    a.classList.toggle('toggle_content');
    b.classList.toggle('toggle');
  }

  // ////////////

}
