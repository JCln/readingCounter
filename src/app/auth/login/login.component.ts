import { Component, OnInit } from '@angular/core';

import { ICredentials } from './../../Interfaces/icredentials';
import { UtilsService } from './../../services/utils.service';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData: ICredentials = { username: '', password: '' };

  constructor(
    private authService: AuthService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
  }
  logging = () => {
    if (this.utilsService.isNull(this.userData.password) || this.utilsService.isNull(this.userData.username)) {
      this.utilsService.snackBarMessageWarn('نام کاربری یا رمز عبور نمیتواند خالی باشد');
      return;
    }
    this.authService.logging(this.userData);
  }

}
