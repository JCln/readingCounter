import { ENRandomNumbers, ENSnackBarColors, ENSnackBarColorsExact, ENSnackBarTimes } from 'interfaces/ioverall-config';

export interface IPolicies {
    id: number,
    enableValidIpCaptcha: boolean,
    requireCaptchaInvalidAttempts: number,
    enableValidIpRecaptcha: boolean,
    requireRecaptchaInvalidAttempts: number,
    lockInvalidAttempts: number,
    lockMin: number,
    minPasswordLength: number,
    passwordContainsNumber: boolean,
    passwordContainsLowercase: boolean,
    passwordContainsUppercase: boolean,
    passwordContainsNonAlphaNumeric: boolean,
    canUpdateDeviceId: boolean
}
export interface IPrivacy {
    minLength: number;
    maxLength: number;
    minPasswordLength: number;
}
export interface IAPK {
    versionName: string;
    versionCode: number;
    id?: string;
    file?: File;
    fileRepositoryId: string;
}

export interface IUploadAPK {
    versionName: string;
    versionCode: number;
    description?: string;
    file?: File;
}
export interface IMessage {
    title: string;
    message: string;
    color: ENSnackBarColors;
    time: ENSnackBarTimes;
    canSave: boolean;
    text?: ENRandomNumbers;
    exactColor?: ENSnackBarColorsExact;
}

export interface IColor {
    text: string,
    value: ENSnackBarColors;
    isClicked: boolean;
    background: ENSnackBarColorsExact;
}

export interface ITime {
    value: ENSnackBarTimes;
    title: ENRandomNumbers;
    isClicked: boolean;
}
export interface IChangePassword {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}
export interface IOffloadModifyReq {
    id: string,
    modifyType: number,
    checkedItems: number[],
    counterStateId: number,
    counterNumber: number,
    jalaliDay: string,
    description: string
}
export interface IBatchModifyRes {
    doneCount: number,
    errorCount: number,
    detailsInfo: [
        {
            onOffLoadId: string,
            hasError: boolean,
            errorDescription: string
        }
    ]
}