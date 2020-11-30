import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

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

  refreshToken = (): Observable<any> => {
    return this.mainService.POSTBODY('V1/Account/Refresh', { 'refreshToken': this.getRefreshToken() })
  }
  routeToLogin = () => {
    this.router.navigateByUrl('/login');
  }

}
