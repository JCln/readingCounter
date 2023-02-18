import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { ENSnackBarColors, ENSnackBarTimes } from 'interfaces/ioverall-config';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { SnackWrapperService } from 'services/snack-wrapper.service';

import { MathS } from '../classes/math-s';
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
    private snackWrapperService: SnackWrapperService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.jwtService.getAuthorizationToken();
    if (authToken)
      req = this.addToken(req, authToken);

    // this.interactionService.getNetRequestStatus$().subscribe(res => {
    //   if (res == true) {
    //     console.log(res);
    //     setTimeout(() => {
    //       this.interactionService.setNetRequestStatus(false);
    //     }, 2000);
    //     return EMPTY;
    //   }
    // })

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
                this.goOutInMessage();
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
                  this.snackMessage(errmsg.message);
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
      this.noAccessMessage(error.error.message);
    else
      this.noAccessMessage();
  }
  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set(this.authorizationHeader, `Bearer ` + token)
    });
  }

  noAccessMessage = (errorMessage?: string) => {
    if (MathS.isNull(errorMessage))
      this.snackWrapperService.openSnackBar(EN_messages.access_denied, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
    else
      this.snackWrapperService.openSnackBar(errorMessage, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
  }
  goOutInMessage = () => {
    this.snackWrapperService.openSnackBar(EN_messages.accedd_denied_relogin, ENSnackBarTimes.tenMili, ENSnackBarColors.danger);
  }
  snackMessage = (message: EN_messages) => {
    this.snackWrapperService.openSnackBar(message, ENSnackBarTimes.twentyMili, ENSnackBarColors.danger);
  }
}

