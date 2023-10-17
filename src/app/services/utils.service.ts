import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENSnackBarColors, ENSnackBarTimes, ISearchInOrderTo, ITitleValue, ISimafaImportStatus, INotificationAlertTypes, IDialogMessage } from 'interfaces/ioverall-config';
import { EnvService } from 'services/env.service';
import { SnackWrapperService } from 'services/snack-wrapper.service';
import { ConfirmTextDialogComponent } from '../shared/confirm-text-dialog/confirm-text-dialog.component';
import { CompositeService } from './composite.service';
import { Location } from '@angular/common';
import { Collapser } from '../classes/collapser';
import { EN_messages } from 'interfaces/enums.enum';
import { AjaxReqWrapperService } from './ajax-req-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    public compositeService: CompositeService,
    public envService: EnvService,
    public dialog: MatDialog,
    private _location: Location,
    public snackWrapperService: SnackWrapperService,
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public collapser: Collapser
  ) { }

  getSimafaImportStatus = (): ISimafaImportStatus => {
    return this.envService.simafaImportStatus;
  }
  getDenyTracking = (): boolean => {
    const jwtRole = this.compositeService.getAuthUser();
    return jwtRole.roles.toString().includes('denytracking') ? true : false;
  }
  getIsAdminRole = (): boolean => {
    const jwtRole = this.compositeService.getAuthUser();
    return jwtRole.roles.toString().includes('admin') ? true : false;
  }
  getYears = (): ITitleValue[] => {
    return this.envService.years;
  }
  getLogoutReason = (): any[] => {
    return this.envService.getLogoutReasonDictionary;
  }
  getInvalidLoginReason = (): any[] => {
    return this.envService.getInvalidLoginReasonDictionary;
  }
  getAppVersion = (): string => {
    return this.envService.version;
  }
  // should use getFirstYear function for Recognizing and performance
  getFirstYear = (): number => {
    return this.envService.years[0].value;
  }
  getDeleteDictionary = (): any[] => {
    return this.envService.getDeleteDictionary;
  }
  getSearchInOrderTo: ISearchInOrderTo[] = [
    {
      title: 'تاریخ',
      isSelected: true,
      key: 'Date'
    },
    {
      title: 'دوره',
      isSelected: false,
      key: 'period'
    }
  ]
  getSearchInOrderToReverse: ISearchInOrderTo[] = [
    {
      title: 'تاریخ',
      isSelected: false,
      key: 'Date'
    },
    {
      title: 'دوره',
      isSelected: true,
      key: 'period'
    }
  ]
  getNotificationAlertTypes = (): INotificationAlertTypes[] => {
    return this.envService.NotificationAlertTypesList;
  }
  getNotificationMediaTypes = (): INotificationAlertTypes[] => {
    return this.envService.NotificationMediaTypeList;
  }
  // snack bar
  snackBarMessageSuccess = (message: string) => {
    this.snackWrapperService.openSnackBar(message, ENSnackBarTimes.fourMili, ENSnackBarColors.success);
  }
  snackBarMessageWarn = (message: string) => {
    this.snackWrapperService.openSnackBar(message, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
  }
  snackBarMessageFailed = (message: string) => {
    this.snackWrapperService.openSnackBar(message, ENSnackBarTimes.fourMili, ENSnackBarColors.danger);
  }
  snackBarMessage = (message: string, time: ENSnackBarTimes, color: ENSnackBarColors) => {
    this.snackWrapperService.openSnackBar(message, time, color);
  }
  goOutInMessage = () => {
    this.snackWrapperService.openSnackBar(EN_messages.accedd_denied_relogin, ENSnackBarTimes.tenMili, ENSnackBarColors.danger);
  }
  snackMessage = (message: EN_messages) => {
    this.snackWrapperService.openSnackBar(message, ENSnackBarTimes.twentyMili, ENSnackBarColors.danger);
  }
  firstConfirmDialog = (config: IDialogMessage): Promise<any> => {
    config.doesNotReturnButton = config.doesNotReturnButton == false ? false : true
    config.changePassword = !!config.changePassword ? true : false
    console.log(config.changePassword);

    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        minWidth: config.minWidth,
        disableClose: config.disableClose,
        data: {
          messageTitle: config.messageTitle,
          messageTitleTwo: config.messageTitleTwo,
          text: config.text,
          isInput: config.isInput,
          inputMinLength: config.inputMinLength,
          placeHolder: config.placeHolder,
          isDelete: config.isDelete,
          icon: config.icon,
          doesNotReturnButton: config.doesNotReturnButton,
          isSelectableDate: config.isSelectableDate,
          changePassword: config.changePassword
        }
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          resolve(desc);
        }
      })
    })
  }
  // routing
  backToPreviousPage = () => {
    this._location.back();
  }
  routeToByUrl = (router: string) => {
    this.compositeService.routeToByUrl(router);
  }
  routeTo = (router: string) => {
    this.compositeService.routeTo(router);
  }
  routeToByParams = (router: string, params: any) => {
    this.compositeService.routeToByParams(router, params);
  }
  routeToByExtras = (router: string, body: object) => {
    this.compositeService.routeToByExtras(router, body);
  }
  getRouteParams = (paramName: string): string => {
    return this.compositeService.getRouteParams(paramName);
  }
  getRouteBySplit = (spliter: string): string => {
    return this.compositeService.getRouteBySplit(spliter);
  }

}
