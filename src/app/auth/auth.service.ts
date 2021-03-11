import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';

import { IAuthTokenType, IAuthUser, ICredentials } from '../Interfaces/iauth-guard-permission';
import { MainService } from '../services/main.service';
import { SnackWrapperService } from './../services/snack-wrapper.service';
import { UtilsService } from './../services/utils.service';
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
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private snackWrapperService: SnackWrapperService
  ) { }

  private getRefreshToken = (): string => {
    return this.jwtService.getRefreshToken();
  }

  refreshToken = (): Observable<any> => {
    return this.mainService.POSTBODY('V1/Account/Refresh', { 'refreshToken': this.getRefreshToken() })
  }
  logging = (userData: ICredentials) => {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
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
          this.savedStatusFromToken();
          this.routeToReturnUrl(returnUrl);

        }
        else {
          this.authStatusSource.next(false);
        }

      })
  }
  logout = () => {
    this.jwtService.removeAllLocalStorage();
    this.routeTo('/login');
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
      this.routeTo(returnUrl);
    else
      this.routeTo('wr');
  }
  routeTo = (router: string) => {
    this.router.navigate([router]);
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
