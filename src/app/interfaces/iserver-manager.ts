import { EN_messages } from "./enums.enum";

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