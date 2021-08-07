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
export interface ICountryManager {
    id: number;
    title: string;
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
export interface IZoneManager {
    title: string;
    id: number;
    regionId: number | string;
    isMetro: boolean
    logicalOrder: number;
}
export interface IZoneBoundManager {
    id: number;
    title: string;
    zoneId: number | string;
    govermentalCode: string;
    fromEshterak: string;
    toEshterak: string;
    fromRadif: number;
    toRadif: number;
    host: string;
    dbUserName: string;
    dbPassword: string;
    dbInitialCatalog: string;
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
    readingPeriodId: number,
    kindId?: number,
    period?: number
}
export interface IBatchImportDataResponse {
    trackNumber: number,
    count: number,
    errorCount: number,
    counterReaderName: string,
    fragmentDetailId: string,
    listNumber: string
}
export interface IImportDataResponse {
    trackNumber: number,
    count: number,
    errorCount: number,
    counterReaderName: string
}
export interface IImportSimafaBatchReq {
    routeAndReaderIds: [
        {
            routeId: string,
            counterReaderId: string | number
        }
    ],
    readingProgramId: string,
    fragmentMasterId: string,
    zoneId: number,
    alalHesabPercent: number,
    imagePercent: number,
    hasPreNumber: boolean,
    displayBillId: boolean,
    displayRadif: boolean,
    year: number,
    readingPeriodId: number
}
export interface IImportSimafaSingleReq {
    counterReaderId: string,
    readingProgramId: string,
    zoneId: number,
    alalHesabPercent: number,
    imagePercent: number,
    hasPreNumber: boolean,
    displayBillId: boolean,
    displayRadif: boolean,
    year: number,
    readingPeriodId: number
}
export interface IImportSimafaReadingProgramsReq {
    readingPeriodId: number,
    year: number,
    zoneId: number
}
export interface IReadingProgramRes {
    id: string,
    zoneId: number,
    fromEshterak: string,
    toEshterak: string,
    listNumber: string,
    year: number,
    readingPeriodId: number,
    canContinue: boolean
}
export interface IChangePassword {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}
/* DASHBOARD */
export interface IDashboardUsersInfo {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}
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
export interface IDashboardTraverseTimed {
    ahad: IDashboardTimed,
    karbari: IDashboardTimed,
    mobile: IDashboardTimed,
    counterSerial: IDashboardTimed,
    empty: IDashboardTimed,
}
export interface IDashboardTimedItem {
    _8_10: number,
    _8_10Closed: number,
    _8_10Rate: number,
    _10_12: number,
    _10_12Closed: number,
    _10_12Rate: number,
    _12_14: number,
    _12_14Closed: number,
    _12_14Rate: number,
    _14_16: number,
    _14_16Closed: number,
    _14_16Rate: number,
    _16_18: number,
    _16_18Closed: number,
    _16_18Rate: number,
    other: number,
    otherClosed: number,
    otherRate: number,
    title: string
}
export interface IDashboardSpecial {
    daily: IDashboardTimedItem,
    weekly: IDashboardTimedItem,
    monthly: IDashboardTimedItem,
    yearly: IDashboardTimedItem
}