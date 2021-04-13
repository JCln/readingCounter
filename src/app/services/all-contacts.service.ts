import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ENSnackBarColors, ENSnackBarTimes } from 'src/app/Interfaces/ioverall-config';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';
import { UtilsService } from 'src/app/services/utils.service';

import { IObjectIteratation } from '../Interfaces/ioverall-config';
import { InterfaceManagerService } from './interface-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AllContactsService {

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private snackWrapperService: SnackWrapperService,
    private utilsService: UtilsService
  ) { }

  columnSelectedUserAllContacts = (): IObjectIteratation[] => {
    return [
      { field: 'isActive', header: 'فعال', isSelected: true, ltr: false },
      { field: 'isLocked', header: 'قفل', isSelected: true, ltr: false },
      { field: 'mobile', header: 'موبایل', isSelected: true, ltr: true },
      { field: 'displayName', header: 'نام نمایش', isSelected: true, ltr: false },
      { field: 'username', header: 'نام کاربری', isSelected: true, ltr: false },
      { field: 'userCode', header: 'کد کاربری', isSelected: true, ltr: false }
    ];
  }
  connectToServer = (): Observable<any> => {
    return this.interfaceManagerService.getAllUserContactsManager();
  }
  Activate = (UUID: string) => {
    this.interfaceManagerService.postUserManagerActivate(UUID).subscribe(res => {
      this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.fourMili, ENSnackBarColors.success);
    });
  }
  DeActivate = (UUID: string) => {
    this.interfaceManagerService.postUserManagerDeActivate(UUID).subscribe(res => {
      this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.fourMili, ENSnackBarColors.success);
    });
  }
  resetPassword = (UUID: string) => {
    return this.interfaceManagerService.postUserManagerResetPassword(UUID).subscribe(res => {
      this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.fourMili, ENSnackBarColors.success);
    });
  }
}
