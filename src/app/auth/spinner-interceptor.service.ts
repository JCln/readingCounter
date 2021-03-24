import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';

import { ENSnackBarColors } from '../Interfaces/ioverall-config';
import { SnackWrapperService } from '../services/snack-wrapper.service';
import { SpinnerWrapperService } from '../services/spinner-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor {
  private _s_timeLength: number = 3000;
  private _m_timeLength: number = 8000;
  private _l_timeLength: number = 10000;

  constructor(
    private spinnerWrapperService: SpinnerWrapperService,
    private snackWrapperService: SnackWrapperService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.spinnerWrapperService.startLoading();
    return next.handle(req)
      .pipe(
        catchError((error) => {
          // let errorDesc = error.json();
          if (error.status === 400) {
            // this.snackWrapperService.openSnackBar('داده های ورودی را کنترل نمایید', this._m_timeLength, ENSnackBarColors.danger);
            this.snackWrapperService.openSnackBar(error.error.message, this._m_timeLength, ENSnackBarColors.danger);
          }
          if (error.status === 401) {
            console.log(401);
          }
          if (error.status === 403) {
            this.snackWrapperService.openSnackBar('شما به این قسمت دسترسی ندارید', this._s_timeLength, ENSnackBarColors.danger);
          }
          if (error.status === 404) {
            this.snackWrapperService.openSnackBar('اطلاعاتی پیدا نشد، لطفا داده ورودی را بدقت وارد نمایید', this._s_timeLength, ENSnackBarColors.danger);
          }
          if (error.status === 405) {
            this.snackWrapperService.openSnackBar(error.message, this._s_timeLength, ENSnackBarColors.danger);
          }
          if (error.status === 408) {
            this.snackWrapperService.openSnackBar('زمان ارسال درخواست به سرویس دهنده به اتمام رسید، احتمالا شبکه کٌند و یا قطع است، لطفا دقایقی دیگر امتحان نمایید', this._l_timeLength, ENSnackBarColors.danger);
          }
          if (error.status === 409) {
            this.snackWrapperService.openSnackBar(error.error.message, this._l_timeLength, ENSnackBarColors.danger);
          }
          if (error.status === 410) {
            this.snackWrapperService.openSnackBar('چنین آیتمی پیدا نشد، یا قبلاً حذف شده است', this._s_timeLength, ENSnackBarColors.danger);
          }
          if (error.status === 422) {
            this.snackWrapperService.openSnackBar(error.error.message, this._s_timeLength, ENSnackBarColors.danger);
          }
          if (error.status === 0) {
            this.snackWrapperService.openSnackBar('خطای سرویس دهنده، احتمالا شما به شبکه دسترسی ندارید یا موقعیت مکانی شما در ایران نیست', this._m_timeLength, ENSnackBarColors.danger);
          }
          if (error.status === 500 || error.status === 502) {
            this.snackWrapperService.openSnackBar('خطای سرویس دهنده', this._m_timeLength, ENSnackBarColors.danger);
          }
          if (error.status === 504) {
            this.snackWrapperService.openSnackBar('پاسخی دریافت نشد', this._m_timeLength, ENSnackBarColors.danger);
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
