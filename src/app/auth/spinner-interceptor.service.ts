import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENClientServerErrors } from 'interfaces/iserver-manager';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { SpinnerWrapperService } from 'services/spinner-wrapper.service';

import { EN_Routes } from '../interfaces/routes.enum';
import { UtilsService } from 'services/utils.service';
import { EN_Mess, ENSnackBarColors } from 'interfaces/enums.enum';
// import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor {

  constructor(
    private spinnerWrapperService: SpinnerWrapperService,
    private utilsService: UtilsService
  ) { }

  accessDenied_403 = async () => {
    const config = {
      messageTitle: EN_Mess.youHaveNotAccess,
      text: EN_Mess.youHaveNotAccessMsg,
      width: '21',
      isInput: false,
      isImportant: true,
      icon: 'pi pi-ban'
    }
    await this.utilsService.primeConfirmDialog(config);
  }
  accessDenied_402 = async (error: string) => {//License
    const config = {
      messageTitle: error,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      icon: 'pi pi-credit-card',
      disableClose: false,
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
        // retry(1),
        catchError((error: HttpErrorResponse) => {
          try {

            if (error.status === ENClientServerErrors.cs400 && !(error.error instanceof Blob)) {
              if (error.error.message) {
                this.utilsService.snackWrapperService.openSnackBar(error.error.message, ENSnackBarColors.danger);
              }
              else
                this.utilsService.snackWrapperService.openSnackBar(EN_Mess.checkValuesAndTryAgain, ENSnackBarColors.warn);
            }

            const messageText = error.error.message ? error.error.message : '';
            //401 handling in authService
            switch (error.status) {
              // License
              case ENClientServerErrors.cs402:
                this.accessDenied_402(error.error.message);
              case ENClientServerErrors.cs403:
                this.accessDenied_403();
                break;
              case ENClientServerErrors.cs404:
                if (messageText)
                  this.utilsService.snackWrapperService.openSnackBar(messageText, ENSnackBarColors.danger);
                else
                  this.utilsService.snackWrapperService.openSnackBar(EN_Mess.dataNotFound, ENSnackBarColors.danger);
                break;
              case ENClientServerErrors.cs405:
                this.utilsService.snackWrapperService.openSnackBar(error.message, ENSnackBarColors.danger);
                break;
              case ENClientServerErrors.cs408:
                this.utilsService.snackWrapperService.openSnackBar(EN_Mess.timeOut, ENSnackBarColors.danger);
                break;
              case ENClientServerErrors.cs409:
                this.utilsService.snackWrapperService.openSnackBar(messageText, ENSnackBarColors.danger);
                break;
              case ENClientServerErrors.cs410:
                this.utilsService.snackWrapperService.openSnackBar(EN_Mess.dataNotFoundOrDeleted, ENSnackBarColors.danger);
                break;
              case ENClientServerErrors.cs422:
                this.utilsService.snackWrapperService.openSnackBar(messageText, ENSnackBarColors.danger);
                break;
              case ENClientServerErrors.cs429:
                if (messageText)
                  this.utilsService.snackWrapperService.openSnackBar(messageText, ENSnackBarColors.danger);
                else
                  this.utilsService.snackWrapperService.openSnackBar(EN_Mess.threshold, ENSnackBarColors.danger);
                break;
              case ENClientServerErrors.cs0:
                this.utilsService.snackWrapperService.openSnackBar(EN_Mess.checkNetwork, ENSnackBarColors.danger);
                break;
              case ENClientServerErrors.cs500:
                this.utilsService.snackWrapperService.openSnackBar(EN_Mess.serviceError, ENSnackBarColors.danger);
                break;
              case ENClientServerErrors.cs502:
                this.utilsService.snackWrapperService.openSnackBar(EN_Mess.serviceError, ENSnackBarColors.danger);
                break;
              case ENClientServerErrors.cs504:
                this.utilsService.snackWrapperService.openSnackBar(EN_Mess.notResponse, ENSnackBarColors.danger);
                break;

              default:
                this.utilsService.snackWrapperService.openSnackBar(messageText, ENSnackBarColors.danger);
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
