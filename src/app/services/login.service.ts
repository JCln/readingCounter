import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private userService: UserService, private router: Router) { }

  logging = () => {
    // this.userService.logginIn(true);
    this.router.navigate(['/wr']);
  }
}
