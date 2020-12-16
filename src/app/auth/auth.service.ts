import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';

import { IAuthTokenType } from '../Interfaces/auth-token-type.enum';
import { ICredentials } from '../Interfaces/icredentials';
import { MainService } from '../services/main.service';
import { IAuthUser } from './../Interfaces/iauth-user';
import { SnackWrapperService } from './../services/snack-wrapper.service';
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
    private router: Router,
    private snackWrapperService: SnackWrapperService
  ) { }

  private getRefreshToken = (): string => {
    return this.jwtService.getRefreshToken();
  }

  refreshToken = (): Observable<any> => {
    return this.mainService.POSTBODY('V1/Account/Refresh', { 'refreshToken': this.getRefreshToken() })
  }
  logging = (userData: ICredentials) => {
    this.mainService.POSTBODY('v1/account/login', userData)
      .pipe(
        catchError((error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              this.snackWrapperService.openSnackBar('نام کاربری یا رمز عبور اشتباه است', 3000, 'snack_danger');
            }
          }
          return throwError(error)
        })
      )
      .subscribe((res: IAuthTokenType) => {
        if (res) {
          this.saveTolStorage(res);
          this.router.navigate(['wr']);
          this.savedStatusFromToken();
        }
        else {
          this.authStatusSource.next(false);
        }

      })
  }
  saveTolStorage = (token: IAuthTokenType) => {
    this.jwtService.saveToLocalStorage(token.access_token);
    this.jwtService.saveToLocalStorageRefresh(token.refresh_token);
  }
  savedStatusFromToken = () => {
    this.authStatusSource.next(true);
  }
  routeToLogin = () => {
    this.router.navigateByUrl('/login');
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

}
