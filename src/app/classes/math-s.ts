import { ENRandomNumbers } from "interfaces/enums.enum";

export class MathS {

    static isNaN = (value: any): boolean => {
        return isNaN(value);
    }
    static isEmptyString(value: string): boolean {
        return !value || 0 === value.length;
    }
    static isNull(value: any): boolean {
        return value === undefined || value === null || typeof value === 'undefined' || !value || value.length === 0;
    }
    // to validate zero numbers
    static isNullZero(value: any): boolean {
        return typeof value === 'undefined' || value === null || value.length === 0;
    }
    static isNullTextValidation(value: string): boolean {
        return value === undefined || !value || value.trim().length === 0 || value.trim() === null;
    }
    static isBoolean = (val: any): boolean => {
        return typeof val == 'boolean' ? true : false;
    }
    static isEmailValid = (email: string): boolean => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            return false;
        }
        return true;
    }
    static persentCheck = (val: number): boolean => {
        if (val === undefined || val === null)
            return false;
        if (val < ENRandomNumbers.zero || val > ENRandomNumbers.oneHundred)
            return false;
        return true;
    }
    static getRange = (val: any): string => {
        return val.toString().substring(ENRandomNumbers.zero, ENRandomNumbers.five);
    }
    static getFormatRange = (val: any): any => {
        return this.isNull(val) ?
            null :
            val.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
    }
    static isExactEqual = (first: string, second: any): boolean => {
        if (first.trim() === second.trim())
            return true;
        return false;
    }
    static isSameLength = (from: string, to: string): boolean => {
        if (from === null || to === null) {
            return false;
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
    static trimation = (val: string): string => {
        return val.trim();
    }
    static getRandomColors(len: number): string[] {
        let colors = [];
        for (let index = 0; index < len; index++) {
            let color = '#' + (Math.round(Math.random() * 100).toString() + Math.round(Math.random() * 100).toString() + Math.round(Math.random() * 100).toString());
            colors.push(color);
        }
        return colors;
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
        if (mobile.toString().trim().length !== ENRandomNumbers.eleven) {
            return false;
        }
        return true;
    }
    static isExactLengthYouNeed = (value: string | number, long: number): boolean => {
        if (value.toString().trim().length === long) {
            return true;
        }
        return false;
    }

}
