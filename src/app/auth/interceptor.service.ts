import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UtilsService } from 'src/app/services/utils.service';

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
    private utilsService: UtilsService
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
              const newRequest = this.handle401Error(req);
              if (!this.utilsService.isNull(newRequest)) {
                console.log("Try new AuthRequest ...");
                return next.handle(newRequest);

              }
              // this.authService.logout();
              this.authService.noAccessMessage();
              this.authService.routeTo('/wr');
              return;
            }
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
    let newStoredToken: any;
    const requestAccessTokenHeader = request.headers.get(this.authorizationHeader);
    this.authService.refreshToken().subscribe(res => {
      newStoredToken = res;
    });
    if (!newStoredToken) {
      console.log("There is no new AccessToken.", { requestAccessTokenHeader: requestAccessTokenHeader, newStoredToken: newStoredToken });
      return null;
    }
    const newAccessTokenHeader = `Bearer ${newStoredToken}`;
    if (requestAccessTokenHeader === newAccessTokenHeader) {
      console.log("There is no new AccessToken.", { requestAccessTokenHeader: requestAccessTokenHeader, newAccessTokenHeader: newAccessTokenHeader });
      return null;
    }
    return this.addToken(request, newStoredToken);
  }
}

