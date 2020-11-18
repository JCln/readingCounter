import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';

import { AuthService } from './auth.service';
import { SnackWrapperService } from './snack-wrapper.service';
import { SpinnerWrapperService } from './spinner-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor {

  constructor(private spinnerWrapperService: SpinnerWrapperService, private snackWrapperService: SnackWrapperService, private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.spinnerWrapperService.startLoading();
    return next.handle(req)
      .pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              this.snackWrapperService.openSnackBar('اطلاعاتی پیدا نشد، لطفا داده ورودی را بدقت وارد فرمایید', 3000, 'snack_danger');
            }
            if (error.status === 403) {
              this.snackWrapperService.openSnackBar('شما به این قسمت دسترسی ندارید', 3000, 'snack_danger');
            }
            if (error.status === 0) {
              this.snackWrapperService.openSnackBar('ارتباط با سرویس دهنده برقرار نشد، احتمالا شما به شبکه دسترسی ندارید یا موقعیت مکانی شما در ایران نیست لطفا دقایقی دیگر امتحان نمایید', 8000, 'snack_danger');
            }
            if (error.status === 500 || error.status === 502 || error.status === 504) {
              this.snackWrapperService.openSnackBar('با عرض پوزش، سرور در حال بروزرسانی است، لطفا دقایقی دیگر امتحان نمایید', 8000, 'snack_danger');
            }
            if (error.status === 401) {
              this.authService.routeToLogin();
            }
          }

          this.spinnerWrapperService.stopLoading();
          return throwError(error);
        })
      )
      .pipe(
        map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            // console.log(evt);
            this.spinnerWrapperService.stopLoading();
          }
          return evt;
        })
      )
  }
}
