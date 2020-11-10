import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';

import { SpinnerWrapperService } from './spinner-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor {

  constructor(private spinnerWrapperService: SpinnerWrapperService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.spinnerWrapperService.startLoading();
    return next.handle(req)
      .pipe(
        catchError((error) => {
          console.log(error);

          this.spinnerWrapperService.stopLoading();
          return error;
        })
      )
      .pipe(
        map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            console.log(evt);
            this.spinnerWrapperService.stopLoading();
          }
          return evt;
        })
      )
  }
}
