import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ENSnackBarColors, ENSnackBarTimes, IResponses } from 'interfaces/ioverall-config';
import { IAddUserManager, IAUserEditSave, IUserEditManager, IUserEditOnRole } from 'interfaces/iuser-manager';

import { MathS } from '../classes/math-s';
import { ConfirmTextDialogComponent } from '../frame-work/manage/tracking/confirm-text-dialog/confirm-text-dialog.component';
import { EN_Routes } from '../Interfaces/routes.enum';
import { InterfaceManagerService } from './interface-manager.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class UserEditManagerService {
  dataSource: IAUserEditSave;
  userEditOnRoleRoleVal: number;

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService,
    private dialog: MatDialog
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
    if (MathS.isNull(a))
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
  checkEmptyUserInfos = () => {
    if (MathS.isNull(this.dataSource.firstName)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_name);
      return false;
    }
    if (MathS.isNull(this.dataSource.sureName)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_surename);
      return false;
    }
    if (MathS.isNull(this.dataSource.mobile)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_mobile);
      return false;
    }
    if (MathS.isNull(this.dataSource.displayName)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_showName);
      return false;
    }
    if (MathS.isNull(this.dataSource.selectedRoles[0])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_group_access);
      return false;
    }
    if (MathS.isNull(this.dataSource.selectedActions[0])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_work);
      return false;
    }
    if (MathS.isNull(this.dataSource.selectedZones[1])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_roleAccess);
      return false;
    }

    return true;
  }
  vertification = () => {
    if (!this.checkEmptyUserInfos()) {
      return false;
    }
    if (!MathS.mobileValidation(this.dataSource.mobile)) {
      this.utilsService.snackBarMessageWarn(EN_messages.invalid_mobile);
      return false;
    }
    if (!MathS.isNull(this.dataSource.email))
      if (!MathS.isEmailValid(this.dataSource.email)) {
        this.utilsService.snackBarMessageWarn(EN_messages.invalid_email);
        return false;
      }

    return true;
  }
  private connectToServerEdit = async (vals: IAUserEditSave) => {
    this.dataSource = vals;
    if (!this.vertification())
      return;
    if (await this.firstConfirmDialog(EN_messages.confirm_userChange)) {
      this.interfaceManagerService.POSTBODY(ENInterfaces.userEDIT, vals).subscribe((res: IResponses) => {
        if (res) {
          this.utilsService.snackBarMessage(res.message, ENSnackBarTimes.fiveMili, ENSnackBarColors.success);
          this.utilsService.routeToByUrl(EN_Routes.wrmuall);
        }
      });
    }
  }
  userEditA = (UUid: string, dataSource: IUserEditManager) => {
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
      deviceId: dataSource.userInfo.deviceId,
      isActive: dataSource.userInfo.isActive
    }
    this.connectToServerEdit(vals);
  }
  getUserAdd = (): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.userADD).toPromise().then(res => {
        resolve(res);
      });
    })
  }
  private connectToServerEditOnRole = (dataSource: IUserEditOnRole) => {
    this.interfaceManagerService.POSTBODY(ENInterfaces.userEditOnRole, dataSource).toPromise().then((res: IResponses) => {
      this.utilsService.snackBarMessage(res.message, ENSnackBarTimes.sevenMili, ENSnackBarColors.success);
    });
  }
  private verificationEditOnRole = (dataSource: IUserEditOnRole) => {
    if (MathS.isNull(dataSource.roleId)) {
      this.utilsService.snackBarMessage(EN_messages.insert_group_access, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    if (MathS.isNull(dataSource.selectedActions[0])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_work);
      return false;
    }

    return true;
  }
  userEditOnRole = async (dataSource: IAddUserManager) => {
    const val: IUserEditOnRole = {
      roleId: this.userEditOnRoleRoleVal,
      selectedActions: this.addAUserActions(dataSource.appItems),
    }
    if (!this.verificationEditOnRole(val))
      return;
    if (await this.firstConfirmDialog(EN_messages.confirm_userGroupChange))
      this.connectToServerEditOnRole(val);
  }
  userEditOnRoleInsertRole = (val: any) => {
    this.userEditOnRoleRoleVal = val;
  }
  firstConfirmDialog = (reason: EN_messages): Promise<any> => {
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        minWidth: '19rem',
        data: {
          title: reason,
          isInput: false,
          isDelete: true
        }
      });
      dialogRef.afterClosed().subscribe(async desc => {
        if (desc) {
          resolve(desc)
        }
      })
    })
  }

}