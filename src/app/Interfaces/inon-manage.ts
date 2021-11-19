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
    text: string;
    color: string;
    showTime: number;
    canSave: boolean;
}

export interface IColor {
    value: string;
    isClicked: boolean;
    background: string;
}

export interface ITime {
    value: number;
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
