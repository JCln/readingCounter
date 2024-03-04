import { AjaxReqWrapperService } from 'services/ajax-req-wrapper.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENLocalStorageNames, ENSelectedColumnVariables, ENSnackBarColors, ENSnackBarTimes, EN_messages } from 'interfaces/enums.enum';
import { INotifyDirectImage } from 'interfaces/inon-manage';
import { IAUserEditSave, IUserEditManager, IUserEditOnRole, IUserEditOnRoleManager } from 'interfaces/iuser-manager';
import { EN_Routes } from 'interfaces/routes.enum';
import { Observable } from 'rxjs/internal/Observable';

import { MathS } from '../classes/math-s';
import { SectionsService } from './sections.service';
import { UtilsService } from './utils.service';
import { IObjectIteratation, IResponses } from 'interfaces/ioverall-config';
import { IIOPolicy } from 'interfaces/iserver-manager';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { MapService } from './map.service';
import { Converter } from '../classes/converter';

export interface IUserEditNessessities {
  GUid: string
}
interface IIDTitle {
  id: number,
  title: string
}
@Injectable({
  providedIn: 'root'
})
export class UsersAllService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  userEditOnRoleRoleVal: IIDTitle;
  userEdit_pageSign: IUserEditNessessities = {
    GUid: null
  };
  latestZoneViewType: boolean = false;

  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    private sectionsService: SectionsService,
    private utilsService: UtilsService,
    public dictionaryWrapperService: DictionaryWrapperService,
    private columnManager: ColumnManager,
    private mapService: MapService
  ) { }

  /* COLUMNS */
  columnUserRoles = (): IObjectIteratation[] => {
    return this.columnManager._userRoles;
  }
  customizeSelectedColumns = (_selectCols: any[]) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  snackBarMessageSuccess = (res: IResponses) => {
    this.utilsService.snackBarMessageSuccess(res.message);
  }
  routeToUsersAll = () => {
    this.utilsService.routeTo(EN_Routes.wrmuall);
  }
  routeToEditPage(e) {
    if (e.isRemoved) {
      const message: string = 'کاربر ' + e.displayName + '(' + e.userCode + ')' + EN_messages.userIsRemoved;
      this.utilsService.snackBarMessageWarn(message);
      return;
    }

    this.userEdit_pageSign.GUid = e.id;
    this.utilsService.routeTo(EN_Routes.wrmuedit);
  }
  getLatestZoneViewType = () => {
    if (this.mapService.browserStorageService.isExists(ENLocalStorageNames.latestZoneViewType)) {
      this.latestZoneViewType = this.mapService.browserStorageService.getLocal(ENLocalStorageNames.latestZoneViewType);
    }
    else {
      this.mapService.saveToLocalStorage(ENLocalStorageNames.latestZoneViewType, false);
    }
  }
  routeToAddAUser = () => this.utilsService.routeTo(EN_Routes.wrmuadd);
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
  deleteSingleRow = async (place: ENInterfaces, id: number) => {
    const res = await this.ajaxReqWrapperService.postDataSourceById(place, id);
    this.snackBarMessageSuccess(res);
    return true;
  }
  firstConfirmDialog = (dialogConfig: any): Promise<any> => {
    const a = {
      messageTitle: dialogConfig.messageTitle,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      text: dialogConfig.text,
      icon: dialogConfig.icon ? dialogConfig.icon : 'fas fa-user-lock',
      doesNotReturnButton: dialogConfig.doesNotReturnButton
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
    let selectedZones: any[] = [];
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
  private addAUserActions = (items: any): string[] => {
    let selectedActions: string[] = [];
    items.map(appIt => {
      appIt.moduleItems.map(moduleIt => {
        moduleIt.controllerItems.map(ctrlIt => {
          ctrlIt.actionItems.map(actionIt => {
            if (actionIt.isSelected) {
              selectedActions.push(actionIt.value);
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
    if (MathS.isNull(dataSource.selectedZones)) {
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
    // if (!MathS.isNull(dataSource.email))
    //   if (!MathS.isEmailValid(dataSource.email)) {
    //     this.utilsService.snackBarMessageWarn(EN_messages.invalid_email);
    //     return false;
    //   }

    return true;
  }
  private connectToServerEdit = async (vals: IAUserEditSave) => {
    if (this.vertification(vals)) {
      const text = EN_messages.confirm_userChange + ' ' + vals.displayName + ' ' + EN_messages.confirm_userChange_2;
      if (await this.firstConfirmDialog({ messageTitle: text })) {
        const res = await this.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.userEDIT, vals);
        if (res) {
          this.utilsService.snackBarMessage(res.message, ENSnackBarTimes.fiveMili, ENSnackBarColors.success);
          this.utilsService.routeToByUrl(EN_Routes.wrmuall);
        }
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
      mobile: Converter.persianToEngNumbers(dataSource.userInfo.mobile),
      displayMobile: MathS.isNull(dataSource.userInfo.displayMobile) ? false : dataSource.userInfo.displayMobile,
      displayName: dataSource.userInfo.displayName,
      deviceId: dataSource.userInfo.deviceId,
      isActive: dataSource.userInfo.isActive
    }
    this.connectToServerEdit(vals);
  }
  private verificationEditOnRoleGroupAccess = (dataSource: any) => {
    if (MathS.isNull(dataSource)) {
      this.utilsService.snackBarMessage(EN_messages.insert_group_access, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  private verificationEditOnRole = (dataSource: IUserEditOnRole) => {
    if (MathS.isNull(dataSource.selectedActions[0])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_work);
      return false;
    }
    return true;
  }
  userEditOnRole = async (dataSource: IUserEditOnRoleManager) => {
    if (this.verificationEditOnRoleGroupAccess(this.userEditOnRoleRoleVal)) {

      const val: IUserEditOnRole = {
        roleId: this.userEditOnRoleRoleVal.id,
        selectedActions: this.addAUserActions(dataSource.appItems)
      }

      if (this.verificationEditOnRole(val)) {
        const text = EN_messages.confirm_userGroupChange_1 + ' ' + this.userEditOnRoleRoleVal.title + ' ' + EN_messages.confirm_userGroupChange_2;
        if (await this.firstConfirmDialog({ messageTitle: text })) {
          const res = await this.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.userEditOnRole, val);
          if (res)
            this.snackBarMessageSuccess(res);
        }
      }
    }
  }
  userEditOnRoleInsertRole = (val: any) => {
    this.userEditOnRoleRoleVal = val;
    console.log(this.userEditOnRoleRoleVal);

  }
  postNotifyDirectImage = (filesList: any, val: INotifyDirectImage): Observable<any> => {
    const formData: FormData = new FormData();

    formData.append('caption', val.caption);
    formData.append('userId', val.userId);
    formData.append('file', filesList[0]);

    return this.ajaxReqWrapperService.postBodyProgress(ENInterfaces.signalRNotifDirectImage, formData);

  }
  postNotifyDirectVideo = (filesList: any, val: INotifyDirectImage): Observable<any> => {
    const formData: FormData = new FormData();

    formData.append('caption', val.caption);
    formData.append('userId', val.userId);
    formData.append('file', filesList[0]);

    return this.ajaxReqWrapperService.postBodyProgress(ENInterfaces.signalRNotifDirectVideo, formData);

  }
  checkVertiticationNotifDirectImage = (fileForm: FileList, val: INotifyDirectImage, ioPolicy: IIOPolicy): boolean => {
    const allowedExtension = ['image/jpeg', 'image/jpg', 'image/png'];
    const allowedNames = ['jpeg', 'jpg', 'png', 'JPEG', 'JPG', 'PNG'];

    if (MathS.isNull(val.caption)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_caption);
      return false;
    }
    if (MathS.isNull(fileForm)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_Image);
      return false;
    }
    if (allowedNames.indexOf(fileForm[0].name.split('.').pop().toLowerCase()) == -1) {
      this.utilsService.snackBarMessageWarn(EN_messages.should_insert_image);
      return false;
    }
    if (allowedExtension.indexOf(fileForm[0].type) == -1) {
      this.utilsService.snackBarMessage(EN_messages.insertIsNotImage, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    if (fileForm[0].size / 1024 > ioPolicy.inputMaxSizeKb) {
      this.utilsService.snackBarMessage(EN_messages.uploadMaxCountPassed, ENSnackBarTimes.sevenMili, ENSnackBarColors.warn);
      return false;
    }

    return true;
  }
  checkVertiticationNotifDirectVideo = (fileForm: FileList, val: INotifyDirectImage): boolean => {

    if (MathS.isNull(val.caption)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_caption);
      return false;
    }
    if (MathS.isNull(fileForm)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_video);
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
      this.utilsService.snackBarMessageWarn(EN_messages.should_insert_video);
      return false;
    }
    // return true;
  }
}
