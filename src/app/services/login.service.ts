import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { IAuthTokenType } from './../Interfaces/auth-token-type.enum';
import { ICredentials } from './../Interfaces/icredentials';
import { JwtService } from './jwt.service';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private mainService: MainService,
    private jwtService: JwtService,
    private router: Router,
  ) { }

  logging = (userData: ICredentials) => {
    const isExpired: boolean = this.jwtService.isAccessTokenTokenExpired();
    if (!isExpired) {
      console.log('could send data without new token');
    }
    this.mainService.POSTBODY('v1/account/login', userData).subscribe((res: IAuthTokenType) => {
      if (res) {
        this.jwtService.saveToLocalStorage(res.access_token);
        this.router.navigate(['wr']);
      }

    })
  }
}
