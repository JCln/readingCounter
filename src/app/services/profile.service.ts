import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IChangePassword } from 'interfaces/inon-manage';
import { ENLocalStorageNames, IResponses } from 'interfaces/ioverall-config';
import { DownloadManagerService } from 'services/download-manager.service';
import { InterfaceManagerService } from 'services/interface-manager.service';
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
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService,
    public columnManager: ColumnManager,
    private localClientConfigsService: LocalClientConfigsService,
    private jwtService: JwtService,
    private downloadManagerService: DownloadManagerService
  ) { }
  searchInOrderNotificationMessages: any[] = [
    { name: 'بدون فیلتر', value: '', type: 'number' },
    { name: 'نوع پیام', value: 'notificationMediaTypeId', type: 'number' },
    { name: 'نوع اعلان', value: 'alertTypeId', type: 'number' }
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
        this.interfaceManagerService.POSTBODY(ENInterfaces.changePassword, password).subscribe((res: IResponses) => {
          if (res)
            this.showMessage(res.message);
        });
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
  getMyInfoDataSource = (method: ENInterfaces): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(method).subscribe((res) => {
        resolve(res)
      });
    });
  }
  postDataSourceByQuery = (method: ENInterfaces, id: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTSG(method, id).subscribe((res) => {
        resolve(res)
      });
    });
  }
  postDataSource = (method: ENInterfaces, body: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(method, body).subscribe((res) => {
        resolve(res)
      });
    });
  }
  // TODO: get access aggregating from trackingManager(کارتابل)
  _agg = {
    rowGroupMetadata: {},
    selectedAggregate: 'listNumber',
    flag: this.getLocalDefaultAggregateTracks()
  }

}
