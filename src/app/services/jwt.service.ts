import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

import { AuthTokenType } from './../Interfaces/auth-token-type.enum';
import { BrowserStorageService } from './browser-storage.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(
    private browserStorageService: BrowserStorageService,
    private utilsService: UtilsService
  ) { }

  getDecodedAccessToken(): any {
    return jwt_decode(this.browserStorageService.get(AuthTokenType[0]));
  }
  getAccessTokenExpirationDateUtc(): Date {
    const decoded = this.getDecodedAccessToken();
    if (decoded.exp === undefined) {
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
  saveToLocalStorage = (accessToken: string): void => {
    this.browserStorageService.set(AuthTokenType[0], accessToken);
  }
  saveToLocalStorageRefresh = (refreshToken: string): void => {
    this.browserStorageService.set(AuthTokenType[1], refreshToken);
  }
  getAuthorizationToken = (): string => {
    const a = this.browserStorageService.get(AuthTokenType[0]);
    if (!a)
      return null;
    return a;
  }
  getRefreshToken = (): string => {
    const a = this.browserStorageService.get(AuthTokenType[1]);
    if (!a)
      return null;
    return a;
  }
  hasStoredAccessAndRefreshTokens(): boolean {
    const accessToken = this.getAuthorizationToken();
    const refreshToken = this.getRefreshToken();
    return !this.utilsService.isEmptyString(accessToken) && !this.utilsService.isEmptyString(refreshToken);
  }
}
