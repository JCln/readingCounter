import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserStorageService } from 'src/app/services/browser-storage.service';

import { UserService } from './../auth/user.service';
import { IAuthTokenType } from './../Interfaces/auth-token-type.enum';
import { ICredentials } from './../Interfaces/icredentials';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  accessToken: string = '';

  constructor(private userService: UserService, private router: Router, private mainService: MainService, private browserStorageService: BrowserStorageService) { }

  logging = (userData: ICredentials) => {
    this.mainService.POSTBODY('v1/account/login', userData).subscribe((res: IAuthTokenType) => {
      if (res) {
        this.accessToken = res.access_token;
        console.log( res.access_token);
        
        this.saveToLocalStorage();
        this.router.navigate(['wr']);
      }

    })
  }
  saveToLocalStorage = () => {
    this.browserStorageService.set('access_token', this.accessToken);
  }
  getAuthorizationToken = (): string => {
    if (this.accessToken.length === 0)
      return null;
    return this.accessToken;
  }
}
