import { Injectable } from '@angular/core';

import { IUserEditManager } from '../Interfaces/iuser-manager';

@Injectable({
  providedIn: 'root'
})
export class EditContactManagerService {
  editContactData: any;
  selectedZones: number[] = [];
  selectedActions: string[] = [];
  selectedPersonalInfos: any;

  addAUserPersonalInfo = (personalItems: any) => {
    this.selectedPersonalInfos = personalItems.value;
  }
  getAUserProvince = (zoneItems: any) => {
    zoneItems.map(proIt => {
      proIt.regionItems.map(regionIt => {
        regionIt.zoneItems.map(zoneIt => {
          if (zoneIt.isSelected)
            this.selectedZones.push(zoneIt.id)
        })
      })
    })
  }
  private getAUserRoleItems = (): number[] => {
    return this.editContactData.roleItems.map(ids => {
      return ids.id
    });
  }
  addAUserActions = (actionItems: any) => {
    actionItems.map(appIt => {
      appIt.moduleItems.map(moduleIt => {
        moduleIt.controllerItems.map(ctrlIt => {
          ctrlIt.actionItems.map(actionIt => {
            if (actionIt.isSelected) {
              this.selectedActions.push(actionIt.value)
            }
          })
        })
      })
    })
  }
  editAUserContact = (dataSource: IUserEditManager, UUid: string) => {
    this.editContactData = dataSource;
    const vals = {
      selectedRoles: this.getAUserRoleItems(),
      selectedZones: this.selectedZones,
      selectedActions: this.selectedActions,
      id: UUid,
      firstName: this.selectedPersonalInfos.firstName,
      sureName: this.selectedPersonalInfos.sureName,
      email: this.selectedPersonalInfos.email,
      mobile: this.selectedPersonalInfos.mobile,
      displayMobile: this.selectedPersonalInfos.displayMobile,
      displayName: this.selectedPersonalInfos.displayName,
      deviceId: this.selectedPersonalInfos.deviceId
    }
    console.log(vals);
  }
}