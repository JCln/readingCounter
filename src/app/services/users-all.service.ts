import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackWrapperService } from 'services/snack-wrapper.service';
import {
  ENSelectedColumnVariables,
  ENSnackBarColors,
  ENSnackBarTimes,
  IResponses,
} from 'src/app/Interfaces/ioverall-config';

import { ConfirmTextDialogComponent } from '../frame-work/manage/tracking/confirm-text-dialog/confirm-text-dialog.component';
import { ENInterfaces } from '../Interfaces/en-interfaces.enum';
import { EN_messages } from '../Interfaces/enums.enum';
import { IObjectIteratation } from '../Interfaces/ioverall-config';
import { InterfaceManagerService } from './interface-manager.service';
import { SectionsService } from './sections.service';

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
  private _userRoles = [
    { field: 'title', header: 'عنوان', isSelected: true },
    // { field: 'isActive', header: 'فعال', isSelected: true, isBoolean: true },
    { field: 'needDeviceIdLogin', header: 'سریال اجباری', isSelected: true, isBoolean: true },
    { field: 'titleUnicode', header: 'عنوان فارسی', isSelected: true }
  ]
  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private snackWrapperService: SnackWrapperService,
    private sectionsService: SectionsService,
    private dialog: MatDialog
  ) { }

  /* COLUMNS */
  columnUserRoles = (): IObjectIteratation[] => {
    return this._userRoles;
  }
  columnUserAllUsers = (): IObjectIteratation[] => {
    return this._usersAll;
  }
  customizeSelectedColumns = (_selectCols: any[]) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  /* API CALLS */
  connectToServer = (method: ENInterfaces): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(method).toPromise().then(res => {
        resolve(res);
      })
    });
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
  roleAddEdit = (apiUse: ENInterfaces, value: any): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(apiUse, value).subscribe((res: IResponses) => {
        this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.fourMili, ENSnackBarColors.success);
        resolve(res);
      })
    });
  }
  deleteSingleRow = (place: ENInterfaces, id: number) => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POST(place, id).subscribe((res: IResponses) => {
        this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.fourMili, ENSnackBarColors.success);
        resolve(true);
      })
    });
  }
  firstConfirmDialog = (): Promise<any> => {
    const title = EN_messages.confirm_remove;
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        minWidth: '19rem',
        data: {
          title: title,
          isInput: false,
          isDelete: true
        }
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          resolve(desc);
        }
      })
    })
  }
  /* VALIDATION & VERIFICATION */
  verification = (dataSource: any): boolean => {
    this.sectionsService.setSectionsValue(dataSource);
    if (!this.sectionsService.sectionVertification())
      return false;
    return true;
  }

}
