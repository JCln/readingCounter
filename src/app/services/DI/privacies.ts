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
    canUpdateDeviceId: boolean,
    HSTSProtection?: boolean,// false
    userDisplayName: string,
    ip: string,
    browserVersion: string,
    browserTitle: string,
    browserShortTitle: string,
    browserEngine: string,
    browserType: string,
    osVersion: string,
    osTitle: string,
    osPlatform: string,
    osShortTitle: string,
    userAgent: string,
    fromTimeM?: string,
    fromTimeH?: any,
    toTimeM?: string,
    toTimeH?: string,
    fromTime: string,
    toTime: string,
    maxLogRecords: number,
    deactiveTerminationMinutes: number
}
export interface LoginBriefInfo {
    id: string,
    userId: string,
    loginDateTime: string,
    loginIp: string,
    wasSuccessful: true,
    browserVersion: string,
    browserTitle: string,
    browserShortTitle: string,
    browserEngine: string,
    browserType: string,
    osVersion: string,
    osTitle: string,
    osPlatform: string,
    osShortTitle: string,
    userAgent: string,
    wrongPassword: string,
    appVersion: string,
    userDisplayName: string,
    logoutDateTime: string,
    logoutReasonId: 0,
    username: string,
    invalidLoginReasonId: 1,
    twoStepExpireDateTime: string,
    twoStepEnterDateTime: string,
    twoStepWasSuccessful: true
}
export interface IPoliciesCompare {
    previous: IPolicies,
    this: IPolicies
}
export interface IRoleHistory {
    id: number,
    title: string,
    titleUnicode: string,
    needDeviceIdLogin: string,
    description: string,
    insertDateTime: string,
    insertDateJalali: string,
    insertTime: string,
    ip: string,
    browserVersion: string,
    browserTitle: string,
    browserShortTitle: string,
    browserEngine: string,
    browserType: string,
    osVersion: string,
    osTitle: string,
    osPlatform: string,
    osShortTitle: string,
    userAgent: string,
    userDisplayName: string
}
export interface IRoleDto {
    id?: number;
    title: string;
    titleUnicode: string;
    needDeviceIdLogin: boolean;
    displaySensitiveNotification: boolean;
}
export interface IRoleReqLogCompare {
    previous: IRoleDto,
    this: IRoleDto
}
export interface IUsersLoginBriefInfo {
    id: string,
    userId: string,
    loginDateTime: string,
    loginIp: string,
    wasSuccessful: true,
    browserVersion: string,
    browserTitle: string,
    browserShortTitle: string,
    browserEngine: string,
    browserType: string,
    osVersion: string,
    osTitle: string,
    osPlatform: string,
    osShortTitle: string,
    userAgent: string,
    wrongPassword: string,
    appVersion: string,
    userDisplayName: string,
}
export interface IUserMasterHistory {
    changeOrInsertLogId: string,
    insertDateTime: string,
    insertDateJalali: string,
    insertTime: string,
    ip: string,
    browserTitle: string,
}
export interface IPrivacy {
    minLength: number;
    maxLength: number;
    minPasswordLength: number;
    min_LockInvalidAttemps: number;
    max_LockInvalidAttemps: number;
    min_LockMin: number,
    max_LockMin: number,
    min_captcha: number,
    max_captcha: number,
    min_ReCaptcha: number,
    max_ReCaptcha: number,
    minLengthDeactiveTerminationMinutes: number,
    maxLengthDeactiveTerminationMinutes: number,
    minLengthMaxLogRecords: number,
}
export const privacies: IPrivacy = {
    minLength: 4,
    maxLength: 16,
    minPasswordLength: 6,
    min_LockInvalidAttemps: 1,
    max_LockInvalidAttemps: 10,
    min_LockMin: 10,//minutes
    max_LockMin: 120,//minutes
    min_captcha: 2,
    max_captcha: 10,
    min_ReCaptcha: 2,
    max_ReCaptcha: 10,
    minLengthDeactiveTerminationMinutes: 2,
    maxLengthDeactiveTerminationMinutes: 480,
    minLengthMaxLogRecords: 100,
}
export interface IUserDetailsHistory {
    changeOrInsertLogId: string,
    description: string,
    insertDateTime: string,
    insertDateJalali: string,
    insertTime: string,
    ip: string,
    browserVersion: string,
    browserTitle: string,
    browserShortTitle: string,
    browserEngine: string,
    browserType: string,
    osVersion: string,
    osTitle: string,
    osPlatform: string,
    osShortTitle: string,
    userAgent: string,
    userDisplayName: string,
}