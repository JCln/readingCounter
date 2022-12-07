import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IAuthTokenType, IAuthUser, ICredentials } from 'interfaces/iauth-guard-permission';
import { Observable } from 'rxjs/internal/Observable';
import { CloseTabService } from 'services/close-tab.service';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { MainService } from 'services/main.service';
import { SignalRService } from 'services/signal-r.service';
import { UtilsService } from 'services/utils.service';

import { MathS } from '../classes/math-s';
import { EN_Routes } from '../interfaces/routes.enum';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private mainService: MainService,
    private jwtService: JwtService,
    private utilsService: UtilsService,
    private closeTabService: CloseTabService,
    private signalRService: SignalRService,
    private dictionaryWrapperService: DictionaryWrapperService
  ) { }

  private getRefreshToken = (): string => {
    return this.jwtService.getRefreshToken();
  }
  refreshToken = (): Observable<any> => {
    return this.mainService.POSTBODY(ENInterfaces.AuthsAccountRefresh, { 'refreshToken': this.getRefreshToken() })
  }
  logging = (userData: ICredentials) => {
    const returnUrl = this.utilsService.getRouteParams('returnUrl');
    this.mainService.POSTBODY(ENInterfaces.AuthsAccountLogin, userData).toPromise().then((res: IAuthTokenType) => {
      this.saveTolStorage(res);
      this.routeToReturnUrl(returnUrl);
    })
  }
  private clearAllSavedData = () => this.closeTabService.cleanAllData();
  private clearDictionaries = () => this.dictionaryWrapperService.cleanDictionaries();
  logout = () => {
    const refreshToken = this.jwtService.getRefreshToken();
    this.clearAllSavedData();
    this.clearDictionaries();
    this.signalRService.disconnectConnection();
    this.mainService.POSTBODY(ENInterfaces.AuthsAccountLogout, { refreshToken }).toPromise().then(() => {
      this.jwtService.removeAuthLocalStorage();
      this.utilsService.routeTo(EN_Routes.login);
    })
  }
  saveTolStorage = (token: IAuthTokenType) => {
    this.jwtService.saveToLocalStorage(token.access_token);
    this.jwtService.saveToLocalStorageRefresh(token.refresh_token);
  }
  private routeToReturnUrl = (returnUrl: string) => {
    if (!MathS.isNull(returnUrl))
      this.utilsService.routeTo(returnUrl);
    else
      this.utilsService.routeTo(EN_Routes.wr);
  }
  isAuthUserLoggedIn(): boolean {
    return (this.jwtService.hasStoredAccessAndRefreshTokens() &&
      !this.jwtService.isAccessTokenTokenExpired());
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

}
