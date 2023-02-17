import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { INotifyDirectImage } from 'interfaces/inon-manage';
import {
  ENSelectedColumnVariables,
  ENSnackBarColors,
  ENSnackBarTimes,
  IObjectIteratation,
  IResponses,
} from 'interfaces/ioverall-config';
import { IAddUserManager, IAUserEditSave, IUserEditManager, IUserEditOnRole } from 'interfaces/iuser-manager';
import { EN_Routes } from 'interfaces/routes.enum';
import { Observable } from 'rxjs/internal/Observable';
import { SnackWrapperService } from 'services/snack-wrapper.service';

import { MathS } from '../classes/math-s';
import { InterfaceManagerService } from './interface-manager.service';
import { SectionsService } from './sections.service';
import { UtilsService } from './utils.service';

export interface IUserEditNessessities {
  GUid: string
}
@Injectable({
  providedIn: 'root'
})
export class UsersAllService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  userEditOnRoleRoleVal: number;
  userEdit_pageSign: IUserEditNessessities = {
    GUid: null,
  };

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
    private utilsService: UtilsService,
  ) { }

  /* COLUMNS */
  columnUserRoles = (): IObjectIteratation[] => {
    return this._userRoles;
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
  snackBarMessageSuccess = (res: IResponses) => {
    this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.fiveMili, ENSnackBarColors.success);
  }
  changeUserStatus = (method: ENInterfaces, UUID: string) => {
    this.interfaceManagerService.POSTSG(method, UUID).toPromise().then((res: IResponses) => {
      this.snackBarMessageSuccess(res);
    });
  }
  routeToUsersAll = () => {
    this.utilsService.routeTo(EN_Routes.wrmuall);
  }
  routeToEditPage(e) {
    this.userEdit_pageSign.GUid = e;
    this.utilsService.routeTo(EN_Routes.wrmuedit);
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
  deleteSingleRow = (place: ENInterfaces, id: number) => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTById(place, id).subscribe((res: IResponses) => {
        this.snackBarMessageSuccess(res);
        resolve(true);
      })
    });
  }
  firstConfirmDialog = (reason: EN_messages, reasonTwo?: EN_messages, doesNotReturnButton?: boolean): Promise<any> => {
    const a = {
      messageTitle: reason,
      messageTitle2: reasonTwo,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      doesNotReturnButton: doesNotReturnButton
    }
    return this.utilsService.firstConfirmDialog(a);
  }

  /* VALIDATION & VERIFICATION */
  verification = (dataSource: any): boolean => {
    this.sectionsService.setSectionsValue(dataSource);
    if (!this.sectionsService.sectionVertification())
      return false;
    return true;
  }
  private getAUserProvince = (zoneItems: any): number[] => {
    let selectedZones = [0];
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
  private getAUserRoleItems = (val: any): number[] => {
    const a: number[] = [];
    val.filter(ids => {
      if (ids.isSelected)
        a.push(ids.id);
    });
    if (MathS.isNull(a))
      return [0];
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
  checkEmptyUserInfos = (dataSource: IAUserEditSave) => {
    if (MathS.isNull(dataSource.firstName)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_name);
      return false;
    }
    if (MathS.isNull(dataSource.sureName)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_surename);
      return false;
    }
    if (MathS.isNull(dataSource.mobile)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_mobile);
      return false;
    }
    if (MathS.isNull(dataSource.displayName)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_showName);
      return false;
    }
    if (MathS.isNull(dataSource.selectedRoles[0])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_group_access);
      return false;
    }
    if (MathS.isNull(dataSource.selectedActions[0])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_work);
      return false;
    }
    if (MathS.isNull(dataSource.selectedZones[1])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_roleAccess);
      return false;
    }

    return true;
  }
  vertification = (dataSource: IAUserEditSave) => {
    if (!this.checkEmptyUserInfos(dataSource)) {
      return false;
    }
    if (!MathS.mobileValidation(dataSource.mobile)) {
      this.utilsService.snackBarMessageWarn(EN_messages.invalid_mobile);
      return false;
    }
    if (!MathS.isNull(dataSource.email))
      if (!MathS.isEmailValid(dataSource.email)) {
        this.utilsService.snackBarMessageWarn(EN_messages.invalid_email);
        return false;
      }

    return true;
  }
  private connectToServerEdit = async (vals: IAUserEditSave) => {
    if (this.vertification(vals)) {

      if (await this.firstConfirmDialog(EN_messages.confirm_userChange)) {
        this.interfaceManagerService.POSTBODY(ENInterfaces.userEDIT, vals).subscribe((res: IResponses) => {
          if (res) {
            this.utilsService.snackBarMessage(res.message, ENSnackBarTimes.fiveMili, ENSnackBarColors.success);
            this.utilsService.routeToByUrl(EN_Routes.wrmuall);
          }
        });
      }
    }

  }
  userEditA = (UUid: string, dataSource: IUserEditManager) => {
    const vals: IAUserEditSave = {
      selectedRoles: this.getAUserRoleItems(dataSource.roleItems),
      selectedZones: this.getAUserProvince(dataSource.provinceItems),
      selectedActions: this.addAUserActions(dataSource.appItems),
      id: UUid,
      firstName: dataSource.userInfo.firstName,
      sureName: dataSource.userInfo.sureName,
      email: dataSource.userInfo.email,
      mobile: dataSource.userInfo.mobile,
      displayMobile: dataSource.userInfo.displayMobile,
      displayName: dataSource.userInfo.displayName,
      deviceId: dataSource.userInfo.deviceId,
      isActive: dataSource.userInfo.isActive
    }
    this.connectToServerEdit(vals);
  }
  getUserInfoByGUID = (guid: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETID(ENInterfaces.userEDIT, guid).toPromise().then(res => {
        resolve(res);
      });
    })
  }
  postDataSource = (method: ENInterfaces, body: object): Promise<any> => {
    return new Promise(resolve => {
      this.interfaceManagerService.POSTBODY(method, body).toPromise().then((res: any) => {
        resolve(res);
      });
    });
  }
  private verificationEditOnRole = (dataSource: IUserEditOnRole) => {
    if (MathS.isNull(dataSource.roleId)) {
      this.utilsService.snackBarMessage(EN_messages.insert_group_access, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    if (MathS.isNull(dataSource.selectedActions[0])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_work);
      return false;
    }

    return true;
  }
  userEditOnRole = async (dataSource: IAddUserManager) => {
    const val: IUserEditOnRole = {
      roleId: this.userEditOnRoleRoleVal,
      selectedActions: this.addAUserActions(dataSource.appItems),
    }
    if (!this.verificationEditOnRole(val))
      return;
    if (await this.firstConfirmDialog(EN_messages.confirm_userGroupChange)) {
      const res = await this.postDataSource(ENInterfaces.userEditOnRole, val);
      if (res)
        this.snackBarMessageSuccess(res);
    }
  }
  userEditOnRoleInsertRole = (val: any) => {
    this.userEditOnRoleRoleVal = val;
  }
  postNotifyDirectImage = (filesList: any, val: INotifyDirectImage): Observable<any> => {
    const formData: FormData = new FormData();

    formData.append('caption', val.caption);
    formData.append('userId', val.userId);
    formData.append('file', filesList[0]);

    return this.interfaceManagerService.POSTBODYPROGRESS(ENInterfaces.signalRNotifDirectImage, formData);

  }
  postNotifyDirectVideo = (filesList: any, val: INotifyDirectImage): Observable<any> => {
    const formData: FormData = new FormData();

    formData.append('caption', val.caption);
    formData.append('userId', val.userId);
    formData.append('file', filesList[0]);

    return this.interfaceManagerService.POSTBODYPROGRESS(ENInterfaces.signalRNotifDirectVideo, formData);

  }
  checkVertiticationNotifDirectImage = (fileForm: FileList, val: INotifyDirectImage): boolean => {

    if (MathS.isNull(val.caption)) {
      this.snackWrapperService.openSnackBar(EN_messages.insert_caption, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    if (MathS.isNull(fileForm)) {
      this.snackWrapperService.openSnackBar(EN_messages.insert_Image, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    if (
      fileForm[0].name.split('.').pop() === 'jpg'
      || fileForm[0].name.split('.').pop() === 'JPG'
      || fileForm[0].name.split('.').pop() === 'JPEG'
      || fileForm[0].name.split('.').pop() === 'jpeg') {
      return true;
    }
    else {
      this.snackWrapperService.openSnackBar(EN_messages.should_insert_JPG, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    // return true;
  }
  checkVertiticationNotifDirectVideo = (fileForm: FileList, val: INotifyDirectImage): boolean => {

    if (MathS.isNull(val.caption)) {
      this.snackWrapperService.openSnackBar(EN_messages.insert_caption, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    if (MathS.isNull(fileForm)) {
      this.snackWrapperService.openSnackBar(EN_messages.insert_video, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    if (
      fileForm[0].name.split('.').pop() === 'mp4'
      || fileForm[0].name.split('.').pop() === 'MP4'
      || fileForm[0].name.split('.').pop() === 'ogg'
      || fileForm[0].name.split('.').pop() === 'OGG`') {
      return true;
    }
    else {
      this.snackWrapperService.openSnackBar(EN_messages.should_insert_video, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    // return true;
  }
}
