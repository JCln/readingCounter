import { AjaxReqWrapperService } from 'services/ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENSnackBarColors } from 'interfaces/enums.enum';
import { IAddAUserManager, IAddUserInfos, IAddUserManager, IRoleItems, ISearchUsersManager } from 'interfaces/iuser-manager';

import { MathS } from '../classes/math-s';
import { EN_Routes } from '../interfaces/routes.enum';
import { UtilsService } from './utils.service';
import { Converter } from '../classes/converter';
import { VerificationService } from './verification.service';

@Injectable()
export class UserAddManagerService {
  selectedPersonalInfos: IAddUserInfos;

  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    private utilsService: UtilsService,
    public verificationService: VerificationService
  ) { }

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
  private connectToServer = async (vals: IAddAUserManager) => {
    if (!this.verificationService.checkUserAddInfos(vals))
      return false;

    const res = await this.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.userADD, vals);
    if (res) {
      this.utilsService.snackBarMessage(res.message, ENSnackBarColors.success);
      this.utilsService.routeTo(EN_Routes.wrmuall);
    }
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
      mobile: Converter.persianToEngNumbers(userInputs.mobile),
      displayMobile: userInputs.displayMobile,
      sureName: userInputs.sureName,
      userCode: userInputs.userCode,
      password: Converter.persianToEngNumbers(userInputs.password),
      confirmPassword: Converter.persianToEngNumbers(userInputs.confirmPassword),
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
