import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ENClientServerErrors, ENSnackBarColors, ENSnackBarTimes } from 'interfaces/ioverall-config';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { SnackWrapperService } from 'services/snack-wrapper.service';
import { SpinnerWrapperService } from 'services/spinner-wrapper.service';

import { EN_Routes } from '../Interfaces/routes.enum';

export enum EN_Mess {
  checkValuesAndTryAgain = 'مقادیر را بررسی و مجددا امتحان نمایید',
  youHaveNotAccess = 'شما به این قسمت دسترسی ندارید',
  dataNotFound = 'اطلاعاتی پیدا نشد، لطفا داده ورودی را بدقت وارد نمایید',
  timeOut = 'زمان ارسال درخواست به سرویس دهنده به اتمام رسید، احتمالا شبکه کٌند و یا قطع است، لطفا دقایقی دیگر امتحان نمایید',
  dataNotFoundOrDeleted = 'چنین آیتمی پیدا نشد، یا قبلاً حذف شده است',
  checkNetwork = 'از دسترسی به شبکه اطمینان حاصل نمایید',
  serviceError = 'خطای سرویس دهنده',
  notResponse = 'پاسخی دریافت نشد'
}
@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor {

  constructor(
    private spinnerWrapperService: SpinnerWrapperService,
    private snackWrapperService: SnackWrapperService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.showSpinnerConsiderExceptions();
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          try {

            if (error.status === ENClientServerErrors.cs400 && !(error.error instanceof Blob)) {
              if (error.error.message) {
                this.snackWrapperService.openSnackBar(error.error.message, ENSnackBarTimes.fifteenMili, ENSnackBarColors.danger);
              }
              else
                this.snackWrapperService.openSnackBar(EN_Mess.checkValuesAndTryAgain, ENSnackBarTimes.sevenMili, ENSnackBarColors.warn);
            }
            //401 handling in authService
            if (error.status === ENClientServerErrors.cs403) {
              this.snackWrapperService.openSnackBar(EN_Mess.youHaveNotAccess, ENSnackBarTimes.fourMili, ENSnackBarColors.danger);
            }
            if (error.status === ENClientServerErrors.cs404) {
              if (error.error.message)
                this.snackWrapperService.openSnackBar(error.error.message, ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
              else
                this.snackWrapperService.openSnackBar(EN_Mess.dataNotFound, ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
            }
            if (error.status === ENClientServerErrors.cs405) {
              this.snackWrapperService.openSnackBar(error.message, ENSnackBarTimes.fourMili, ENSnackBarColors.danger);
            }
            if (error.status === ENClientServerErrors.cs408) {
              this.snackWrapperService.openSnackBar(EN_Mess.timeOut, ENSnackBarTimes.tenMili, ENSnackBarColors.danger);
            }
            if (error.status === ENClientServerErrors.cs409) {
              this.snackWrapperService.openSnackBar(error.error.message, ENSnackBarTimes.tenMili, ENSnackBarColors.danger);
            }
            if (error.status === ENClientServerErrors.cs410) {
              this.snackWrapperService.openSnackBar(EN_Mess.dataNotFoundOrDeleted, ENSnackBarTimes.fourMili, ENSnackBarColors.danger);
            }
            if (error.status === ENClientServerErrors.cs422) {
              this.snackWrapperService.openSnackBar(error.error.message, ENSnackBarTimes.fourMili, ENSnackBarColors.danger);
            }
            if (error.status === ENClientServerErrors.cs0) {
              this.snackWrapperService.openSnackBar(EN_Mess.checkNetwork, ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
            }
            if (error.status === ENClientServerErrors.cs500 || error.status === ENClientServerErrors.cs502) {
              this.snackWrapperService.openSnackBar(EN_Mess.serviceError, ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
            }
            if (error.status === ENClientServerErrors.cs504) {
              this.snackWrapperService.openSnackBar(EN_Mess.notResponse, ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
            }
            else {
              this.snackWrapperService.openSnackBar(error.error.message, ENSnackBarTimes.fifteenMili, ENSnackBarColors.danger);
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
  showSpinnerConsiderExceptions = () => {
    const url = this.router.url;
    if (url === EN_Routes.wrdb || url === EN_Routes.wrmrapk || url === EN_Routes.wrofflinetxtout) {
      this.spinnerWrapperService.startLoadingSmallSpinner();
    }
    else {
      this.spinnerWrapperService.startPending();
    }
  }
}
