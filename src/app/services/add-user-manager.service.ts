import { Injectable } from '@angular/core';

import { IAddUserManager } from './../Interfaces/iuser-manager';

@Injectable({
  providedIn: 'root'
})
export class AddUserManagerService {
  dataSource: any;
  selectedZones: number[] = [];
  selectedActions: string[] = [];

  constructor() { }

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
  getSelectedActions = (): string[] => {
    const selectedActions: string[] = [];
    this.dataSource.appItems.map(vals1 => {
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
      // deviceId: aUserInfo.deviceId,
      // displayName: aUserInfo.displayName,
      // email: aUserInfo.email,
      // firstName: aUserInfo.firstName,
      // mobile: aUserInfo.mobile,
      // displayMobile: aUserInfo.displayMobile,
      // sureName: aUserInfo.sureName,
      // userCode: aUserInfo.userCode,
      // isActive: aUserInfo.isActive
    }
    console.log(vals);
  }
}
