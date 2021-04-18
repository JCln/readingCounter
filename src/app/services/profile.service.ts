import { Injectable } from '@angular/core';
import { IObjectIteratation, IResponses } from 'src/app/Interfaces/ioverall-config';
import { InterfaceService } from 'src/app/services/interface.service';
import { UtilsService } from 'src/app/services/utils.service';

import { IChangePassword } from './../Interfaces/inon-manage';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private interfaceService: InterfaceService,
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
  changePassword = (password: IChangePassword) => {
    return this.interfaceService.changePassword(password).subscribe(res => {
      if (res)
        this.utilsService.snackBarMessageSuccess(res.message);
    });
  }
  getMyInfoDataSource = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceService.getMyProfile().subscribe((res: IResponses) => {
          resolve(res)
        });
      });
    } catch (e) {
      console.error(e);

    }
  }
}
