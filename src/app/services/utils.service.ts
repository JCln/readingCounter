import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private router: Router,
    private snackWrapperService: SnackWrapperService
  ) { }

  isEmptyString(value: string): boolean {
    return !value || 0 === value.length;
  }
  isNull(value: any): boolean {
    return typeof value === 'undefined' || !value || value.length === 0;
  }
  isNullWithText = (value: string | number, text: string): boolean => {
    if (typeof value === 'undefined' || !value || value.toString().length === 0) {
      this.snackWrapperService.openSnackBar(text, 3000, 'snack_danger');
      return false
    }
    return true;
  }
  isEmailValid = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      this.snackWrapperService.openSnackBar('ایمیل نادرست است', 3000, 'snack_danger');
      return false;
    }
    return true;
  }
  persentCheck = (val: number): boolean => {
    if (val >= 0 && val <= 100)
      return true;
    return false;
  }
  isExactEqual = (first: string, second: string): boolean => {
    if (first.trim() === second.trim())
      return true;
    return false;
  }
  isStringSameLength = (from: string, to: string): boolean => {
    if (from.trim().length === to.trim().length)
      return true;
    return false;
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
      this.snackWrapperService.openSnackBar('شماره موبایل نادرست است', 3000, 'snack_danger');
      return false;
    }
    return true;
  }

  // routing
  routeTo = (router: string) => {
    this.router.navigateByUrl(router);
  }

}
