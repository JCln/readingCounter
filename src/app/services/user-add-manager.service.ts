import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ENSnackBarColors, ENSnackBarTimes, IResponses } from 'interfaces/ioverall-config';
import { IAddAUserManager, IAddUserInfos, IAddUserManager, IRoleItems } from 'interfaces/iuser-manager';

import { InterfaceManagerService } from './interface-manager.service';
import { UtilsService } from './utils.service';

@Injectable()
export class UserAddManagerService {
  selectedPersonalInfos: IAddUserInfos;

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService
  ) { }
  // API CALLS 
  getUserAdd = (): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.userADD).toPromise().then((res) => {
        resolve(res);
      });
    })
  }
  addAUserPersonalInfo = (personalItems: any) => {
    this.selectedPersonalInfos = personalItems.value;
  }
  private getAUserProvince = (zoneItems: any): number[] => {
    let selectedZones: number[] = [];
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
  private getAUserRoleItems = (items: IRoleItems[]): number[] => {
    const a: number[] = [];
    items.filter(ids => {
      if (ids.isSelected)
        a.push(ids.id);
    });
    if (this.utilsService.isNull(a))
      return [];
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
  checkEmptyUserInfos = (vals: IAddAUserManager) => {
    if (!this.utilsService.isNullWithText(vals.userCode, EN_messages.insert_karbaricode, ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(vals.username, EN_messages.insert_karbari, ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(vals.password, EN_messages.insert_password, ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(vals.confirmPassword, EN_messages.insert_confirm_pass, ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(vals.firstName, EN_messages.insert_name, ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(vals.sureName, EN_messages.insert_surename, ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(vals.mobile, EN_messages.insert_mobile, ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(vals.displayName, EN_messages.insert_showName, ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(vals.selectedRoles[0], EN_messages.insert_group_access, ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(vals.selectedActions[0], EN_messages.insert_work, ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(vals.selectedZones[0], EN_messages.insert_roleAccess, ENSnackBarColors.warn))
      return false;
    return true;
  }
  passAndConfirmPass = (vals: IAddAUserManager) => {
    if (!this.utilsService.isSameLength(vals.password, vals.confirmPassword)) {
      this.utilsService.snackBarMessage(EN_messages.passwords_notFetch, ENSnackBarTimes.sevenMili, ENSnackBarColors.warn);
      return false;
    }
    if (!this.utilsService.isExactEqual(vals.password, vals.confirmPassword)) {
      this.utilsService.snackBarMessage(EN_messages.password_notExactly, ENSnackBarTimes.sevenMili, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  vertification = (vals: IAddAUserManager) => {
    if (!this.passAndConfirmPass(vals))
      return false;
    if (!this.checkEmptyUserInfos(vals))
      return false;
    if (!this.utilsService.mobileValidation(vals.mobile))
      return false;
    if (!this.utilsService.isNull(vals.email))
      if (!this.utilsService.isEmailValid(vals.email))
        return false;
    return true;
  }
  private connectToServer = (vals: IAddAUserManager) => {
    if (!this.vertification(vals))
      return false;
    this.interfaceManagerService.POSTBODY(ENInterfaces.userADD, vals).subscribe((res: IResponses) => {
      if (res) {
        this.utilsService.snackBarMessage(res.message, ENSnackBarTimes.sevenMili, ENSnackBarColors.success);
        this.utilsService.routeTo('/wr/mu/all');
      }
    });
  }
  userAddA = (dataSource: IAddUserManager, userInputs: IAddUserInfos) => {
    const vals: IAddAUserManager = {
      selectedRoles: this.getAUserRoleItems(dataSource.roleItems),
      selectedZones: this.getAUserProvince(dataSource.provinceItems),
      selectedActions: this.addAUserActions(dataSource.appItems),
      deviceId: userInputs.deviceId,
      displayName: userInputs.displayName,
      email: userInputs.email,
      firstName: userInputs.firstName,
      mobile: userInputs.mobile,
      displayMobile: userInputs.displayMobile,
      sureName: userInputs.sureName,
      userCode: userInputs.userCode,
      password: userInputs.password,
      confirmPassword: userInputs.confirmPassword,
      username: userInputs.username,
      isActive: userInputs.isActive
    }
    this.connectToServer(vals);
  }
}
