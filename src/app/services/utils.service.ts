import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ENSnackBarColors, ENSnackBarTimes } from 'interfaces/ioverall-config';
import { SnackWrapperService } from 'services/snack-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackWrapperService: SnackWrapperService
  ) { }

  // snack bar
  snackBarMessageSuccess = (message: string) => {
    this.snackWrapperService.openSnackBar(message, ENSnackBarTimes.fourMili, ENSnackBarColors.success);
  }
  snackBarMessageWarn = (message: string) => {
    this.snackWrapperService.openSnackBar(message, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
  }
  snackBarMessageFailed = (message: string) => {
    this.snackWrapperService.openSnackBar(message, ENSnackBarTimes.fourMili, ENSnackBarColors.danger);
  }
  snackBarMessage = (message: string, time: ENSnackBarTimes, color: ENSnackBarColors) => {
    this.snackWrapperService.openSnackBar(message, time, color);
  }

  // routing
  routeToByUrl = (router: string) => {
    this.router.navigateByUrl(router);
  }
  routeTo = (router: string) => {
    this.router.navigate([router]);
  }
  routeToByParams = (router: string, params: any) => {
    this.router.navigate([router, params], { relativeTo: this.route.parent });
  }
  routeToByExtras = (router: string, body: object) => {
    this.router.navigate([router], body);
  }
  getRouteParams = (paramName: string): string => {
    return this.route.snapshot.paramMap.get(paramName);
  }
  getRouteBySplit = (spliter: string): string => {
    return this.router.url.split(spliter).pop();
  }
  //   
  /* STORAGE CONFIGS*/
  // cleanColumnStorage = (key: string) => {
  //   this.browserStorageService.removeSession(key);
  // }
  /**/

}
