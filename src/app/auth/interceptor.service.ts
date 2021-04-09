import { Location } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { retryWhen, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  private authorizationHeader = "Authorization";

  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private _location: Location
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.jwtService.getAuthorizationToken();
    if (authToken) {
      req = this.addToken(req, authToken);
      this.authService.savedStatusFromToken();
    }
    return next.handle(req)
      .pipe(
        retryWhen(errors => errors.pipe(
          // mergeMap((error: HttpErrorResponse, retryAttempt: number) => {
          //   if (retryAttempt === 1) {
          //     return throwError(error); // no retry
          //   }
          //   return of(error); // retry
          // }),
          // delay(ENSnackBarTimes.fourMili),
          take(1)
        )),
        catchError((error => {
          console.log(req.url);

          if (
            req.url.includes('login')
          ) {
            console.log(req.url);
            return throwError(error)
          }
          console.log(req.url);
          if (error instanceof HttpErrorResponse) {
            console.log(error.status);
            if (error.status === 401) {
              console.log(1);

              const newRequest = this.handle401Error(req);
              if (newRequest) {
                console.log("Try new AuthRequest ...");
                this.authService.savedStatusFromToken();
                return next.handle(newRequest);
              }
              else {
                this.authService.goOutIn();
                // this.authService.routeTo('/wr');
                this.authService.logout();
                return;
              }
            }
            this.authService.noAccessMessage();
            this._location.back();
            return throwError(error)
          }
        }))
      )
  }
  private addToken(req: HttpRequest<any>, token: string) {
    return req.clone({
      headers: req.headers.set(this.authorizationHeader, `Bearer ` + token)
      // withCredentials: true
    });
  }
  private handle401Error(request: HttpRequest<any>): HttpRequest<any> | null {
    console.log(1);

    let newStoredToken: any;
    const requestAccessTokenHeader = request.headers.get(this.authorizationHeader);
    this.authService.refreshToken().subscribe(res => {
      newStoredToken = res;
    });
    if (!newStoredToken) {
      console.log("There is no new AccessToken.", { requestAccessTokenHeader: requestAccessTokenHeader, newStoredToken: newStoredToken });
      console.log(2);
      return null;
    }
    const newAccessTokenHeader = newStoredToken;
    if (requestAccessTokenHeader === newAccessTokenHeader) {
      console.log("There is no new AccessToken.", { requestAccessTokenHeader: requestAccessTokenHeader, newAccessTokenHeader: newAccessTokenHeader });
      console.log(3);
      return null;
    }
    console.log(4);
    return this.addToken(request, newAccessTokenHeader);
  }
}

