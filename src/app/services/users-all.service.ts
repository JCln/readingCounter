import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {
  ENSelectedColumnVariables,
  ENSnackBarColors,
  ENSnackBarTimes,
  IResponses,
} from 'src/app/Interfaces/ioverall-config';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';

import { ENInterfaces } from '../Interfaces/en-interfaces.enum';
import { IObjectIteratation } from '../Interfaces/ioverall-config';
import { InterfaceManagerService } from './interface-manager.service';

@Injectable({
  providedIn: 'root'
})
export class UsersAllService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  private _usersAll = [
    { field: 'displayName', header: 'نام نمایش', isSelected: true, ltr: false },
    { field: 'username', header: 'نام کاربری', isSelected: true, ltr: false },
    { field: 'userCode', header: 'کد کاربری', isSelected: false, ltr: false },
    { field: 'mobile', header: 'موبایل', isSelected: true, ltr: true },
    { field: 'isActive', header: 'فعال', isSelected: true, ltr: false, isBoolean: true },
    { field: 'isLocked', header: 'قفل', isSelected: true, ltr: false, isBoolean: true }
  ]
  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private snackWrapperService: SnackWrapperService
  ) { }

  columnUserAllUsers = (): IObjectIteratation[] => {
    return this._usersAll;
  }
  customizeSelectedColumns = (_selectCols: any[]) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  connectToServer = (): Observable<any> => {
    return this.interfaceManagerService.GET(ENInterfaces.userGET);
  }
  Activate = (UUID: string) => {
    this.interfaceManagerService.POSTSG(ENInterfaces.userACTIVATE, UUID).toPromise().then((res: IResponses) => {
      this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.fourMili, ENSnackBarColors.success);
    });
  }
  DeActivate = (UUID: string) => {
    this.interfaceManagerService.POSTSG(ENInterfaces.userDEACTIVATE, UUID).toPromise().then((res: IResponses) => {
      this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.fourMili, ENSnackBarColors.success);
    });
  }
  resetPassword = (UUID: string) => {
    return this.interfaceManagerService.POSTSG(ENInterfaces.userRESETPASS, UUID).toPromise().then((res: IResponses) => {
      this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.fourMili, ENSnackBarColors.success);
    });
  }
  setColumnsChanges = (variableName: string, newValues: IObjectIteratation[]) => {
    // convert all items to false
    this[variableName].forEach(old => {
      old.isSelected = false;
    })

    // merge new values
    this[variableName].find(old => {
      newValues.find(newVals => {
        if (newVals.field == old.field)
          old.isSelected = true;
      })
    })
  }
}
