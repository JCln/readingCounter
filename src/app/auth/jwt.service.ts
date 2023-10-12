import { Injectable } from '@angular/core';
import { ENAuthTokenType, IAuthTokenLogoutType, IAuthTokenType } from 'interfaces/iauth-guard-permission';
import * as jwt_decode from 'jwt-decode';
import { BrowserStorageService } from 'services/browser-storage.service';

import { MathS } from '../classes/math-s';
import { EnvService } from 'services/env.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(
    public browserStorageService: BrowserStorageService,
    private envService: EnvService
  ) { }

  getDecodedAccessToken(): any {
    if (this.shouldSaveTokensInLocal()) {
      return jwt_decode(this.browserStorageService.getLocal(ENAuthTokenType.access_token));
    }
    return jwt_decode(this.browserStorageService.getSession(ENAuthTokenType.access_token));
  }
  private getAccessTokenExpirationDateUtc(): Date {
    const decoded = this.getDecodedAccessToken();
    if (MathS.isEmptyString(decoded)) {
      return null;
    }
    const date = new Date(0); // The 0 sets the date to the epoch
    date.setUTCSeconds(decoded.exp);
    return date;
  }
  isAccessTokenTokenExpired(): boolean {
    const expirationDateUtc = this.getAccessTokenExpirationDateUtc();

    if (!expirationDateUtc) {
      return true;
    }
    return !(expirationDateUtc.valueOf() > new Date().valueOf());
  }
  getDecodedTokenRoles(): string[] | null {
    const decodedToken = this.getDecodedAccessToken();
    const roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    if (!roles) {
      return null;
    }

    if (Array.isArray(roles)) {
      return roles.map(role => role.toLowerCase());
    } else {
      return [roles.toLowerCase()];
    }
  }
  saveToStorage = (type: IAuthTokenType): void => {
    if (this.shouldSaveTokensInLocal()) {
      this.browserStorageService.setToLocal(ENAuthTokenType.access_token, type.access_token);
      this.browserStorageService.setToLocal(ENAuthTokenType.refresh_token, type.refresh_token);
      this.browserStorageService.setToLocal(ENAuthTokenType.login_id, type.login_id);
    }
    else {
      this.browserStorageService.setToSession(ENAuthTokenType.access_token, type.access_token);
      this.browserStorageService.setToSession(ENAuthTokenType.refresh_token, type.refresh_token);
      this.browserStorageService.setToSession(ENAuthTokenType.login_id, type.login_id);
    }
  }
  getAuthorizationToken = (): IAuthTokenLogoutType => {
    if (this.shouldSaveTokensInLocal()) {
      return {
        accessToken: this.browserStorageService.getLocal(ENAuthTokenType.access_token),
        refreshToken: this.browserStorageService.getLocal(ENAuthTokenType.refresh_token),
        loginId: this.browserStorageService.getLocal(ENAuthTokenType.login_id)
      }
    }
    else {
      return {
        accessToken: this.browserStorageService.getSession(ENAuthTokenType.access_token),
        refreshToken: this.browserStorageService.getSession(ENAuthTokenType.refresh_token),
        loginId: this.browserStorageService.getSession(ENAuthTokenType.login_id)
      }
    }
  }
  private getRefreshTokenLocal = (): string => {
    try {
      const a = this.browserStorageService.getLocal(ENAuthTokenType.refresh_token);
      if (!a)
        return null;
      return a;
    } catch (error) {
      console.error(error);
    }
  }
  private getRefreshTokenSession = (): string => {
    try {
      const a = this.browserStorageService.getSession(ENAuthTokenType.refresh_token);
      if (!a)
        return null;
      return a;
    } catch (error) {
      console.error(error);
    }
  }
  getRefreshToken = (): string => {
    return this.shouldSaveTokensInLocal() ? this.getRefreshTokenLocal() : this.getRefreshTokenSession()
  }
  private getAccessTokenLocal = (): string => {
    try {
      const a = this.browserStorageService.getLocal(ENAuthTokenType.access_token);
      if (!a) {
        return null;
      }
      return a;
    } catch (error) {
      console.error(error);
    }
  }
  private getAccessTokenSession = (): string => {
    try {
      const a = this.browserStorageService.getSession(ENAuthTokenType.access_token);
      if (!a) {
        return null;
      }
      return a;
    } catch (error) {
      console.error(error);
    }
  }
  getAccessToken = (): string => {
    return this.shouldSaveTokensInLocal() ? this.getAccessTokenLocal() : this.getAccessTokenSession()
  }
  private getLoginId = (): string => {
    const a = this.browserStorageService.getLocal(ENAuthTokenType.login_id);
    if (!a) {
      return null;
    }
    return a;
  }
  private getLoginIdSession = (): string => {
    const a = this.browserStorageService.getSession(ENAuthTokenType.login_id);
    if (!a) {
      return null;
    }
    return a;
  }
  getLoginIdToken = () => {
    return this.shouldSaveTokensInLocal() ? this.getLoginId() : this.getLoginIdSession();
  }
  hasStoredAccessAndRefreshTokens(): boolean {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    return (!MathS.isEmptyString(accessToken) && !MathS.isEmptyString(refreshToken));
  }
  removeAllLocalStorage = () => this.browserStorageService.removeAll();
  private removeAuthLocalStorage = () => {
    this.browserStorageService.removeLocal(ENAuthTokenType.access_token);
    this.browserStorageService.removeLocal(ENAuthTokenType.refresh_token);
    this.browserStorageService.removeLocal(ENAuthTokenType.login_id);
  }
  private removeTokensFromSession = () => {
    this.browserStorageService.removeSession(ENAuthTokenType.access_token);
    this.browserStorageService.removeSession(ENAuthTokenType.refresh_token);
    this.browserStorageService.removeSession(ENAuthTokenType.login_id);
  }
  shouldSaveTokensInLocal = (): boolean => {
    return this.envService.shouldSaveTokensInLocal;
  }
  removeTokens = () => {
    if (this.shouldSaveTokensInLocal())
      this.removeTokensFromSession();
    else
      this.removeAuthLocalStorage();
  }
  removeAllExceptAuths = () => {
    this.browserStorageService.removeAllExceptAuths();
  }
}
