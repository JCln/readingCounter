import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';

import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  // private numberOfRetries = 1;
  // private delayBetweenRetriesMs = 2000;
  // private isRefreshing = false;
  // private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private jwtService: JwtService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.jwtService.getAuthorizationToken();
    if (authToken) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ` + authToken),
        withCredentials: true
      });
    }
    return next.handle(req)
      // .pipe(
      //   CatchError((error) => {
      //     if (error instanceof HttpErrorResponse && error.status === 401) {

      //     } else {
      //       return throwError(error);
      //     }
      //   }));

      // .pipe(
      //   retryWhen(errors => errors.pipe(
      //     mergeMap((error: HttpErrorResponse, retryAttempt: number) => {
      //       if (retryAttempt === this.numberOfRetries - 1) {
      //         console.log(`HTTP call '${req.method} ${req.url}' failed after ${this.numberOfRetries} retries.`);
      //         return throwError(error); // no retry
      //       }
      //       return of(error);
      //     }),
      //     delay(this.delayBetweenRetriesMs),
      //     take(this.numberOfRetries)
      //   ))
      // )
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log(event.headers.keys);
          }
        })
      )
  }
  // private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
  //   if (!this.isRefreshing) {
  //     this.isRefreshing = true;
  //     this.refreshTokenSubject.next(null);

  //     return this.authService.refreshToken().pipe(
  //       switchMap((token: any) => {
  //         this.isRefreshing = false;
  //         this.refreshTokenSubject.next(token.jwt);
  //         return next.handle(this.addToken(request, token.jwt));
  //       }));

  //   } else {
  //     return this.refreshTokenSubject.pipe(
  //       filter(token => token != null),
  //       take(1),
  //       switchMap(jwt => {
  //         return next.handle(this.addToken(request, jwt));
  //       }));
  //   }
  // }

}
