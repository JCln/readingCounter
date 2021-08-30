import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { EN_messages } from 'interfaces/enums.enum';
import { ENSnackBarColors, ENSnackBarTimes } from 'interfaces/ioverall-config';
import { Observable } from 'rxjs';
import { BrowserSupportService } from 'services/browser-support.service';
import { SnackWrapperService } from 'services/snack-wrapper.service';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class GuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackWrapperService: SnackWrapperService,
    private browserSupportService: BrowserSupportService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const returnUrl = state.url;
    return (this.hasAuthUserAccessToThisRoute(returnUrl) && this.hasValidBrowserVersion());
  }

  private routeToLogin(returnUrl: string) {
    this.router.navigate(['/login'], { queryParams: { returnUrl: returnUrl } });
  }
  private hasAuthUserAccessToThisRoute(returnUrl: string): boolean {
    if (!this.authService.isAuthUserLoggedIn()) {
      this.snackWrapperService.openSnackBar(EN_messages.accedd_denied_relogin, ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
      this.routeToLogin(returnUrl);
      return false;
    }
    return true;
  }
  private hasValidBrowserVersion = (): boolean => {
    if (!this.browserSupportService.isValidBrowserVersion()) {
      this.snackWrapperService.openSnackBar(EN_messages.browserSupport_alarm, ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
      return false;
    }
    return true;
  }

}
