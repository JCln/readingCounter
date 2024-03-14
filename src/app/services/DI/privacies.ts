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
    logoutReasonId: number,
    username: string,
    invalidLoginReasonId: number,
    twoStepExpireDateTime: string,
    twoStepEnterDateTime: string,
    twoStepWasSuccessful: boolean | string
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
    changeOrInsertLogId: string,
    displaySensitiveNotification: boolean,
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
    logoutDateTime: string,
    twoStepType?: string, // for two step type text controlled by client
    logoutReasonId: number,
    username: string,
    invalidLoginReasonId: number,
    twoStepExpireDateTime: string,
    twoStepEnterDateTime: string,
    twoStepWasSuccessful: true
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
    readonly maxPasswordLength: number;
    readonly minPasswordLength: number;
    readonly min_LockInvalidAttemps: number;
    readonly max_LockInvalidAttemps: number;
    readonly min_LockMin: number,
    readonly max_LockMin: number,
    readonly min_captcha: number,
    readonly max_captcha: number,
    readonly min_ReCaptcha: number,
    readonly max_ReCaptcha: number,
    readonly minLengthDeactiveTerminationMinutes: number,
    readonly maxLengthDeactiveTerminationMinutes: number,
    readonly minLengthMaxLogRecords: number,
}
export const privacies: IPrivacy = {
    minPasswordLength: 8,
    maxPasswordLength: 50,
    min_LockInvalidAttemps: 1,
    max_LockInvalidAttemps: 10,
    min_LockMin: 10,//minutes
    max_LockMin: 120,//minutes
    min_captcha: 2,
    max_captcha: 10,
    min_ReCaptcha: 2,
    max_ReCaptcha: 10,
    minLengthDeactiveTerminationMinutes: 3,
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