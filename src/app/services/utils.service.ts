import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EN_messages } from 'interfaces/enums.enum';
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

  isNaN = (value: any): boolean => {
    return isNaN(value);
  }
  isEmptyString(value: string): boolean {
    return !value || 0 === value.length;
  }
  isNull(value: any): boolean {
    return typeof value === 'undefined' || !value || value.length === 0 || value === null;
  }
  isNullZero(value: any): boolean {
    return typeof value === 'undefined' || value === null || value.length === 0;
  }
  isNullTextValidation(value: string): boolean {
    return typeof value.trim() === 'undefined' || !value || value.trim().length === 0 || value.trim() === null;
  }
  isNullWithText = (value: string | number, text: string, color: ENSnackBarColors): boolean => {
    if (typeof value === 'undefined' || !value || value.toString().trim().length === 0) {
      this.snackWrapperService.openSnackBar(text, 3000, color);
      return false;
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
      this.snackWrapperService.openSnackBar(EN_messages.invalid_email, ENSnackBarTimes.threeMili, ENSnackBarColors.danger);
      return false;
    }
    return true;
  }
  persentCheck = (val: number): boolean => {
    if (val < 0 || val > 100)
      return false;
    return true;
  }
  getRange = (val: any): string => {
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
  isLowerThanMinLength = (sth: number | string, minLength: number): boolean => {
    if (sth.toString().length < minLength)
      return false;
    return true
  }
  isLowerThanMaxLength = (sth: number | string, maxLength: number): boolean => {
    if (sth.toString().length > maxLength)
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
      this.snackWrapperService.openSnackBar(EN_messages.invalid_mobile, ENSnackBarTimes.threeMili, ENSnackBarColors.danger);
      return false;
    }
    return true;
  }
  getYears = (): ITitleValue[] => {
    return [
      { title: '1400', value: 1400 },
      { title: '1399', value: 1399 },
      { title: '1398', value: 1398 },
      { title: '1397', value: 1397 },
      { title: '1396', value: 1396 },
      { title: '1395', value: 1395 }
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
