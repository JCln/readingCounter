import { ENClientServerErrors } from './ioverall-config';

export interface IForbiddenManager {
    gisAccuracy: string,
    id: string,
    displayName: string,
    imageCount: number,
    insertDateJalali: string,
    insertDateTime: string,
    insertTime: string,
    nextEshterak: string,
    postalCode: string,
    preEshterak: string,
    tedadVahed: number
    userId: string,
    x: string
    y: string
    zoneId: string
}
export interface IMostReportInput {
    zoneId: number,
    fromDate: string,
    toDate: string,
    counterReaderId: string,
    readingPeriodId: number,
    year: number,
    reportCode: number,
    zoneIds: [
        number
    ]
}
export enum ENManageServers {
    serverDelete = 'serverDelete',
    linkToHangfire = 'linkToHangfire',
    linkToHealthCheck = 'linkToHealthCheck'
}
export interface IManageServerErrors {
    name: string,
    errorType: ENClientServerErrors
}
export interface IManageServerErrorsRes {
    errorId: string,
    message: string,
    statusCode: number,
    username: string
}
export interface IManageServer {
    name: string;
    icon: string;
    background: string;
    color?: string;
    clickFunction?: ENManageServers;
}
export interface IOnOffLoadFlat {
    id: string,
    trackNumber: number,
    billId: string,
    radif: number,
    eshterak: string,
    qeraatCode: string,
    firstName: string,
    sureName: string,
    address: string,
    pelak: string,
    karbariCode: number,
    ahadMaskooniOrAsli: number,
    ahadTejariOrFari: number,
    ahadSaierOrAbBaha: number,
    qotrCode: number,
    sifoonQotrCode: number,
    fatherName: string,
    oldRadif: string,
    oldEshterak: string,
    postalCode: string,
    preNumber: number,
    preDate: string,
    preAverage: number,
    preCounterStateCode: number,
    counterSerial: string,
    counterInstallDate: string,
    tavizDate: string,
    tavizNumber: number,
    zarfiat: number,
    mobile: string,
    hazf: number,
    hasError: boolean,
    errorDescription: string,
    zoneId: number | string,
    counterNumber: number,
    counterStateId: number,
    counterStateCode: number,
    possibleAddress: string,
    possibleCounterSerial: string,
    possibleEshterak: string,
    possibleMobile: string,
    possiblePhoneNumber: string,
    possibleAhadMaskooniOrAsli: number,
    possibleAhadTejariOrFari: number,
    possibleAhadSaierOrAbBaha: number,
    possibleKarbariCode: number,
    offloadDateJalali: string,
    offLoadTime: string,
    y: string,
    x: string,
    d1: string,
    d2: string,
    counterStatePosition: number,
    attemptCount: number,
    isLocked: boolean,
    gisAccuracy: string,
    imageCount: number | boolean,
    masraf: number,
    eslahType: number,
    newRate: number,
    dateDifference: number,
    counterNumberShown: boolean,
    excludedForBazdid: boolean,
    masrafStateId: number,
    description: string,
    isSelected?: boolean
}
export interface IOutputManager {
    zoneId: number,
    fromDate: string,
    toDate: string
}