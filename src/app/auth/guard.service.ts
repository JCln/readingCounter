import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class GuardService implements CanActivate {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.loginStatus()) {
      this.router.navigateByUrl('wr');
      return true;
    }
    this.router.navigateByUrl('login');
    return false;
  }


  constructor(private userService: UserService, private router: Router) { }
}
