import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { IAuthTokenType, IAuthUser, ICredentials } from 'interfaces/iauth-guard-permission';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { CloseTabService } from 'services/close-tab.service';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { MainService } from 'services/main.service';
import { UtilsService } from 'services/utils.service';

import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatusSource = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authStatusSource.asObservable();

  constructor(
    private mainService: MainService,
    private jwtService: JwtService,
    private utilsService: UtilsService,
    private closeTabService: CloseTabService,
    private dictionaryWrapperService: DictionaryWrapperService
  ) { }

  private getRefreshToken = (): string => {
    return this.jwtService.getRefreshToken();
  }
  refreshToken = (): Observable<any> => {
    return this.mainService.POSTBODY('V1/Account/Refresh', { 'refreshToken': this.getRefreshToken() })
  }
  logging = (userData: ICredentials) => {
    const returnUrl = this.utilsService.getRouteParams('returnUrl');
    this.mainService.POSTBODY('v1/account/login', userData)
      .pipe(
        catchError((error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              this.utilsService.snackBarMessageFailed(error.error.message);
            }
          }
          return throwError(error)
        })
      )
      .subscribe((res: IAuthTokenType) => {
        if (res) {
          this.saveTolStorage(res);
          this.savedStatusFromToken();
          this.routeToReturnUrl(returnUrl);

        }
        else {
          this.authStatusSource.next(false);
        }

      })
  }
  private clearAllSavedData = () => this.closeTabService.cleanAllData();
  private clearDictionaries = () => this.dictionaryWrapperService.cleanDictionaries();
  logout = () => {
    const refreshToken = this.jwtService.getRefreshToken();
    this.clearAllSavedData();
    this.clearDictionaries();
    this.mainService.POSTBODY('V1/Account/Logout', { refreshToken }).subscribe(() => {
      this.jwtService.removeAuthLocalStorage();
      this.utilsService.routeTo('/login');
    })
  }
  saveTolStorage = (token: IAuthTokenType) => {
    this.jwtService.saveToLocalStorage(token.access_token);
    this.jwtService.saveToLocalStorageRefresh(token.refresh_token);
  }
  savedStatusFromToken = () => {
    this.authStatusSource.next(true);
  }
  private routeToReturnUrl = (returnUrl: string) => {
    if (!this.utilsService.isNull(returnUrl))
      this.utilsService.routeTo(returnUrl);
    else
      this.utilsService.routeTo('/wr');
  }
  isAuthUserLoggedIn(): boolean {
    return this.jwtService.hasStoredAccessAndRefreshTokens() &&
      !this.jwtService.isAccessTokenTokenExpired();
  }
  getAuthUser(): IAuthUser | null {
    if (!this.isAuthUserLoggedIn()) {
      return null;
    }

    const decodedToken = this.jwtService.getDecodedAccessToken();
    const roles = this.jwtService.getDecodedTokenRoles();
    return Object.freeze({
      userId: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      userName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      displayName: decodedToken["DisplayName"],
      roles: roles
    });
  }
  noAccessMessage = () => {
    this.utilsService.snackBarMessageWarn(EN_messages.access_denied);
  }
  goOutInMessage = () => {
    this.utilsService.snackBarMessageFailed(EN_messages.accedd_denied_relogin);
  }

}
