import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuthUser } from 'interfaces/iauth-guard-permission';
import { JwtService } from '../auth/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class CompositeService {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jwtService: JwtService,
  ) { }

  getRouteParams = (paramName: string): string => {
    return this.route.snapshot.paramMap.get(paramName);
  }
  routeTo = (router: string) => {
    this.router.navigate([router]);
  }
  routeToExtras = (router: any[], extras?: any) => {
    this.router.navigate(router, extras);
  }
  // routing
  routeToByUrl = (router: string) => {
    this.router.navigateByUrl(router);
  }
  routeToByParams = (router: string, params: any) => {
    this.router.navigate([router, params], { relativeTo: this.route.parent });
  }
  routeToByExtras = (router: string, body: object) => {
    this.router.navigate([router], body);
  }
  getRouteBySplit = (spliter: string): string => {
    return this.router.url.split(spliter).pop();
  }
  getRouterUrl = (): string => {
    return this.router.url;
  }
  getRefreshToken = (): string => {
    return this.jwtService.getRefreshToken();
  }
  isAuthUserLoggedIn(): boolean {
    return (this.jwtService.hasStoredAccessAndRefreshTokens() &&
      !this.jwtService.isAccessTokenTokenExpired());
  }
  getAuthUser(): IAuthUser | null {
    if (!this.isAuthUserLoggedIn()) {
      return null;
    }

    const decodedToken = this.jwtService.getDecodedAccessToken();
    const roles = this.jwtService.getDecodedTokenRoles();
    return Object.freeze({
      userId: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      userName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      displayName: decodedToken["DisplayName"],
      roles: roles
    });
  }
}
