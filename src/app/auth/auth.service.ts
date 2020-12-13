import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { MainService } from '../services/main.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private mainService: MainService, private jwtService: JwtService, private router: Router) { }

  private getRefreshToken = (): string => {
    return this.jwtService.getRefreshToken();
  }

  refreshToken = (): Observable<any> => {
    return this.mainService.POSTBODY('V1/Account/Refresh', { 'refreshToken': this.getRefreshToken() })
  }
  routeToLogin = () => {
    this.router.navigateByUrl('/login');
  }
  isAuthUserLoggedIn(): boolean {
    return this.jwtService.hasStoredAccessAndRefreshTokens() &&
      !this.jwtService.isAccessTokenTokenExpired();
  }

}
