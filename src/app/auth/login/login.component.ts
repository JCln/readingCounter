import { Component, OnInit } from '@angular/core';

import { ICredentials } from './../../Interfaces/icredentials';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData: ICredentials = { username: '', password: '' };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  logging = () => {
    this.authService.logging(this.userData);
  }
  
}
