import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { EN_messages } from 'interfaces/enums.enum';
import { ENSnackBarColors, ENSnackBarTimes } from 'interfaces/ioverall-config';
import { Observable } from 'rxjs';
import { BrowserSupportService } from 'services/browser-support.service';

import { AuthService } from './auth.service';
import { EN_Routes } from 'interfaces/routes.enum';

@Injectable({
  providedIn: 'root'
})

export class GuardService implements CanActivate {

  constructor(
    private authService: AuthService,
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
    this.authService.compositeService.routeToByExtras(EN_Routes.loginSlash, { queryParams: { returnUrl: returnUrl } });
  }
  private hasAuthUserAccessToThisRoute(returnUrl: string): boolean {
    if (!this.authService.isAuthUserLoggedIn()) {
      this.authService.signalRService.utilsService.snackBarMessage(EN_messages.accedd_denied_relogin, ENSnackBarTimes.sevenMili, ENSnackBarColors.danger);
      this.routeToLogin(returnUrl);
      return false;
    }
    return true;
  }
  private hasValidBrowserVersion = (): boolean => {
    if (!this.browserSupportService.isValidBrowserVersion()) {
      this.authService.signalRService.utilsService.snackBarMessage(EN_messages.browserSupport_alarm, ENSnackBarTimes.sevenMili, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }

}
