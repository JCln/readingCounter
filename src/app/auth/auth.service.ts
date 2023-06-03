import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IAuthTokenType, IAuthUser, ICredentials } from 'interfaces/iauth-guard-permission';
import { Observable } from 'rxjs/internal/Observable';
import { CloseTabService } from 'services/close-tab.service';
import { CompositeService } from 'services/composite.service';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { SignalRService } from 'services/signal-r.service';

import { MathS } from '../classes/math-s';
import { EN_Routes } from '../interfaces/routes.enum';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public interfaceManagerService: InterfaceManagerService,
    private jwtService: JwtService,
    private closeTabService: CloseTabService,
    public signalRService: SignalRService,
    public compositeService: CompositeService,
    private dictionaryWrapperService: DictionaryWrapperService
  ) { }

  private getRefreshToken = (): string => {
    return this.jwtService.getRefreshToken();
  }
  refreshToken = (): Observable<any> => {
    return this.interfaceManagerService.POSTBODY(ENInterfaces.AuthsAccountRefresh, { 'refreshToken': this.getRefreshToken() })
  }
  logging = (userData: ICredentials): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(ENInterfaces.AuthsAccountLogin, userData).toPromise().then((res: IAuthTokenType) => {
        resolve(res);
      }).catch(() => {
        resolve(false)
      })
    });

  }
  private clearAllSavedData = () => this.closeTabService.cleanAllData();
  private clearDictionaries = () => this.dictionaryWrapperService.cleanDictionaries();
  logout = () => {
    const refreshToken = this.jwtService.getRefreshToken();
    this.clearAllSavedData();
    this.clearDictionaries();
    this.signalRService.disconnectConnection();
    this.interfaceManagerService.POSTBODY(ENInterfaces.AuthsAccountLogout, { refreshToken }).toPromise().then(() => {
      this.jwtService.removeAuthLocalStorage();
      this.compositeService.routeTo(EN_Routes.login);
    })
  }
  saveTolStorage = (token: IAuthTokenType) => {
    this.jwtService.saveToLocalStorage(token.access_token);
    this.jwtService.saveToLocalStorageRefresh(token.refresh_token);
  }
  routeToReturnUrl = (returnUrl: string) => {
    if (!MathS.isNull(returnUrl))
      this.compositeService.routeTo(returnUrl);
    else
      this.compositeService.routeTo(EN_Routes.wr);
  }
  isAuthUserLoggedIn(): boolean {
    return this.compositeService.isAuthUserLoggedIn();
  }
  getAuthUser(): IAuthUser | null {
    return this.compositeService.getAuthUser();
  }

}
