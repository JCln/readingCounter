import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { appItems, IAUserEditSave, IRoleItems, IUserEditManager, IUserInfo } from './../../../Interfaces/iuser-manager';
import { EditContactManagerService } from './../../../services/edit-contact-manager.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  UUid: string = '';
  editContactData: appItems[] = [];
  roleItems: IRoleItems[] = [];
  userInfos;
  allUserData: IUserEditManager;

  constructor(
    private route: ActivatedRoute,
    private editContactManagerService: EditContactManagerService,
    private interfaceManagerService: InterfaceManagerService
  ) {
  }

  getContactSource = () => {
    this.interfaceManagerService.getUserContactManager(this.UUid).subscribe((res: IUserEditManager) => {
      if (res) {
        this.allUserData = res;
        this.editContactData = res.appItems;
      }
    })
  }
  editContactSource = async () => {
    const a = await this.editAUserContact();
    console.log(a);

    this.interfaceManagerService.postUserContactManager(a).subscribe(res => {
      if (res) {
        console.log(res);

      }
    })
  }
  ngOnInit(): void {
    this.UUid = this.route.snapshot.paramMap.get('id');
    this.getContactSource();
  }

  // gather data for edit ///////////////
  getSelectedActions = (): string[] => {
    const selectedActions: string[] = [];
    this.editContactData.map(vals1 => {
      vals1.moduleItems.map(vals2 => {
        vals2.controllerItems.map(vals3 => {
          vals3.actionItems.map(vals4 => {
            if (vals4.isSelected === true)
              selectedActions.push(vals4.value);
            if (vals4.isSelected === false)
              vals4.value = ''
          })
        })
      })
    })
    return selectedActions;
  }
  getSelectedRoles = (): number[] => {
    this.roleItems = this.allUserData.roleItems;
    return this.roleItems.map(ids => {
      return ids.id
    })
  }
  getSelectedZones = (): number[] => {
    return [0];
  }
  getUserInfos = (): IUserInfo => {
    return this.allUserData.userInfo;
  }
  editAUserContact = (): Promise<IAUserEditSave> => {
    return new Promise((resolve) => {
      const userInfo = this.getUserInfos();
      const vals = {
        selectedRoles: this.getSelectedRoles(),
        selectedZones: this.getSelectedZones(),
        selectedActions: this.getSelectedActions(),
        id: userInfo.id,
        deviceId: userInfo.deviceId,
        displayName: userInfo.displayName,
        email: userInfo.email,
        firstName: userInfo.firstName,
        mobile: userInfo.mobile,
        displayMobile: userInfo.displayMobile,
        sureName: userInfo.sureName
      }
      resolve(vals)
    });
  }

  // ///////////

}
