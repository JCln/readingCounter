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
    if (authToken)
      req = this.addToken(req, authToken);

    return next.handle(req)
      .pipe(
        catchError((error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              if (req.url.includes('login')) {
                this.showProperMessage(error);
                return;
              }
              if (!this.authService.isAuthUserLoggedIn()) {
                this.authService.goOutInMessage();
                this.authService.logout();
              }
              else {
                this.showProperMessage(error);
              }
            }
          }
          if (error instanceof HttpErrorResponse && error.error instanceof Blob && error.error.type === "application/json") {
            // https://github.com/angular/angular/issues/19888
            // When request of type Blob, the error is also in Blob instead of object of the json data
            return new Promise<any>((resolve, reject) => {
              let reader = new FileReader();
              reader.onload = (e: Event) => {
                try {
                  const errmsg = JSON.parse((<any>e.target).result);

                  reject(new HttpErrorResponse({
                    error: errmsg,
                    headers: error.headers,
                    status: error.status,
                    statusText: error.statusText,
                    url: error.url
                  }));
                  this.authService.snackMessage(errmsg.message);
                } catch (e) {
                  reject(error);
                }
              };
              reader.onerror = (error) => {
                reject(error);
              };
              reader.readAsText(error.error);
            });
          }
          return throwError(() => error);
        }))
      )
  }
  private showProperMessage = (error: any) => {
    if (error.error.message)
      this.authService.noAccessMessage(error.error.message);
    else
      this.authService.noAccessMessage();
  }
  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set(this.authorizationHeader, `Bearer ` + token)
    });
  }

}

