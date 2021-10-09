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
export interface IDashboardUnReadCount {
    value: number,
    title: string,
    order: number
}
export interface IDashboardMoshtarakCount {
    value: number,
    title: string,
    order: number
}
export interface IDashboardEditCountConfig {
    unEditCount: number,
    editedCount: number,
    ratio: number
}
export interface IDashboardEditCount {
    daily: IDashboardEditCountConfig,
    weekly: IDashboardEditCountConfig,
    monthly: IDashboardEditCountConfig,
    yearly: IDashboardEditCountConfig,
}

export interface IDashboardDateDifferenceConfig {
    count: number,
    median: number,
    average: number,
    standardDeviation: number,
    variance: number,
    mode: number
}
export interface IDashboardDateDifference {
    yesterday: IDashboardDateDifferenceConfig,
    weekly: IDashboardDateDifferenceConfig,
    monthly: IDashboardDateDifferenceConfig,
    annualy: IDashboardDateDifferenceConfig,
}
export interface IDashboardTimed {
    inDayCount: number,
    inWeekCount: number,
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