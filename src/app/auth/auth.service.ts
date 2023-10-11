import { AjaxReqWrapperService } from 'services/ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENAuthTokenType, IAuthTokenLogoutType, IAuthTokenType, IAuthUser, ICredentials } from 'interfaces/iauth-guard-permission';
import { CloseTabService } from 'services/close-tab.service';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { SignalRService } from 'services/signal-r.service';

import { MathS } from '../classes/math-s';
import { EN_Routes } from '../interfaces/routes.enum';
import { JwtService } from './jwt.service';
import { UtilsService } from 'services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    private jwtService: JwtService,
    private closeTabService: CloseTabService,
    public signalRService: SignalRService,
    public utilsService: UtilsService,
    private dictionaryWrapperService: DictionaryWrapperService
  ) { }

  getRefreshToken = async (): Promise<any> => {
    const request: IAuthTokenLogoutType = {
      refreshToken: this.jwtService.getRefreshToken(),
      accessToken: this.jwtService.getAccessToken(),
      loginId: this.jwtService.getLoginIdToken()
    }
    try {
      return await this.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.AuthsAccountRefresh, request);
    } catch {
      return false;
    }
  }
  logging = (userData: ICredentials): Promise<any> => {
    return new Promise((resolve) => {
      this.ajaxReqWrapperService.interfaceManagerService.POSTBODY(ENInterfaces.AuthsAccountLogin, userData).toPromise().then((res: IAuthTokenType) => {
        resolve(res);
      }).catch(() => {
        resolve(false)
      })
    });

  }
  private clearAllSavedData = () => this.closeTabService.cleanAllData();
  private clearDictionaries = () => this.dictionaryWrapperService.cleanDictionaries();
  logout = async () => {
    this.clearAllSavedData();
    this.clearDictionaries();
    this.signalRService.disconnectConnection();
    await this.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.AuthsAccountLogout,
      this.jwtService.getAuthorizationToken()
    );
    this.jwtService.removeTokens();
    this.utilsService.routeTo(EN_Routes.loginSlash);
  }
  saveTolStorage = (token: any) => {
    this.jwtService.removeTokens();
    this.jwtService.saveToStorage(token);
  }
  saveToSessionStorage = (token: IAuthTokenType) => {
    this.jwtService.removeTokens();
    this.jwtService.saveToStorage(token);
  }
  routeToReturnUrl = (returnUrl: string) => {
    if (!MathS.isNull(returnUrl))
      this.utilsService.routeTo(returnUrl);
    else
      this.utilsService.routeTo(EN_Routes.wr);
  }
  isAuthUserLoggedIn(): boolean {
    return this.utilsService.compositeService.isAuthUserLoggedIn();
  }
  getAuthUser(): IAuthUser | null {
    return this.utilsService.compositeService.getAuthUser();
  }

}
