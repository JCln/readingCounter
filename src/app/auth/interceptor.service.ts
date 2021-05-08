import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { filter } from 'rxjs/internal/operators/filter';
import { finalize } from 'rxjs/internal/operators/finalize';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { take } from 'rxjs/internal/operators/take';

import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  private authorizationHeader = "Authorization";
  private isRefreshTokenInProcess: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private jwtService: JwtService,
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.jwtService.getAuthorizationToken();
    if (authToken) {
      req = this.addToken(req, authToken);
      this.authService.savedStatusFromToken();
    }
    return next.handle(req)
      .pipe(
        catchError((error => {
          if (
            req.url.includes('login')
          ) {
            return throwError(error)
          }
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              if (this.isRefreshTokenInProcess) {
                return this.refreshTokenSubject.pipe(
                  filter(result => result !== null),
                  take(3),
                  switchMap(() => next.handle(this.addToken(req, authToken))),
                  finalize(() => this.authService.savedStatusFromToken())
                );
              } else {
                this.isRefreshTokenInProcess = true;
                this.refreshTokenSubject.next(null);

                if (!this.authService.isAuthUserLoggedIn()) {
                  this.authService.goOutInMessage();
                  this.authService.logout();
                  return throwError(error);
                }

                return this.authService.refreshToken().pipe(
                  switchMap((success: boolean) => {
                    this.refreshTokenSubject.next(success);
                    return next.handle(this.addToken(req, authToken));
                  }),
                  finalize(() => (this.isRefreshTokenInProcess = false, this.authService.savedStatusFromToken()))
                );
              }
            } else {
              return throwError(error);
            }
          }
        })
        )
      )

  }
  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set(this.authorizationHeader, `Bearer ` + token)
      // withCredentials: true
    });
  }
  private handle401Error(request: HttpRequest<any>): HttpRequest<any> | null {
    let newStoredToken: any;
    const requestAccessTokenHeader = request.headers.get(this.authorizationHeader);
    this.authService.refreshToken().subscribe(res => {
      newStoredToken = res;
    });
    if (!newStoredToken) {
      console.log("There is no new AccessToken.", { requestAccessTokenHeader: requestAccessTokenHeader, newStoredToken: newStoredToken });
      return null;
    }
    const newAccessTokenHeader = newStoredToken;
    if (requestAccessTokenHeader === newAccessTokenHeader) {
      console.log("There is no new AccessToken.", { requestAccessTokenHeader: requestAccessTokenHeader, newAccessTokenHeader: newAccessTokenHeader });
      return null;
    }
    return this.addToken(request, newAccessTokenHeader);
  }
}

