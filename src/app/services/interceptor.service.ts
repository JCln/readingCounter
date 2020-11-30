import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { take } from 'rxjs/operators';

import { IAuthTokenType } from '../Interfaces/auth-token-type.enum';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private jwtService: JwtService,
    private authService: AuthService
  ) { }

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
        // tap((event: HttpEvent<any>) => {
        //   if (event instanceof HttpResponse) {
        //     // console.log(event.headers.keys);
        //   }
        // }),
        catchError((error => {
          if (
            req.url.includes('login')
          ) {
            return throwError(error)
          }
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              if (!this.refreshTokenInProgress) {
                this.refreshTokenInProgress = true;
                this.refreshTokenSource.next(null);
                this.authService.refreshToken()
                  .pipe(
                    catchError((err: any) => {
                      this.refreshTokenInProgress = false;
                      return throwError(err);
                    }),
                    take(1)
                  )
                  .subscribe((res: IAuthTokenType) => {
                    this.jwtService.saveToLocalStorage(res.access_token);
                    this.jwtService.saveToLocalStorageRefresh(res.refresh_token);
                  })
              }
            }
          }
          return throwError(error)
        }))
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
