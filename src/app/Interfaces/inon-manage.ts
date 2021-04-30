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
export interface IProvinceManager {
    readonly id: number;
    title: string;
    countryId: number | string;
    logicalOrder: number;
}
export interface IRegionManager {
    readonly id: number;
    provinceId: number | string;
    logicalOrder: number;
    title: string;
}
export interface IRoleManager {
    id: number;
    title: string;
    isActive: boolean
    needDeviceIdLogin: boolean;
    titleUnicode: string;
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
export interface IImportDynamicDefault {
    fromEshterak: string,
    toEshterak: string,
    zoneId: number,
    alalHesabPercent: number,
    imagePercent: number,
    hasPreNumber: boolean,
    displayBillId: boolean,
    displayRadif: boolean,
    fromDate: string,
    toDate: string,
    counterReaderId: string,
    readingPeriodId: number
}
export interface IImportDynamic {
    fromEshterak: string,
    toEshterak: string,
    zoneId: number,
    alalHesabPercent: number,
    imagePercent: number,
    hasPreNumber: boolean,
    displayBillId: boolean,
    displayRadif: boolean,
    fromDate: string,
    toDate: string,
    counterReaderId: string,
    kindId?: number,
    period?: number
}
export interface IImportDynamicRes {
    trackNumber: number,
    count: number,
    errorCount: number
}

export interface IChangePassword {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}
/* DASHBOARD */
export interface IDashboardKarkardTimed {
    adiCount: number,
    faqedCount: number,
    maneCount: number,
    xarabCount: number,
    tavizCount: number,
    saierCount: number,
    caption: string
}
export interface IDashboardTimed {
    inDayCount: number,
    inWeekCont: number,
    inMonthCount: number,
    inYearCount: number
}
export interface IDashboardReadDaily {
    count: number,
    period: string,
    hint: string
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