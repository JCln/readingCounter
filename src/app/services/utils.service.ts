import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ENSnackBarColors, ENSnackBarTimes, ISearchInOrderTo, ITitleValue } from 'interfaces/ioverall-config';
import { EnvService } from 'services/env.service';
import { SnackWrapperService } from 'services/snack-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private envService: EnvService,
    private snackWrapperService: SnackWrapperService
  ) { }

  getYears = (): ITitleValue[] => {
    return this.envService.years;
  }
  // should use getFirstYear function for Recognizing and performance
  getFirstYear = (): number => {
    return this.envService.years[0].value;
  }
  getDeleteDictionary = (): any[] => {
    return this.envService.getDeleteDictionary;
  }
  getSearchInOrderTo = (): ISearchInOrderTo[] => {
    return [
      {
        title: 'تاریخ',
        isSelected: true
      },
      {
        title: 'دوره',
        isSelected: false
      }
    ]
  }
  searchInOrderToReverse = (): ISearchInOrderTo[] => {
    return [
      {
        title: 'تاریخ',
        isSelected: false
      },
      {
        title: 'دوره',
        isSelected: true
      }
    ]
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

}
