import { EN_messages } from "./enums.enum"

export enum ENClientServerErrors {
    'cs400' = 400,
    'cs401' = 401,
    'cs403' = 403,
    'cs404' = 404,
    'cs405' = 405,
    'cs408' = 408,
    'cs409' = 409,
    'cs410' = 410,
    'cs422' = 422,
    'cs428' = 428,
    'cs451' = 451,
    'cs429' = 429,
    'cs0' = 0,
    'cs500' = 500,
    'cs501' = 501,
    'cs502' = 502,
    'cs504' = 504,
}
export interface IRequestLogInput {
    jalaliDay: string
    toTime: string,
    fromTimeH: any,
    fromTimeM: string,
    fromTime: string,
    toTimeH: string,
    toTimeM: string,
}
export interface IRequestLog {
    id: number,
    userDisplayName: string,
    path: string,
    readablePath: string,
    controllerAction: string,
    requestDateJalali: string,
    requestTime: string,
    ip: string
    tokenFailureReason: string
}
export interface IGetBlocked {
    id: number,
    targetUserDisplayName: string,
    targetUsername: string,
    insertDateTime: string,
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
    userAgent: string
}
export interface IGetBlockedCompareVals {
    id: number,
    ip: string,
    subnet: string,
    isSafe: boolean,
    isV6: boolean,
    username: string,
    userDisplayName: string,
    description: string,
    insertDateJalali: string,
    insertTime: string,
    userIp: string,
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
    isRecordAuthentic: boolean
}
export interface IIOPolicyHistory {
    id: number,
    inputExtensions: string,
    contentType: string,
    inputMaxSizeKb: number,
    inputMaxCountPerUser: number,
    inputMaxCountPerDay: number,
    outputMaxCountPerUser: number,
    outputMaxCountPerDay: number,
    userDisplayName: string,
    username: string,
    isActive: boolean,
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
    isAuthentic: boolean
}
export interface IIOPolicyHistoryCompare {
    previous: IIOPolicyHistory,
    this: IIOPolicyHistory
}
export interface IIOPolicy {
    id: number,
    inputExtensions: string,
    contentType: string,
    inputMaxSizeKb: number,
    inputMaxCountPerUser: number,
    inputMaxCountPerDay: number,
    outputMaxCountPerUser: number,
    outputMaxCountPerDay: number,
    readonly inputMaxSizeKbMinLength?: number,
    readonly inputMaxCountPerUserMinLength?: number,
    readonly inputMaxCountPerDayMinLength?: number,
    readonly outputMaxCountPerUserMinLength?: number,
    readonly outputMaxCountPerDayMinLength?: number,
}
export const IOPolicy: IIOPolicy = {
    id: null,
    inputExtensions: '',
    contentType: '',
    inputMaxSizeKb: null,
    inputMaxCountPerUser: null,
    inputMaxCountPerDay: null,
    outputMaxCountPerUser: null,
    outputMaxCountPerDay: null,
    inputMaxSizeKbMinLength: 0,
    inputMaxCountPerUserMinLength: 0,
    inputMaxCountPerDayMinLength: 0,
    outputMaxCountPerUserMinLength: 0,
    outputMaxCountPerDayMinLength: 0


}


export interface IIpFilterCompare {
    previous: IGetBlockedCompareVals,
    this: IGetBlockedCompareVals
}
export interface IManageServerErrorsRes {
    errorId: string,
    message: string,
    statusCode: number,
    username: string
}
export interface IUserActivationREQ {
    fromDate: string,
    toDate: string,
    userActivationLogTypes: number[]
}
export interface IUserActivation {
    id: string,
    targetUserId: string,
    userId: string,
    description: string,
    changeDateTime: string,
    changeDateJalali: string,
    changeTime: string,
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
    targetUserDisplayName: string
}
export interface IManageServerErrors {
    name: string,
    errorType: ENClientServerErrors
}
export interface IManageServer {
    name: string;
    icon: string;
    background: string;
    color?: string;
    clickFunction?: ENManageServers;
    description?: EN_messages
}
export enum ENManageServers {
    serverDelete = 'serverDelete',
    linkToHangfire = 'linkToHangfire',
    linkToHealthCheck = 'linkToHealthCheck',
    expireLicense = 'expireLicense',
    extendLicenseTime = 'ExtendLicenseTime',
    compressLicenseTime = 'compressLicenseTime',
    resetIIS = 'resetIIS',
    offlineTheAPP = 'offlineTheAPP',
    resetApp = 'resetApp',
    checkAuthenticiy = 'checkAuthenticiy'
}
export interface IServerAuthenticityBrief {
    invalidCount: number,
    isAuthentic: boolean,
    overalCount: number,
    section: string
}
export interface IManageDrivesInfo {
    driveName: string,
    volumeLabel: string,
    freeSpaceGb: number,
    totalSpaceGb: number,
    usedSpaceGb: number,
    avaialableSpaceGb: number,
    reservedSpaceMb: number,
    freePercent: number,
    usedPercent: number
}
export interface IServerOSInfo {
    cpuCoreCount: number,
    version: string,
    servicePack: string,
    elapsedDateTime: string,
    isOs64: boolean,
    systemDateTime: string,
}
export interface IIpRule {
    endpoint: string,
    period: string,
    periodTimespan: number,
    limit: number,
    quotaExceededResponse: number,
    ip?: string,
    monitorMode: boolean,
}
export interface IIpRules {
    ip: string,
    rules: IIpRule
}
export interface IBlockOrSafeIp {
    id: number,
    ip: string,
    subnet: string,
    isSafe: boolean,
    isV6: boolean,
    userId: string,
    targetUserDisplayName: string,
    targetUsername: string,
    isNew?: boolean
}
export interface IIOAttemptsLog {
    id: number,
    insertDateTime: string,
    userDisplayName: string,
    username: string,
    description: string,
    isOutput: boolean,
    recordCount: number,
    isInvalid: boolean,
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
    userAgent: string
}
export interface ILogMemoryStatus {
    maxLogCount: number,
    logCount: number,
    remainedCount: number,
    systemDateTime: string
}