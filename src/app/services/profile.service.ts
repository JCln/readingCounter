import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IChangePassword } from 'interfaces/inon-manage';
import { ENLocalStorageNames, IObjectIteratation, IResponses } from 'interfaces/ioverall-config';
import { DownloadManagerService } from 'services/download-manager.service';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { UtilsService } from 'services/utils.service';
import { JwtService } from 'src/app/auth/jwt.service';
import { ColumnManager } from 'src/app/classes/column-manager';

import { MathS } from '../classes/math-s';
import { ConfirmTextDialogComponent } from '../frame-work/manage/tracking/confirm-text-dialog/confirm-text-dialog.component';
import { EnvService } from './env.service';
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
    defaultFontStyle: 3,
    reSizableTable: false,
    reOrderableTable: false,
    defaultAggregateTracks: true,
    imgOptions: {
      width: '40rem',
      height: '40rem',
      objectFit: 'contain'
    },
  }

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService,
    private dialog: MatDialog,
    private columnManager: ColumnManager,
    private localClientConfigsService: LocalClientConfigsService,
    private jwtService: JwtService,
    private envService: EnvService,
    private downloadManagerService: DownloadManagerService
  ) { }

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
  setLocalReSizable = (bol: boolean) => {
    this.localClientConfigsService.saveToLocalStorage(ENLocalStorageNames.reSizableTable, bol);
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
  getLocalResizable = (): boolean => {
    return this.localClientConfigsService.getFromLocalStorage(ENLocalStorageNames.reSizableTable, false);
  }
  getLocalReOrderable = (): boolean => {
    return this.localClientConfigsService.getFromLocalStorage(ENLocalStorageNames.reOrderableTable, false);
  }
  getLocalDefaultAggregateTracks = (): boolean => {
    return this.localClientConfigsService.getFromLocalStorage(ENLocalStorageNames.defaultAggregateTracks, true);
  }
  getHasCanclableSpinner = (): boolean => {
    return this.localClientConfigsService.getFromLocalStorage(ENLocalStorageNames.hasCanclableSpinner, this.envService.hasCanclableSpinner);
  }
  getFontStyle = (): number => {
    return this.localClientConfigsService.getFromLocalStorageType(ENLocalStorageNames.fontStyle, 3);
  }
  columnSelectedProfile = (): IObjectIteratation[] => {
    return this.columnManager.profile;
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
  changePassword = (password: IChangePassword) => {
    if (this.verification(password)) {
      this.firstConfirmDialog(EN_messages.confirm_yourPassword, password);
    }
  }
  getMyInfoDataSource = (method: ENInterfaces): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(method).subscribe((res) => {
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
  firstConfirmDialog = (reason: EN_messages, password: any): Promise<any> => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        minWidth: '65vw',
        data: {
          title: reason,
          isInput: false,
          isDelete: true
        }
      });
      dialogRef.afterClosed().subscribe(async desc => {
        if (desc) {
          this.interfaceManagerService.POSTBODY(ENInterfaces.changePassword, password).subscribe((res: IResponses) => {
            if (res)
              this.utilsService.snackBarMessageSuccess(res.message);
          });
        }
      })
    })
  }
  // TODO: get access aggregating from trackingManager(کارتابل)
  _agg = {
    rowGroupMetadata: {},
    selectedAggregate: 'listNumber',
    flag: this.getLocalDefaultAggregateTracks()
  }

}
