import { Injectable } from '@angular/core';

import { ENSnackBarColors, IResponses } from './../Interfaces/ioverall-config';
import { IAddAUserManager, IAddUserInfos, IAddUserManager, IRoleItems } from './../Interfaces/iuser-manager';
import { InterfaceManagerService } from './interface-manager.service';
import { SnackWrapperService } from './snack-wrapper.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class AddUserManagerService {
  private _m_timeLength: number = 5000;
  dataSource: any;
  selectedPersonalInfos: IAddUserInfos;

  constructor(
    private snackWrapperService: SnackWrapperService,
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService
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
    if (!this.utilsService.isNullWithText(vals.username, 'نام کاربری را وارد نمایید', ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(vals.password, 'گذرواژه را وارد نمایید', ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(vals.confirmPassword, 'تکرار گذرواژه را وارد نمایید', ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(vals.firstName, 'نام را وارد نمایید', ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(vals.sureName, 'نام خانوادگی را وارد نمایید', ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(vals.mobile, 'شماره موبایل را وارد نمایید', ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(vals.displayName, 'نام نمایش را وارد نمایید', ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(vals.selectedRoles[0], 'گروه دسترسی را مشخص نمایید', ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(vals.selectedActions[0], 'خدمتی را مشخص نمایید', ENSnackBarColors.warn))
      return false;
    if (!this.utilsService.isNullWithText(vals.selectedZones[0], 'سطح دسترسی به ناحیه ای را انتخاب نمایید', ENSnackBarColors.warn))
      return false;
    return true;
  }
  passAndConfirmPass = (vals: IAddAUserManager) => {
    if (!this.utilsService.isSameLength(vals.password, vals.confirmPassword)) {
      this.snackWrapperService.openSnackBar('تعداد ارقام گذرواژه با تایید آن برابر نیست', this._m_timeLength, ENSnackBarColors.warn);
      return false;
    }
    if (!this.utilsService.isExactEqual(vals.password, vals.confirmPassword)) {
      this.snackWrapperService.openSnackBar('گذرواژه با تایید آن یکی باید باشد', this._m_timeLength, ENSnackBarColors.warn);
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
    if (vals.email)
      if (!this.utilsService.isEmailValid(vals.email))
        return false;
    return true;
  }
  connectToServer = (vals: IAddAUserManager) => {
    if (!this.vertification(vals))
      return false;
    this.interfaceManagerService.postAddContact(vals).subscribe((res: IResponses) => {
      if (res) {
        this.snackWrapperService.openSnackBar(res.message, this._m_timeLength, ENSnackBarColors.success);
      }
    });
  }
  addAContact = (dataSource: IAddUserManager, userInputs: IAddUserInfos) => {
    this.dataSource = dataSource;
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
