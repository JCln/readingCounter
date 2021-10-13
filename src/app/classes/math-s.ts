import { EN_messages } from 'interfaces/enums.enum';
import { ENSnackBarColors, ENSnackBarTimes } from 'interfaces/ioverall-config';
import { SnackWrapperService } from 'services/snack-wrapper.service';

export class MathS {

    static isNaN = (value: any): boolean => {
        return isNaN(value);
    }
    static isEmptyString(value: string): boolean {
        return !value || 0 === value.length;
    }
    static isNull(value: any): boolean {
        return typeof value === 'undefined' || !value || value.length === 0 || value === null;
    }
    static isNullZero(value: any): boolean {
        return typeof value === 'undefined' || value === null || value.length === 0;
    }
    static isNullTextValidation(value: string): boolean {
        return typeof value.trim() === 'undefined' || !value || value.trim().length === 0 || value.trim() === null;
    }
    static isNullWithText = (value: string | number, text: string, color: ENSnackBarColors): boolean => {
        const snackWrapperService = new SnackWrapperService;
        if (typeof value === 'undefined' || !value || value.toString().trim().length === 0) {
            snackWrapperService.openSnackBar(text, 3000, color);
            return false;
        }
        return true;
    }
    static plusOrMinus = (value: number, maxLength: number, minLength: number) => {
        const snackWrapperService = new SnackWrapperService;
        if (value > maxLength) {
            snackWrapperService.openSnackBar(`حداکثر تعداد ${maxLength} می‌باشد`, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
            return;
        }
        if (value < minLength) {
            snackWrapperService.openSnackBar(`حداقل تعداد ${minLength} می‌باشد`, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
            return;
        }
    }
    static isEmailValid = (email: string): boolean => {
        const snackWrapperService = new SnackWrapperService;
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            snackWrapperService.openSnackBar(EN_messages.invalid_email, ENSnackBarTimes.threeMili, ENSnackBarColors.danger);
            return false;
        }
        return true;
    }
    static persentCheck = (val: number): boolean => {
        if (val < 0 || val > 100)
            return false;
        return true;
    }
    static getRange = (val: any): string => {
        return val.toString().substring(0, 5);
    }
    static isExactEqual = (first: string, second: string): boolean => {
        if (first.trim() === second.trim())
            return true;
        return false;
    }
    static isSameLength = (from: string, to: string): boolean => {
        const snackWrapperService = new SnackWrapperService;
        if (from === null || to === null) {
            snackWrapperService.openSnackBar(EN_messages.sameLength_notValid, ENSnackBarTimes.fiveMili, ENSnackBarColors.warn);
            return;
        }
        if (from.toString().trim().length === to.toString().trim().length)
            return true;
        return false;
    }
    static lengthControl = (from: string | number, to: string | number, min: number, max: number): boolean => {
        if (from.toString().trim().length < min || to.toString().trim().length > max)
            return false;
        return true;
    }
    static isLowerThanMinLength = (sth: number | string, minLength: number): boolean => {
        if (sth.toString().length < minLength)
            return false;
        return true
    }
    static isLowerThanMaxLength = (sth: number | string, maxLength: number): boolean => {
        if (sth.toString().length > maxLength)
            return false;
        return true;
    }
    static isFromLowerThanTo = (from: number, to: number) => {
        if (from > to)
            return false;
        return true;
    }
    static isFromLowerThanToByString = (from: string, to: string) => {
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
    static mobileValidation = (mobile: string | number): boolean => {
        const snackWrapperService = new SnackWrapperService;
        if (!(mobile.toString().length === 11)) {
            snackWrapperService.openSnackBar(EN_messages.invalid_mobile, ENSnackBarTimes.threeMili, ENSnackBarColors.danger);
            return false;
        }
        return true;
    }

}
