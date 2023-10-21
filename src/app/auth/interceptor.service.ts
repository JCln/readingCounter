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

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  private readonly authorizationHeader = 'Authorization';
  private readonly bearer = `Bearer `;
  private readonly errorType = 'application/json';

  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private utilsService: UtilsService
  ) { }

  accessDenied_401 = async (error: EN_Mess) => {
    const config = {
      messageTitle: error,
      text: EN_Mess.access_denied401Msg,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      icon: 'pi pi-ban',
      disableClose: true,
    }
    await this.utilsService.firstConfirmDialog(config);
  }
  accessDeniedSpecial = async (message: EN_Mess) => {
    const config = {
      messageTitle: message,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      icon: 'pi pi-ban',
      disableClose: true,
    }
    await this.utilsService.firstConfirmDialog(config);
  }
  // when on login page, no dialog should open
  private showLoginMessage = async (error: any) => {
    this.utilsService.snackBarMessageFailed(error.error.message);
  }
  private showDialog = async (error: any) => {
    // await this.accessDenied_401(error).finally(() => {
    //   this.authService.logout();
    // });
    await this.accessDenied_401(error);
  }
  private showDialogSpeciall = async (error: any) => {
    await this.accessDeniedSpecial(error.error.message).finally(() => {
      this.authService.offlineLogout();
    });
  }
  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
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
              if (req.url.includes(EN_Routes.login)) {
                this.showLoginMessage(error);
                return;
              }
              if (!this.authService.isAuthUserLoggedIn()) {
                this.utilsService.goOutInMessage();
                this.authService.logout();
              }
              else {
                // if user have logged in
                const errTxt = error.error.message ? error.error.message : EN_Mess.access_denied401;
                this.showDialog(errTxt);
              }
            }
            if (error.status === ENClientServerErrors.cs428) {
              this.showDialogSpeciall(error);
            }
          }
          if (error instanceof HttpErrorResponse && error.error instanceof Blob && error.error.type === this.errorType) {
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

