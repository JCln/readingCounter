import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';

import { MainService } from '../services/main.service';
import { SnackWrapperService } from '../services/snack-wrapper.service';
import { IAuthTokenType } from './../Interfaces/auth-token-type.enum';
import { ICredentials } from './../Interfaces/icredentials';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private mainService: MainService,
    private jwtService: JwtService,
    private router: Router,
    private snackWrapperService: SnackWrapperService
  ) { }

  logging = (userData: ICredentials) => {
    this.mainService.POSTBODY('v1/account/login', userData)
      .pipe(
        catchError((error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              this.snackWrapperService.openSnackBar('نام کاربری یا رمز عبور اشتباه است', 3000, 'snack_danger');
            }
          }
          throw new Error(error)
        })
      )
      .subscribe((res: IAuthTokenType) => {
        if (res) {
          this.jwtService.saveToLocalStorage(res.access_token);
          this.jwtService.saveToLocalStorageRefresh(res.refresh_token);
          this.router.navigate(['wr']);
        }

      })
  }
}
