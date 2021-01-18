import { Injectable } from '@angular/core';

import { IResponses } from './../Interfaces/iresponses';
import { IAUserEditSave, IUserEditManager } from './../Interfaces/iuser-manager';
import { InterfaceManagerService } from './interface-manager.service';
import { SnackWrapperService } from './snack-wrapper.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class EditContactManagerService {
  constructor(
    private snackWrapperService: SnackWrapperService,
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService
  ) { }

  private getAUserProvince = (zoneItems: any): number[] => {
    let selectedZones = [0];
    zoneItems.map(proIt => {
      proIt.regionItems.map(regionIt => {
        regionIt.zoneItems.map(zoneIt => {
          if (zoneIt.isSelected)
            selectedZones.push(zoneIt.id)
        })
      })
    })
    return selectedZones;
  }
  private getAUserRoleItems = (val: any): number[] => {
    const a: number[] = [];
    val.filter(ids => {
      if (ids.isSelected)
        a.push(ids.id);
    });
    if (this.utilsService.isNull(a))
      return [0];
    return a;
  }
  private addAUserActions = (actionItems: any): string[] => {
    let selectedActions: string[] = [];
    actionItems.map(appIt => {
      appIt.moduleItems.map(moduleIt => {
        moduleIt.controllerItems.map(ctrlIt => {
          ctrlIt.actionItems.map(actionIt => {
            if (actionIt.isSelected) {
              selectedActions.push(actionIt.value)
            }
          })
        })
      })
    })
    return selectedActions;
  }
  private connectToServer = (vals: any) => {
    this.interfaceManagerService.postUserContactManager(vals).subscribe((res: IResponses) => {
      if (res) {
        this.snackWrapperService.openSnackBar(res.message, 5000, 'snack_success');
        this.utilsService.routeToByUrl('/wr/mu/all');
      }
    });
  }
  editAUserContact = (UUid: string, dataSource: IUserEditManager) => {
    const vals: IAUserEditSave = {
      selectedRoles: this.getAUserRoleItems(dataSource.roleItems),
      selectedZones: this.getAUserProvince(dataSource.provinceItems),
      selectedActions: this.addAUserActions(dataSource.appItems),
      id: UUid,
      firstName: dataSource.userInfo.firstName,
      sureName: dataSource.userInfo.sureName,
      email: dataSource.userInfo.email,
      mobile: dataSource.userInfo.mobile,
      displayMobile: dataSource.userInfo.displayMobile,
      displayName: dataSource.userInfo.displayName,
      deviceId: dataSource.userInfo.deviceId
    }
    this.connectToServer(vals);
  }
}