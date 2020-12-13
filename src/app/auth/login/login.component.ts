import { Component, OnInit } from '@angular/core';

import { LoginService } from '../login.service';
import { ICredentials } from './../../Interfaces/icredentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData: ICredentials = { username: '', password: '' };

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  logging = () => {
    this.loginService.logging(this.userData);
  }
}
