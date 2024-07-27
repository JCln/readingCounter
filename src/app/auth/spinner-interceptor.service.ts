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
import { ENInterfaces } from 'interfaces/en-interfaces.enum';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor {
  private readonly shouldShowSmallSpinner = [ENInterfaces.NotifyManagerUnreadCount.toString(), ENInterfaces.getShouldIChangePassword.toString(), ENInterfaces.myPreviousFailures.toString()];

  constructor(
    private spinnerWrapperService: SpinnerWrapperService,
    private utilsService: UtilsService
  ) { }

  showSpinnerConsiderSpecialRoutes = (): boolean => {
    const url = this.utilsService.compositeService.getRouterUrl();
    if (url === EN_Routes.wrdb)
      return true;
    return false;
  }
  showSpinnerConsiderSpecialURLs = (httpRequest: HttpRequest<any>) => {
    // if (httpRequest.url.includes(this.shouldShowSmallSpinner)) {
    if (httpRequest.url.includes(ENInterfaces.NotifyManagerUnreadCount) ||
      httpRequest.url.includes(ENInterfaces.getShouldIChangePassword) ||
      httpRequest.url.includes(ENInterfaces.APKUpload) ||
      httpRequest.url.includes(ENInterfaces.offloadManual) ||
      httpRequest.url.includes(ENInterfaces.myPreviousFailures))
      return true;
    return false;
  }
  showSmallSpinner(req: HttpRequest<any>) {
    if (this.showSpinnerConsiderSpecialRoutes() || this.showSpinnerConsiderSpecialURLs(req)) {
      this.spinnerWrapperService.startLoadingSmallSpinner();
    }
    else {
      this.spinnerWrapperService.startPending();
    }
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.showSmallSpinner(req);
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
                break;
              case ENClientServerErrors.cs403:
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
              case ENClientServerErrors.cs413:
                this.utilsService.snackWrapperService.openSnackBar(EN_Mess.entityTooLarge, ENSnackBarColors.danger);
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
                if (messageText)
                  this.utilsService.snackWrapperService.openSnackBar(messageText, ENSnackBarColors.danger);
                else
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
