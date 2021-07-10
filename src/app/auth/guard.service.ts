import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ENSnackBarColors, ENSnackBarTimes } from 'interfaces/ioverall-config';
import { Observable } from 'rxjs';
import { SnackWrapperService } from 'services/snack-wrapper.service';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class GuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackWrapperService: SnackWrapperService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const returnUrl = state.url;
    return this.hasAuthUserAccessToThisRoute(returnUrl);
  }

  private routeToLogin(returnUrl: string) {
    this.router.navigate(['/login'], { queryParams: { returnUrl: returnUrl } });
  }
  private hasAuthUserAccessToThisRoute(returnUrl: string): boolean {
    if (!this.authService.isAuthUserLoggedIn()) {
      this.snackWrapperService.openSnackBar('دسترسی شما باطل شده است. مجددا وارد شوید', ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
      this.routeToLogin(returnUrl);
      return false;
    }
    return true;
  }
}
