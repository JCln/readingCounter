import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Data, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { IAuthGuardPermission } from './../Interfaces/iauth-guard-permission';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class GuardService implements CanActivate {
  private permissionObjectKey = 'permission';

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const permissionData = route.data[this.permissionObjectKey] as IAuthGuardPermission;
    const returnUrl = state.url;
    return this.hasAuthUserAccessToThisRoute(permissionData, returnUrl);
  }

  private hasAuthUserAccessToThisRoute(permissionData: Data, returnUrl: string): boolean {
    if (!this.authService.isAuthUserLoggedIn()) {
      this.routeToLogin(returnUrl);
      return false;
    }

    if (!permissionData) {
      return true;
    }

    if (Array.isArray(permissionData.deniedRoles) && Array.isArray(permissionData.permittedRoles)) {
      throw new Error("Don't set both 'deniedRoles' and 'permittedRoles' in route data.");
    }

    return true;
  }
  private routeToLogin(returnUrl: string) {
    this.router.navigate(['/login'], { queryParams: { returnUrl: returnUrl } });
  }
}
