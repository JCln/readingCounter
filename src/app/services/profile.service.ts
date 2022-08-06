import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IChangePassword } from 'interfaces/inon-manage';
import { ENLocalStorageNames, IObjectIteratation, IResponses } from 'interfaces/ioverall-config';
import { EN_Routes } from 'interfaces/routes.enum';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { UtilsService } from 'services/utils.service';
import { JwtService } from 'src/app/auth/jwt.service';
import { ColumnManager } from 'src/app/classes/column-manager';

import { MathS } from '../classes/math-s';
import { ConfirmTextDialogComponent } from '../frame-work/manage/tracking/confirm-text-dialog/confirm-text-dialog.component';
import { LocalClientConfigsService } from './local-client-configs.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  showStateVals = {
    groupImgs: false,
    searchBasedOnDate: false
  }

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService,
    private dialog: MatDialog,
    private columnManager: ColumnManager,
    private localClientConfigsService: LocalClientConfigsService,
    private jwtService: JwtService
  ) { }

  getToken = (): string => {
    return this.jwtService.getAuthorizationToken();
  }
  getUseCarouselMedia = (): boolean => {
    return this.localClientConfigsService.getFromLocalStorage(ENLocalStorageNames.shouldUseCarouselGallery, false);
  }
  setUseCarouselMedia = (useCarousel: boolean) => {
    this.localClientConfigsService.saveToLocalStorage(ENLocalStorageNames.shouldUseCarouselGallery, useCarousel);
  }
  setLocalValue = (useCarousel: boolean) => {
    this.localClientConfigsService.saveToLocalStorage(ENLocalStorageNames.shouldUseBaseOnDate, useCarousel);
  }
  getLocalValue = (): boolean => {
    return this.localClientConfigsService.getFromLocalStorage(ENLocalStorageNames.shouldUseBaseOnDate, false);
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
  routeToForbiden = () => {
    this.utilsService.routeTo(EN_Routes.wrmfbn);
  }
  showMessage = (message: string) => {
    this.utilsService.snackBarMessageSuccess(message);
  }
  changePassword = (password: IChangePassword) => {
    if (!this.verification(password)) {
      return;
    }
    this.firstConfirmDialog(EN_messages.confirm_yourPassword, password);
  }
  getMyInfoDataSource = (): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.getMyProfile).subscribe((res: IResponses) => {
        resolve(res)
      });
    });
  }
  firstConfirmDialog = (reason: EN_messages, password: any): Promise<any> => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        minWidth: '19rem',
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
}
