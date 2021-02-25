import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';

import { SnackWrapperService } from '../services/snack-wrapper.service';
import { SpinnerWrapperService } from '../services/spinner-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor {

  constructor(
    private spinnerWrapperService: SpinnerWrapperService,
    private snackWrapperService: SnackWrapperService    
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.spinnerWrapperService.startLoading();
    return next.handle(req)
      .pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 400) {
              this.snackWrapperService.openSnackBar(error.message, 8000, 'snack_danger');
            }
            if (error.status === 401) {
              console.log(401);
            }
            if (error.status === 403) {
              this.snackWrapperService.openSnackBar('شما به این قسمت دسترسی ندارید', 3000, 'snack_danger');
            }
            if (error.status === 404) {
              this.snackWrapperService.openSnackBar('اطلاعاتی پیدا نشد، لطفا داده ورودی را بدقت وارد نمایید', 3000, 'snack_danger');
            }
            if (error.status === 408) {
              this.snackWrapperService.openSnackBar('زمان ارسال درخواست به سرویس به اتمام رسید، احتمالا شبکه کٌند و یا قطع است، لطفا دقایقی دیگر امتحان نمایید', 10000, 'snack_danger');
            }
            if (error.status === 410) {
              this.snackWrapperService.openSnackBar('چنین آیتمی پیدا نشد، یا قبلاً حذف شده است', 3000, 'snack_danger');
            }
            if (error.status === 422) {
              this.snackWrapperService.openSnackBar(error.error.message, 3000, 'snack_danger');
            }
            if (error.status === 0) {
              this.snackWrapperService.openSnackBar('ارتباط با سرویس دهنده برقرار نشد، احتمالا شما به شبکه دسترسی ندارید یا موقعیت مکانی شما در ایران نیست لطفا دقایقی دیگر امتحان نمایید', 8000, 'snack_danger');
            }
            if (error.status === 500 || error.status === 502) {
              this.snackWrapperService.openSnackBar('با عرض پوزش، سرور در حال بروزرسانی است، لطفا دقایقی دیگر امتحان نمایید', 8000, 'snack_danger');
            }
            if (error.status === 504) {
              this.snackWrapperService.openSnackBar('زمان پاسخ دهی سرویس دهنده به اتمام رسید، لطفا دقایقی دیگر امتحان نمایید', 8000, 'snack_danger');
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
