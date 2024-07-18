import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
import { ENClientServerErrors } from 'interfaces/iserver-manager';
import { UtilsService } from 'services/utils.service';
import { EN_Routes } from 'interfaces/routes.enum';
import { ENSnackBarColors, EN_Mess } from 'interfaces/enums.enum';

// export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  private readonly authorizationHeader = 'Authorization';
  private readonly bearer = `Bearer `;
  private readonly errorType = 'application/json';
  private returnUrl: string = '';

  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private utilsService: UtilsService
    // @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number
  ) { }

  accessDenied_401 = async (error: string) => {
    const config = {
      messageTitle: error,
      text: EN_Mess.access_denied401Msg,
      minWidth: '21rem',
      isInput: false,
      isImportant: true,
      icon: 'pi pi-ban',
      closable: true,
    }
    await this.utilsService.primeConfirmDialog(config);
  }
  accessDeniedSpecial = async (message: string) => {
    const config = {
      messageTitle: message,
      minWidth: '21rem',
      isInput: false,
      isImportant: true,
      icon: 'pi pi-ban',
      closable: true,
    }
    await this.utilsService.primeConfirmDialog(config);
  }
  // when on login page, no dialog should open
  private showLoginMessage = async (error: any) => {
    const messageText = error.error.message ? error.error.message : '';
    this.utilsService.snackWrapperService.openSnackBar(messageText, ENSnackBarColors.danger);
  }
  private showDialog = async (error: any) => {
    await this.accessDenied_401(error);
  }
  private showDialogSpeciall = async (error: any) => {
    await this.accessDeniedSpecial(error).finally(() => {
      this.authService.offlineLogout();
    });
  }
  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    // const authReq = req.clone({
    //   headers: req.headers
    //     .set(this.authorizationHeader, this.bearer + token)
    //     .set('Accept', 'application/json')
    //     .set('Content-Type', 'application/json')
    // });
    // return authReq;

    return req.clone({
      headers: req.headers.set(this.authorizationHeader, this.bearer + token)
    });
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const timeoutValue = req.headers.get('timeout') || this.defaultTimeout;
    // console.log(timeoutValue);
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
                this.authService.offlineLogout();
              }
              else {
                // if user have logged in
                const errTxt = error.error.message ? error.error.message : EN_Mess.access_denied401;
                // if there return value no need to copy from router again
                if (this.returnUrl.length === 0) {
                  this.showDialog(errTxt);
                  this.returnUrl = this.utilsService.compositeService.getRouterUrl();
                }
                // make returnUrl for next time single use. if no refresh has been happened
                setTimeout(() => {
                  this.returnUrl = '';
                }, 1000);
                this.authService.offlineLogout(this.returnUrl);
              }
            }
            // system time
            if (error.status === ENClientServerErrors.cs428) {
              this.showDialogSpeciall(error.error.message);
            }
            // block IP
            // if (error.status === ENClientServerErrors.cs451) {
            //   this.showDialogSpeciall(EN_Mess.access_denied451LegalReasons);
            // }     
            //   this.interactionService.showExtraDialog();
            // }
            // })
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

