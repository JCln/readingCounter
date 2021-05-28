import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ENSnackBarColors, ENSnackBarTimes } from 'src/app/Interfaces/ioverall-config';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';

import { ENInterfaces } from '../Interfaces/en-interfaces.enum';
import { IObjectIteratation } from '../Interfaces/ioverall-config';
import { InterfaceManagerService } from './interface-manager.service';

@Injectable({
  providedIn: 'root'
})
export class UsersAllService {

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private snackWrapperService: SnackWrapperService
  ) { }

  columnSelectedUserAllUsers = (): IObjectIteratation[] => {
    return [
      { field: 'displayName', header: 'نام نمایش', isSelected: true, ltr: false },
      { field: 'username', header: 'نام کاربری', isSelected: true, ltr: false },
      { field: 'userCode', header: 'کد کاربری', isSelected: true, ltr: false },
      { field: 'mobile', header: 'موبایل', isSelected: true, ltr: true },
      { field: 'isActive', header: 'فعال', isSelected: true, ltr: false, isBoolean: true },
      { field: 'isLocked', header: 'قفل', isSelected: true, ltr: false, isBoolean: true }
    ];
  }
  connectToServer = (): Observable<any> => {
    return this.interfaceManagerService.GET(ENInterfaces.userGET);
  }
  Activate = (UUID: string) => {
    this.interfaceManagerService.POSTSG(ENInterfaces.userACTIVATE, UUID).subscribe(res => {
      this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.fourMili, ENSnackBarColors.success);
    });
  }
  DeActivate = (UUID: string) => {
    this.interfaceManagerService.POSTSG(ENInterfaces.userDEACTIVATE, UUID).subscribe(res => {
      this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.fourMili, ENSnackBarColors.success);
    });
  }
  resetPassword = (UUID: string) => {
    return this.interfaceManagerService.POSTSG(ENInterfaces.userRESETPASS, UUID).subscribe(res => {
      this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.fourMili, ENSnackBarColors.success);
    });
  }
}
