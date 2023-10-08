import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
import { ENClientServerErrors } from 'interfaces/iserver-manager';
import { UtilsService } from 'services/utils.service';
import { EN_Mess } from 'interfaces/ioverall-config';
import { EN_Routes } from 'interfaces/routes.enum';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  private authorizationHeader = "Authorization";
  private bearer = `Bearer `;

  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private utilsService: UtilsService
  ) { }

  accessDenied_401 = async () => {
    const config = {
      messageTitle: EN_Mess.access_denied401,
      text: EN_Mess.access_denied401Msg,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      icon: 'pi pi-ban'
    }
    await this.utilsService.firstConfirmDialog(config);
  }
  // when on login page, no dialog should open
  private showLoginMessage = async (error: any) => {
    this.utilsService.snackBarMessageFailed(error.error.message);
  }
  private showDialog = async () => {
    await this.accessDenied_401();
    this.authService.logout();
  }
  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    const nothing = '';
    const urlPath = new URL(req.url).pathname.slice(1);
    // url path should not have slash (/)
    if (urlPath === EN_Routes.login || urlPath === ENInterfaces.AuthsCaptchaApiShow || urlPath === ENInterfaces.AuthsAccountLogout) {
      return req.clone({
        headers: req.headers.set(this.authorizationHeader, nothing)
      });
    }
    return req.clone({
      headers: req.headers.set(this.authorizationHeader, this.bearer + token)
    });
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.jwtService.getAccessToken();
    if (authToken)
      req = this.addToken(req, authToken);

    return next.handle(req)
      .pipe(
        catchError((error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === ENClientServerErrors.cs401) {
              if (req.url.includes('login')) {
                this.showLoginMessage(error);
                return;
              }
              if (!this.authService.isAuthUserLoggedIn()) {
                this.utilsService.goOutInMessage();
                this.authService.logout();
              }
              else {
                this.showDialog();
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
                  this.utilsService.snackMessage(errmsg.message);
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

}

