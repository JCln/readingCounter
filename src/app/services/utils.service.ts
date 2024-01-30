import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ISearchInOrderTo, ITitleValue, ISimafaImportStatus, INotificationAlertTypes, IDialogMessage, IPrimeConfirmDialog } from 'interfaces/ioverall-config';
import { EnvService } from 'services/env.service';
import { SnackWrapperService } from 'services/snack-wrapper.service';
import { ConfirmTextDialogComponent } from '../shared/confirm-text-dialog/confirm-text-dialog.component';
import { CompositeService } from './composite.service';
import { Location } from '@angular/common';
import { Collapser } from '../classes/collapser';
import { ENImageTypes, ENSnackBarColors, ENSnackBarTimes, EN_messages } from 'interfaces/enums.enum';
import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { Table } from 'primeng/table';
import { ListSearchMoshWoumComponent } from '../shared/list-search-mosh-woum/list-search-mosh-woum.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MathS } from '../classes/math-s';
import { UserConfigComponent } from '../shared/user-config/user-config.component';
import { PrimeConfirmDgComponent } from '../shared/prime-confirm-dg/prime-confirm-dg.component';
import { DateJalaliService } from './date-jalali.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  ref: DynamicDialogRef;
  private readonly adminUser: string = 'admin';
  private readonly denyTracking: string = 'denytracking';
  private readonly httpProtocol: string = 'http:';

  constructor(
    public compositeService: CompositeService,
    public dateJalaliService: DateJalaliService,
    public envService: EnvService,
    public dialog: MatDialog,
    public dialogService: DialogService,
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
    return !!jwtRole.roles.toString().includes(this.denyTracking);
  }
  getIsAdminRole = (): boolean => {
    const jwtRole = this.compositeService.getAuthUser();
    return !!jwtRole.roles.toString().includes(this.adminUser);
  }
  checkProtocol = (): boolean => {
    return location.protocol == this.httpProtocol ? false : true;
  }
  getHighLowStateDictionary = () => {
    return this.envService.getHighLowStateId;
  }
  getNotificationAlertTypesList = () => {
    return this.envService.NotificationAlertTypesList;
  }
  getNotificationAlertTypesIds = () => {
    return this.envService.NotificationAlertTypesIds;
  }
  getNotificationMediaTypeList = () => {
    return this.envService.NotificationMediaTypeList;
  }
  getNotificationMediaTypeIds = () => {
    return this.envService.NotificationMediaTypeIds;
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
  getMasrafStateDictionary = (): any[] => {
    return this.envService.getMasrafStateDictionary;
  }
  getAPIUrl = (): string => {
    return this.envService.API_URL;
  }
  clearFilters(session: Table): void {
    for (let index = 0; index < Object.keys(session.filters).length; index++) {
      session.filters[Object.keys(session.filters)[index]]['value'] = '';
    }
    this.compositeService.jwtService.browserStorageService.removeSession(session.stateKey);
    session.reset();
  }
  hasFilters(session: Table): boolean {
    if (session) {
      for (let index = 0; index < Object.keys(session.filters).length; index++) {
        if (!MathS.isNull(session.filters[Object.keys(session.filters)[index]]['value'])) {
          return true;
        }
      }
      return false;
    }
  }
  showCarouselForbidden = (dataSource: any) => {
    // To make imageWrapper config Dialog for forbidden
    if (dataSource.imageCount) {
      this.doShowImageDialog(dataSource, ENImageTypes.forbidden);
    } else {
      this.snackBarMessageWarn(EN_messages.imageNotExists);
    }
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
    this.snackWrapperService.openSnackBar(message, ENSnackBarColors.success);
  }
  snackBarMessageWarn = (message: string) => {
    this.snackWrapperService.openSnackBar(message, ENSnackBarColors.warn);
  }
  snackBarMessageFailed = (message: string) => {
    this.snackWrapperService.openSnackBar(message, ENSnackBarColors.danger);
  }
  snackBarMessage = (message: string, time: ENSnackBarTimes, color: ENSnackBarColors) => {
    this.snackWrapperService.openSnackBar(message, color);
  }
  goOutInMessage = () => {
    this.snackWrapperService.openSnackBar(EN_messages.accedd_denied_relogin, ENSnackBarColors.danger);
  }
  snackMessage = (message: EN_messages) => {
    this.snackWrapperService.openSnackBar(message, ENSnackBarColors.danger);
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
  // /*DIALOGS*/
  firstConfirmDialog = (config: IDialogMessage): Promise<any> => {
    config.doesNotReturnButton = config.doesNotReturnButton == false ? false : true
    config.changePassword = !!config.changePassword ? true : false

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
          changePassword: config.changePassword,
          tooltipText: config.tooltipText,
        }
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          resolve(desc);
        }
        else {
          resolve(false);
        }
      })
    })
  }
  primeConfirmDialog = (config: IPrimeConfirmDialog): Promise<any> => {
    this.ref = this.dialogService.open(PrimeConfirmDgComponent, {
      data: {
        messageTitle: config.messageTitle,
        messageTitleTwo: config.messageTitleTwo,
        text: config.text,
        isInput: config.isInput,
        icon: config.icon,
        isImportant: config.isImportant
      },
      rtl: true,
      width: config.width,
      closable: config.closable
    })
    return new Promise((resolve) => {
      this.ref.onClose.subscribe(async res => {
        if (res)
          resolve(res);
        else
          resolve(false);
      });
    });
  }
  doShowImageDialog = (dataSource: any, type: ENImageTypes) => {
    this.ref = this.dialogService.open(ListSearchMoshWoumComponent, {
      data: { _data: dataSource, _type: type },
      rtl: true,
      width: '80%',
    })
  }
  showTypicalImageDialog = (dataSource: any) => {
    this.doShowImageDialog(dataSource, ENImageTypes.typical);
  }
  showSingleImageDialog = (dataSource: any) => {
    this.doShowImageDialog(dataSource, ENImageTypes.single);
  }
  showImageDialogImageCount = (dataSource: any) => {
    // should not open dialog when no images exists
    if (dataSource.imageCount) {
      this.showTypicalImageDialog(dataSource);
    } else {
      this.snackBarMessageWarn(EN_messages.imageNotExists);
    }
  }
  showImageMobileApp = (dataSource: any) => {
    if (dataSource.mediaCount) {
      this.doShowImageDialog(dataSource, ENImageTypes.mobileApp);
    } else {
      this.snackBarMessageWarn(EN_messages.imageNotExists);
    }
  }
  showUserConfigDialog = (dataSource: any) => {
    this.ref = this.dialogService.open(UserConfigComponent, {
      data: { _data: dataSource },
      rtl: true,
      width: '21rem',
    })
    this.ref.onClose.subscribe(async res => {
      if (res)
        console.log(res);
    });
  }
  /* END DIALOGS */

}
