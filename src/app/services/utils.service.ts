import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ENSnackBarColors, ENSnackBarTimes, ITitleValue } from 'interfaces/ioverall-config';
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

  getYears = (): ITitleValue[] => {
    return [
      { title: '1400', value: 1400 },
      { title: '1399', value: 1399 },
      { title: '1398', value: 1398 },
      { title: '1397', value: 1397 },
      { title: '1396', value: 1396 },
      { title: '1395', value: 1395 },
      { title: '1401', value: 1401 }
    ];
  }
  getQuantity = (): ITitleValue[] => {
    return [
      { title: '10', value: 10 },
      { title: '20', value: 20 },
      { title: '30', value: 30 }
    ];
  }

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
