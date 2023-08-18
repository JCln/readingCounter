import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IChangePassword } from 'interfaces/inon-manage';
import { ENLocalStorageNames } from 'interfaces/ioverall-config';
import { DownloadManagerService } from 'services/download-manager.service';
import { UtilsService } from 'services/utils.service';
import { JwtService } from 'src/app/auth/jwt.service';
import { ColumnManager } from 'src/app/classes/column-manager';

import { MathS } from '../classes/math-s';
import { LocalClientConfigsService } from './local-client-configs.service';

export interface imageOption {
  width: string,
  height: string,
  objectFit: string,
}
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  showStateVals = {
    groupImgs: false,
    searchBasedOnDate: false,
    hasCanclableSpinner: false,
    defaultFontStyle: 1,
    reOrderableTable: false,
    notifyPosition: 'top-right',
    imgOptions: {
      width: '40rem',
      height: '40rem',
      objectFit: 'contain'
    },
  }

  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    private utilsService: UtilsService,
    public columnManager: ColumnManager,
    private localClientConfigsService: LocalClientConfigsService,
    private jwtService: JwtService,
    private downloadManagerService: DownloadManagerService
  ) { }
  searchInOrderNotificationMessages: any[] = [
    { titleUnicode: 'بدون فیلتر', value: -1, title: '' },
    { titleUnicode: 'نوع پیام', value: 'notificationMediaTypeId', title: 'notificationMediaTypeId' },
    { titleUnicode: 'نوع اعلان', value: 'alertTypeId', title: 'alertTypeId' }
  ]
  getToken = (): string => {
    return this.jwtService.getAuthorizationToken();
  }
  getUseCarouselMedia = (): boolean => {
    return this.localClientConfigsService.getFromLocalStorage(ENLocalStorageNames.shouldUseCarouselGallery, false);
  }
  getImg = (): any => {
    return this.localClientConfigsService.getFromLocalStorageType(ENLocalStorageNames.imageOption,
      {
        width: '40rem',
        height: '40rem',
        objectFit: 'contain'
      });
  }
  downloadImg = (src: any) => {
    this.downloadManagerService.downloadImg(src);
  }
  setImg = (imageOption: imageOption) => {
    this.localClientConfigsService.saveToLocalStorageType(ENLocalStorageNames.imageOption, imageOption);
  }
  setUseCarouselMedia = (useCarousel: boolean) => {
    this.localClientConfigsService.saveToLocalStorage(ENLocalStorageNames.shouldUseCarouselGallery, useCarousel);
  }
  setLocalValue = (bol: boolean) => {
    this.localClientConfigsService.saveToLocalStorage(ENLocalStorageNames.shouldUseBaseOnDate, bol);
  }
  setLocalNotifyPosition = (val: string) => {
    this.localClientConfigsService.saveToLocalStorageType(ENLocalStorageNames.notifyPosition, val);
  }
  setLocalReOrderable = (bol: boolean) => {
    this.localClientConfigsService.saveToLocalStorage(ENLocalStorageNames.reOrderableTable, bol);
  }
  setLocaldefaultAggregateTracks = (bol: boolean) => {
    this.localClientConfigsService.saveToLocalStorage(ENLocalStorageNames.defaultAggregateTracks, bol);
  }
  setCanclableSpinner = (hasCanclableSpinner: boolean) => {
    this.localClientConfigsService.saveToLocalStorage(ENLocalStorageNames.hasCanclableSpinner, hasCanclableSpinner);
  }
  setFontStyle = (fontStyle: number) => {
    this.localClientConfigsService.saveToLocalStorageType(ENLocalStorageNames.fontStyle, fontStyle);
  }
  getLocalValue = (): boolean => {
    return this.localClientConfigsService.getFromLocalStorage(ENLocalStorageNames.shouldUseBaseOnDate, false);
  }
  getLocalNotifyPosition = (): string => {
    return this.localClientConfigsService.getFromLocalStorageType(ENLocalStorageNames.notifyPosition, 'top-right');
  }
  getLocalReOrderable = (): boolean => {
    return this.localClientConfigsService.getFromLocalStorage(ENLocalStorageNames.reOrderableTable, this.utilsService.envService.reOrderableTable);
  }
  getLocalDefaultAggregateTracks = (): boolean => {
    return this.localClientConfigsService.getFromLocalStorage(ENLocalStorageNames.defaultAggregateTracks, this.utilsService.envService.defaultAggregateTracks);
  }
  getHasCanclableSpinner = (): boolean => {
    return this.localClientConfigsService.getFromLocalStorage(ENLocalStorageNames.hasCanclableSpinner, this.utilsService.envService.hasCanclableSpinner);
  }
  getFontStyle = (): number => {
    return this.localClientConfigsService.getFromLocalStorageType(ENLocalStorageNames.fontStyle, 1);
  }
  verification = (password: IChangePassword) => {
    if (MathS.isNull(password.oldPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.allowed_empty);
      return false;
    }
    if (MathS.isNull(password.newPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.allowed_empty);
      return false;
    }
    if (MathS.isNull(password.confirmPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.allowed_empty);
      return false;
    }
    if (!MathS.isExactEqual(password.newPassword, password.confirmPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.password_notExactly);
      return false;
    }
    return true;
  }
  showMessage = (message: string) => {
    this.utilsService.snackBarMessageSuccess(message);
  }
  changePassword = async (password: IChangePassword): Promise<any> => {
    const a = {
      messageTitle: EN_messages.confirm_yourPassword,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      icon: 'fas fa-user-lock'
    }
    if (this.verification(password)) {
      if (await this.utilsService.firstConfirmDialog(a)) {
        const res = await this.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.changePassword, password);
        if (res)
          this.showMessage(res.message);
      }
    }
  }
  resetAllSavedLocals = async (): Promise<any> => {
    const a = {
      messageTitle: EN_messages.ResetLocalStorage,
      minWidth: '20rem',
      isInput: false,
      isDelete: true,
      icon: 'pi pi-refresh'
    }
    if (await this.utilsService.firstConfirmDialog(a))
      this.jwtService.removeAllExceptAuths();
  }
  // TODO: get access aggregating from trackingManager(کارتابل)
  _agg = {
    rowGroupMetadata: {},
    selectedAggregate: 'listNumber',
    flag: this.getLocalDefaultAggregateTracks()
  }

}
