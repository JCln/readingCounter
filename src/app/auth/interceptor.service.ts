import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { take } from 'rxjs/internal/operators/take';

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
    // private _location: Location
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.jwtService.getAuthorizationToken();
    if (authToken) {
      req = this.addToken(req, authToken);
      this.authService.savedStatusFromToken();
    }
    return next.handle(req)
      .pipe(
        take(2),
        catchError((error => {
          console.log(req.url);

          if (
            req.url.includes('login')
          ) {
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
                return throwError(error);
              }
            }
            // this.authService.noAccessMessage();
            // this._location.back();
            return throwError(error);
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

