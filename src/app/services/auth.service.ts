import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { IAuthTokenType } from './../Interfaces/auth-token-type.enum';
import { JwtService } from './jwt.service';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private mainService: MainService, private jwtService: JwtService, private router: Router) { }

  private getRefreshToken = (): string => {
    return this.jwtService.getRefreshToken();
  }

  refreshToken = () => {
    this.mainService.POSTBODY('V1/Account/Refresh', { 'refreshToken': this.getRefreshToken() }).subscribe((res: IAuthTokenType) => {
      if (res) {
        this.jwtService.saveToLocalStorage(res.access_token);
        this.jwtService.saveToLocalStorageRefresh(res.refresh_token);
      }

    })
  }
  routeToLogin = () => {
    this.router.navigateByUrl('/login');
  }

}
