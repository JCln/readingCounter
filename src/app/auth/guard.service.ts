import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { ENSnackBarColors, EN_messages } from 'interfaces/enums.enum';
import { BrowserSupportService } from 'services/browser-support.service';

import { AuthService } from './auth.service';
import { EN_Routes } from 'interfaces/routes.enum';
import { Observable } from 'rxjs/internal/Observable';

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
    this.authService.utilsService.compositeService.routeToByExtras(EN_Routes.loginSlash, { queryParams: { returnUrl: returnUrl } });
  }
  private hasAuthUserAccessToThisRoute(returnUrl: string): boolean {
    if (!this.authService.isAuthUserLoggedIn()) {
      this.authService.signalRService.utilsService.snackBarMessage(EN_messages.accedd_denied_relogin, ENSnackBarColors.danger);
      this.routeToLogin(returnUrl);
      return false;
    }
    return true;
  }
  private hasValidBrowserVersion = (): boolean => {
    if (!this.browserSupportService.isValidBrowserVersion()) {
      this.authService.signalRService.utilsService.snackBarMessage(EN_messages.browserSupport_alarm, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }

}
