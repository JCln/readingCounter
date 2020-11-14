import { Injectable } from '@angular/core';

import { IAddUserManager } from './../Interfaces/iuser-manager';

@Injectable({
  providedIn: 'root'
})
export class AddUserManagerService {
  dataSource: any;
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
    return this.dataSource.roleItems.map(ids => {
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
  addAContact = (dataSource: IAddUserManager) => {
    this.dataSource = dataSource;
    const vals = {
      selectedRoles: this.getAUserRoleItems(),
      selectedZones: this.selectedZones,
      selectedActions: this.selectedActions,
      deviceId: this.selectedPersonalInfos.deviceId,
      displayName: this.selectedPersonalInfos.displayName,
      email: this.selectedPersonalInfos.email,
      firstName: this.selectedPersonalInfos.firstName,
      mobile: this.selectedPersonalInfos.mobile,
      displayMobile: this.selectedPersonalInfos.displayMobile,
      sureName: this.selectedPersonalInfos.sureName,
      userCode: this.selectedPersonalInfos.userCode,
      isActive: this.selectedPersonalInfos.isActive
    }
    console.log(vals);
  }
}
