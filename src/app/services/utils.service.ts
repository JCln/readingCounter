import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ENSnackBarColors, ENSnackBarTimes, ISearchInOrderTo, ITitleValue } from 'interfaces/ioverall-config';
import { EnvService } from 'services/env.service';
import { SnackWrapperService } from 'services/snack-wrapper.service';

import { ConfirmTextDialogComponent } from '../frame-work/manage/tracking/confirm-text-dialog/confirm-text-dialog.component';

export interface IDialogMessage {
  messageTitle: string,
  messageTitleTwo?: string,
  minWidth: string,
  isInput: boolean,
  isDelete: boolean,
  doesNotReturnButton?: boolean
}
@Injectable({
  providedIn: 'root'
})
export class UtilsService {


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private envService: EnvService,
    private dialog: MatDialog,
    private snackWrapperService: SnackWrapperService
  ) { }

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
          title: config.messageTitle,
          title2: config.messageTitleTwo,
          isInput: config.isInput,
          isDelete: config.isDelete,
          doesNotReturnButton: config.doesNotReturnButton
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
  routeToByUrl = (router: string) => {
    this.router.navigateByUrl(router);
  }
  routeTo = (router: string) => {
    this.router.navigate([router]);
  }
  routeToByParams = (router: string, params: any) => {
    this.router.navigate([router, params], { relativeTo: this.route.parent });
  }
  routeToByExtras = (router: string, body: object) => {
    this.router.navigate([router], body);
  }
  getRouteParams = (paramName: string): string => {
    return this.route.snapshot.paramMap.get(paramName);
  }
  getRouteBySplit = (spliter: string): string => {
    return this.router.url.split(spliter).pop();
  }

}
