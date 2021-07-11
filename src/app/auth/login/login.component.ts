import { Component, OnInit } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { ICredentials } from 'interfaces/iauth-guard-permission';
import { UtilsService } from 'services/utils.service';
import { Converter } from 'src/app/classes/converter';

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
  convertNumbers = () => {
    this.userData.password = Converter.persianToEngNumbers(this.userData.password);
    this.userData.username = Converter.persianToEngNumbers(this.userData.username);
  }
  logging = () => {
    this.convertNumbers();
    if (this.utilsService.isNull(this.userData.password) || this.utilsService.isNull(this.userData.username)) {
      this.utilsService.snackBarMessageWarn(EN_messages.userPass_empty);
      return;
    }
    this.authService.logging(this.userData);
  }

}
