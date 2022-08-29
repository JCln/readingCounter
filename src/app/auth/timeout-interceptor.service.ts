import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, timeout, TimeoutError } from 'rxjs';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { EnvService } from 'services/env.service';
import { SpinnerWrapperService } from 'services/spinner-wrapper.service';


@Injectable({
  providedIn: 'root'
})
export class TimeoutInterceptorService implements HttpInterceptor {
  TIMEOUT: number;

  constructor(
    private spinnerWrapperService: SpinnerWrapperService,
    private envService: EnvService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.TIMEOUT = this.envService.timeout;
    const modified = req.clone({
      setHeaders: { 'X-Request-Timeout': `${this.TIMEOUT}` }
    });

    return next.handle(modified).pipe(
      timeout(this.TIMEOUT),
      catchError(err => {
        if (err instanceof TimeoutError) {
          this.spinnerWrapperService.stopPending();
          this.spinnerWrapperService.stopLoading();
          // console.error(req.url);
        }
        return EMPTY;
      })
    );
  }
}
