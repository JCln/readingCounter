import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';

import { ENSnackBarColors, ENSnackBarTimes } from './../Interfaces/ioverall-config';
import { BrowserStorageService } from './browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackWrapperService: SnackWrapperService,
    private browserStorageService: BrowserStorageService
  ) { }

  isNaN = (value: any): boolean => {
    return isNaN(value);
  }
  isEmptyString(value: string): boolean {
    return !value || 0 === value.length;
  }
  isNull(value: any): boolean {
    return typeof value === 'undefined' || !value || value.length === 0 || value === null;
  }
  isNullTextValidation(value: string): boolean {
    return typeof value.trim() === 'undefined' || !value || value.trim().length === 0 || value.trim() === null;
  }
  isNullWithText = (value: string | number, text: string, color: ENSnackBarColors): boolean => {
    if (typeof value === 'undefined' || !value || value.toString().trim().length === 0) {
      this.snackWrapperService.openSnackBar(text, 3000, color);
      return false
    }
    return true;
  }
  plusOrMinus = (value: number, maxLength: number, minLength: number) => {
    if (value > maxLength) {
      this.snackWrapperService.openSnackBar(`حداکثر تعداد ${maxLength} می‌باشد`, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return;
    }
    if (value < minLength) {
      this.snackWrapperService.openSnackBar(`حداقل تعداد ${minLength} می‌باشد`, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return;
    }
  }
  isEmailValid = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      this.snackWrapperService.openSnackBar('ایمیل نادرست است', ENSnackBarTimes.threeMili, ENSnackBarColors.danger);
      return false;
    }
    return true;
  }
  persentCheck = (val: number): boolean => {
    if (val < 0 || val > 100)
      return false;
    return true;
  }
  getRange = (val: number): string => {
    return val.toString().substring(0, 5);
  }
  isExactEqual = (first: string, second: string): boolean => {
    if (first.trim() === second.trim())
      return true;
    return false;
  }
  isSameLength = (from: string, to: string): boolean => {
    if (from.toString().trim().length === to.toString().trim().length)
      return true;
    return false;
  }
  lengthControl = (from: string | number, to: string | number, min: number, max: number): boolean => {
    if (from.toString().trim().length < min || to.toString().trim().length > max)
      return false;
    return true;
  }
  isFromLowerThanTo = (from: number, to: number) => {
    if (from > to)
      return false;
    return true;
  }
  isFromLowerThanToByString = (from: string, to: string) => {
    if (parseFloat(from) > parseFloat(to))
      return false;
    return true;
  }
  // private pushOrPopFromMobileNumber = (mobileNum: string | number) => {
  //   // unshift to array just allowed so => string to array and then to string should converted
  //   const arrayString = [];
  //   if (mobileNum.toString().startsWith('09')) {
  //     return true;
  //   } else if (mobileNum.toString().startsWith('9')) {
  //     arrayString.push(0);
  //     arrayString.push(mobileNum);
  //     mobileNum = arrayString.join("");
  //     return true;
  //   }
  //   return false;
  // }
  mobileValidation = (mobile: string | number): boolean => {
    if (!(mobile.toString().length === 11)) {
      this.snackWrapperService.openSnackBar('شماره موبایل نادرست است', ENSnackBarTimes.threeMili, ENSnackBarColors.danger);
      return false;
    }
    return true;
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
  cleanColumnStorage = (key: string) => {
    this.browserStorageService.removeSession(key);
  }
  /**/

}
