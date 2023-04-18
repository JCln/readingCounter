import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENSnackBarColors, ENSnackBarTimes, ISearchInOrderTo, ISimafaImportStatus, ITitleValue } from 'interfaces/ioverall-config';
import { EnvService } from 'services/env.service';
import { SnackWrapperService } from 'services/snack-wrapper.service';
import { ConfirmTextDialogComponent } from '../shared/confirm-text-dialog/confirm-text-dialog.component';
import { CompositeService } from './composite.service';
import { Location } from '@angular/common';

export interface IDialogMessage {
  messageTitle: string,
  messageTitleTwo?: string,
  text?: string,
  minWidth: string,
  isInput: boolean,
  isDelete: boolean,
  icon: string,
  doesNotReturnButton?: boolean,
  isSelectableDate?: boolean
}
@Injectable({
  providedIn: 'root'
})
export class UtilsService {


  constructor(
    private compositeService: CompositeService,
    private envService: EnvService,
    private dialog: MatDialog,
    private _location: Location,
    private snackWrapperService: SnackWrapperService
  ) { }

  getSimafaImportStatus = (): ISimafaImportStatus => {
    return this.envService.simafaImportStatus;
  }
  getDenyTracking = (): boolean => {
    const jwtRole = this.compositeService.getAuthUser();
    return jwtRole.roles.toString().includes('denytracking') ? true : false;
  }
  getYears = (): ITitleValue[] => {
    return this.envService.years;
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
  firstConfirmDialog = (config: IDialogMessage): Promise<any> => {
    config.doesNotReturnButton = config.doesNotReturnButton == false ? false : true
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        minWidth: config.minWidth,
        data: {
          messageTitle: config.messageTitle,
          messageTitleTwo: config.messageTitleTwo,
          text: config.text,
          isInput: config.isInput,
          isDelete: config.isDelete,
          icon: config.icon,
          doesNotReturnButton: config.doesNotReturnButton,
          isSelectableDate: config.isSelectableDate
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
