import { Injectable } from '@angular/core';

import { IResponses } from '../Interfaces/iresponses';
import { IUserEditManager } from '../Interfaces/iuser-manager';
import { IAUserEditSave } from './../Interfaces/iuser-manager';
import { InterfaceManagerService } from './interface-manager.service';
import { SnackWrapperService } from './snack-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class EditContactManagerService {
  editContactData: any;
  selectedZones: number[] = [];
  selectedActions: string[] = [];
  selectedPersonalInfos: any;

  constructor(private snackWrapperService: SnackWrapperService, private interfaceManagerService: InterfaceManagerService) { }

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
  connectToServer = (vals: IAUserEditSave) => {
    this.interfaceManagerService.postUserContactManager(vals).subscribe((res: IResponses) => {
      if (res) {
        this.snackWrapperService.openSnackBar(res.message, 5000, 'snack_success');
      }
    });
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
    this.connectToServer(vals)
  }
}