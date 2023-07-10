import { CloseTabService } from 'services/close-tab.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ENSnackBarColors, ENSnackBarTimes, IResponses } from 'interfaces/ioverall-config';
import { IAddAUserManager, IAddUserInfos, IAddUserManager, IRoleItems, ISearchUsersManager } from 'interfaces/iuser-manager';

import { MathS } from '../classes/math-s';
import { EN_Routes } from '../interfaces/routes.enum';
import { InterfaceManagerService } from './interface-manager.service';
import { UtilsService } from './utils.service';

@Injectable()
export class UserAddManagerService {
  selectedPersonalInfos: IAddUserInfos;

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService,
    private closeTabService: CloseTabService
  ) { }

  // API CALLS 
  getUserAdd = (): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.userADD).toPromise().then(res => {
        resolve(res);
      });
    })
  }
  postUserBody = (method: ENInterfaces, body: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(method, body).toPromise().then(res => {
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
    if (MathS.isNull(a))
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
    if (MathS.isNull(vals.userCode)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_karbaricode);
      return false;
    }
    if (MathS.isNull(vals.username)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_karbari);
      return false;
    }
    if (MathS.isNull(vals.password)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_password);
      return false;
    }
    if (MathS.isNull(vals.confirmPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_confirm_pass);
      return false;
    }
    if (!MathS.isSameLength(vals.password, vals.confirmPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.passwords_notFetch);
      return false;
    }
    if (!MathS.isExactEqual(vals.password, vals.confirmPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.password_notExactly)
      return false;
    }
    if (MathS.isNull(vals.firstName)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_name);
      return false;
    }
    if (MathS.isNull(vals.sureName)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_surename);
      return false;
    }
    if (MathS.isNull(vals.mobile)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_mobile);
      return false;
    }
    if (!MathS.mobileValidation(vals.mobile)) {
      this.utilsService.snackBarMessageWarn(EN_messages.invalid_mobile);
      return false;
    }
    if (MathS.isNull(vals.displayName)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_showName);
      return false;
    }
    if (!MathS.isNull(vals.email) && !MathS.isEmailValid(vals.email)) {
      this.utilsService.snackBarMessageWarn(EN_messages.invalid_email);
      return false;
    }
    if (MathS.isNull(vals.selectedRoles[0])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_group_access);
      return false;
    }
    if (MathS.isNull(vals.selectedActions[0])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_work);
      return false;
    }
    if (MathS.isNull(vals.selectedZones[0])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_roleAccess);
      return false;
    }

    return true;
  }
  toDefaultValsUserAddInfos = () => {
    this.closeTabService._userAddUserInfos = {
      userCode: null,
      username: null,
      password: null,
      confirmPassword: null,
      firstName: '',
      sureName: '',
      email: '',
      mobile: '',
      displayMobile: false,
      displayName: '',
      isActive: true,
      deviceId: ''
    }
  }
  private connectToServer = (vals: IAddAUserManager) => {
    if (!this.checkEmptyUserInfos(vals))
      return false;
    this.interfaceManagerService.POSTBODY(ENInterfaces.userADD, vals).subscribe((res: IResponses) => {
      if (res) {
        this.toDefaultValsUserAddInfos();
        this.utilsService.snackBarMessage(res.message, ENSnackBarTimes.sevenMili, ENSnackBarColors.success);
        this.utilsService.routeTo(EN_Routes.wrmuall);
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
  userSearchConnectToServer = (dataSource: any): ISearchUsersManager => {
    const vals: ISearchUsersManager = {
      selectedRoles: this.getAUserRoleItems(dataSource.roleItems),
      selectedZones: this.getAUserProvince(dataSource.provinceItems),
      selectedActions: this.addAUserActions(dataSource.appItems),
    }
    return vals;
  }
}
