import { Injectable } from '@angular/core';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { EN_messages } from 'src/app/Interfaces/enums.enum';
import { IObjectIteratation, IResponses } from 'src/app/Interfaces/ioverall-config';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { UtilsService } from 'src/app/services/utils.service';

import { IChangePassword } from './../Interfaces/inon-manage';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService
  ) { }

  columnSelectedProfile = (): IObjectIteratation[] => {
    return [
      { field: 'firstName', header: 'نام', isSelected: false, readonly: true },
      { field: 'sureName', header: 'نام خانوادگی', isSelected: false, readonly: true },
      { field: 'username', header: 'نام کاربری', isSelected: false, readonly: true },
      { field: 'email', header: 'ایمیل', isSelected: false, readonly: true },
      { field: 'displayName', header: 'نام نمایش', isSelected: false, readonly: true },
      { field: 'userCode', header: 'کد کاربری', isSelected: false, readonly: true }
    ];
  }
  verification = (password: IChangePassword) => {
    if (this.utilsService.isNull(password.oldPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.allowed_empty);
      return false;
    }
    if (this.utilsService.isNull(password.newPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.allowed_empty);
      return false;
    }
    if (this.utilsService.isNull(password.confirmPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.allowed_empty);
      return false;
    }
    if (!this.utilsService.isSameLength(password.newPassword, password.confirmPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.passwords_notFetch);
      return false;
    }
    return true;
  }
  changePassword = (password: IChangePassword) => {
    if (!this.verification(password))
      return;
    return this.interfaceManagerService.POSTBODY(ENInterfaces.changePassword, password).subscribe(res => {
      if (res)
        this.utilsService.snackBarMessageSuccess(res.message);
    });
  }
  getMyInfoDataSource = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GET(ENInterfaces.getMyProfile).subscribe((res: IResponses) => {
          resolve(res)
        });
      });
    } catch (e) {
      console.error(e);

    }
  }
}
