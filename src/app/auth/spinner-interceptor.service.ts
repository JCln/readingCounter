import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ENSnackBarColors, ENSnackBarTimes, EN_Mess } from 'interfaces/ioverall-config';
import { ENClientServerErrors } from 'interfaces/iserver-manager';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { SpinnerWrapperService } from 'services/spinner-wrapper.service';

import { EN_Routes } from '../interfaces/routes.enum';
import { UtilsService } from 'services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor {

  constructor(
    private spinnerWrapperService: SpinnerWrapperService,
    private utilsService: UtilsService,
    private router: Router
  ) { }

  accessDenied_403 = async () => {
    const config = {
      messageTitle: EN_Mess.youHaveNotAccess,
      text: EN_Mess.youHaveNotAccessMsg,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      icon: 'pi pi-ban'
    }
    await this.utilsService.firstConfirmDialog(config);
  }
  showSpinnerConsiderExceptions = () => {
    const url = this.utilsService.compositeService.getRouterUrl();
    if (url === EN_Routes.wrdb || url === EN_Routes.wrmrapk || url === EN_Routes.wrofflinetxtout) {
      this.spinnerWrapperService.startLoadingSmallSpinner();
    }
    else {
      this.spinnerWrapperService.startPending();
    }
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.showSpinnerConsiderExceptions();
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          try {

            if (error.status === ENClientServerErrors.cs400 && !(error.error instanceof Blob)) {
              if (error.error.message) {
                this.utilsService.snackWrapperService.openSnackBar(error.error.message, ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
              }
              else
                this.utilsService.snackWrapperService.openSnackBar(EN_Mess.checkValuesAndTryAgain, ENSnackBarTimes.sevenMili, ENSnackBarColors.warn);

            }
            //401 handling in authService
            switch (error.status) {
              case ENClientServerErrors.cs403:
                this.accessDenied_403();
                break;
              case ENClientServerErrors.cs404:
                if (error.error.message)
                  this.utilsService.snackWrapperService.openSnackBar(error.error.message, ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
                else
                  this.utilsService.snackWrapperService.openSnackBar(EN_Mess.dataNotFound, ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
                break;
              case ENClientServerErrors.cs405:
                this.utilsService.snackWrapperService.openSnackBar(error.message, ENSnackBarTimes.fourMili, ENSnackBarColors.danger);
                break;
              case ENClientServerErrors.cs408:
                this.utilsService.snackWrapperService.openSnackBar(EN_Mess.timeOut, ENSnackBarTimes.tenMili, ENSnackBarColors.danger);
                break;
              case ENClientServerErrors.cs409:
                this.utilsService.snackWrapperService.openSnackBar(error.error.message, ENSnackBarTimes.tenMili, ENSnackBarColors.danger);
                break;
              case ENClientServerErrors.cs410:
                this.utilsService.snackWrapperService.openSnackBar(EN_Mess.dataNotFoundOrDeleted, ENSnackBarTimes.fourMili, ENSnackBarColors.danger);
                break;
              case ENClientServerErrors.cs422:
                this.utilsService.snackWrapperService.openSnackBar(error.error.message, ENSnackBarTimes.fourMili, ENSnackBarColors.danger);
                break;
              case ENClientServerErrors.cs429:
                if (error.error.message)
                  this.utilsService.snackWrapperService.openSnackBar(error.error.message, ENSnackBarTimes.fourMili, ENSnackBarColors.danger);
                else
                  this.utilsService.snackWrapperService.openSnackBar(EN_Mess.threshold, ENSnackBarTimes.fourMili, ENSnackBarColors.danger);
                break;
              case ENClientServerErrors.cs0:
                this.utilsService.snackWrapperService.openSnackBar(EN_Mess.checkNetwork, ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
                break;
              case ENClientServerErrors.cs500:
                this.utilsService.snackWrapperService.openSnackBar(EN_Mess.serviceError, ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
                break;
              case ENClientServerErrors.cs502:
                this.utilsService.snackWrapperService.openSnackBar(EN_Mess.serviceError, ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
                break;
              case ENClientServerErrors.cs504:
                this.utilsService.snackWrapperService.openSnackBar(EN_Mess.notResponse, ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
                break;

              default:
                this.utilsService.snackWrapperService.openSnackBar(error.error.message, ENSnackBarTimes.fifteenMili, ENSnackBarColors.danger);
                break;
            }
            this.spinnerWrapperService.stopPending();
            this.spinnerWrapperService.stopLoadingSmallSpinner();

            return throwError(() => error);

          } catch (e) { }
        })
      )
      .pipe(
        map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            this.spinnerWrapperService.stopPending();
            this.spinnerWrapperService.stopLoadingSmallSpinner();
          }
          return evt;
        })
      )
  }

}
