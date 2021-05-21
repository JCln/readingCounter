import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  private authorizationHeader = "Authorization";

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
              if (!this.authService.isAuthUserLoggedIn()) {
                this.authService.goOutInMessage();
                this.authService.logout();
              }
              else {
                this.authService.noAccessMessage();
              }
            }
          }
          return throwError(error);
        }))
      )
  }
  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set(this.authorizationHeader, `Bearer ` + token)
    });
  }

}

