import { Injectable } from '@angular/core';
import { ENAuthTokenType, IAuthTokenLogoutType } from 'interfaces/iauth-guard-permission';
import * as jwt_decode from 'jwt-decode';
import { BrowserStorageService } from 'services/browser-storage.service';

import { MathS } from '../classes/math-s';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(
    private browserStorageService: BrowserStorageService
  ) { }

  getDecodedAccessToken(): any {
    try {
      return jwt_decode(this.browserStorageService.get(ENAuthTokenType.access_token));
    } catch (error) {
      console.error(error);
    }
  }
  getAccessTokenExpirationDateUtc(): Date {
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
  saveToLocalStorage = (accessToken: string): void => {
    this.browserStorageService.set(ENAuthTokenType.access_token, accessToken);
  }
  saveToLocalStorageRefresh = (refreshToken: string): void => {
    this.browserStorageService.set(ENAuthTokenType.refresh_token, refreshToken);
  }
  saveToLocalStorageLoginId = (loginId: string): void => {
    this.browserStorageService.set(ENAuthTokenType.login_id, loginId);
  }
  getAuthorizationToken = (): IAuthTokenLogoutType => {
    return {
      accessToken: this.browserStorageService.get(ENAuthTokenType.access_token),
      refreshToken: this.browserStorageService.get(ENAuthTokenType.refresh_token),
      loginId: this.browserStorageService.get(ENAuthTokenType.login_id)
    }
  }
  getRefreshToken = (): string => {
    try {
      const a = this.browserStorageService.get(ENAuthTokenType.refresh_token);
      if (!a)
        return null;
      return a;
    } catch (error) {
      console.error(error);
    }
  }
  getAccessToken = (): string => {
    try {
      const a = this.browserStorageService.get(ENAuthTokenType.access_token);
      if (!a) {
        return null;
      }
      return a;
    } catch (error) {
      console.error(error);
    }
  }
  hasStoredAccessAndRefreshTokens(): boolean {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    return (!MathS.isEmptyString(accessToken) && !MathS.isEmptyString(refreshToken));
  }
  removeAllLocalStorage = () => this.browserStorageService.removeAll();
  removeAuthLocalStorage = () => {
    this.browserStorageService.removeLocal(ENAuthTokenType.access_token);
    this.browserStorageService.removeLocal(ENAuthTokenType.refresh_token);
    this.browserStorageService.removeLocal(ENAuthTokenType.login_id);
  }
  removeAllExceptAuths = () => {
    this.browserStorageService.removeAllExceptAuths();
  }
}
