import { Injectable } from '@angular/core';

import { IResponses } from '../Interfaces/iresponses';
import { IAUserEditSave, IRoleItems, IUserInfo } from './../Interfaces/iuser-manager';
import { InterfaceManagerService } from './interface-manager.service';
import { SnackWrapperService } from './snack-wrapper.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class EditContactManagerService {
  private selectedZones: number[] = [0];
  private selectedActions: string[] = [];
  private selectedPersonalInfos: any;
  private selectedRoles: IRoleItems[] = [];

  constructor(
    private snackWrapperService: SnackWrapperService,
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService
  ) { }

  addAUserPersonalInfo = (personalItems: IUserInfo) => {
    this.selectedPersonalInfos = personalItems;
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
  addAUserRoles = (roleItems: IRoleItems[]) => {
    this.selectedRoles = roleItems;
  }
  private getAUserRoleItems = (): number[] => {
    const a: number[] = [];
    this.selectedRoles.filter(ids => {
      if (ids.isSelected)
        a.push(ids.id);
    });
    if (this.utilsService.isNull(a))
      return [0];
    return a;
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
  private connectToServer = (vals: IAUserEditSave) => {
    this.interfaceManagerService.postUserContactManager(vals).subscribe((res: IResponses) => {
      if (res) {
        this.snackWrapperService.openSnackBar(res.message, 5000, 'snack_success');
        this.utilsService.routeTo('/wr/mu/all');
      }
    });
  }
  editAUserContact = (UUid: string) => {
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
    this.connectToServer(vals);
  }
}