import { IDictionaryManager } from './ioverall-config';

export interface IForbiddenManager {
    gisAccuracy: string,
    description: string,
    id: string,
    displayName: string,
    imageCount: number,
    insertDateJalali: string,
    insertDateTime: string,
    insertTime: string,
    nextEshterak: string,
    postalCode: string,
    preEshterak: string,
    tedadVahed: number,
    userId: string,
    x: string,
    y: string,
    zoneId: string,
    changableZoneId: any,
    activate: boolean,
    type: string,
}
export interface IMostReportInput {
    zoneId: number,
    fromDate: string,
    toDate: string,
    counterReaderId: string,
    readingPeriodId: number,
    year: number,
    _selectedKindId?: string,
    reportCode: number,
    zoneIds: number[],
    beginFromImported?: boolean,
    fragmentMasterIds?: string[],
    isCollapsed?: boolean
}
export interface IBriefKardex {
    item: string,
    registerDate: string,
    preDate: string,
    currentDate: string,
    preNumber: number,
    currentNumber: number,
    preDebt: number,
    displayIcons: number,
    amount: number,
    counterStateTitle: string,
    duration: string,
    consumption: number,
    dailyAverage: number
}
export interface IListLatestInfoReq {
    searchBy: number,
    item: string
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
    preCounterStateTitle: string,
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
    counterStateId: any,
    counterStateTitle: string,
    tempCounterState: IDictionaryManager;
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
    newRateDaily: number,
    newRateDaily2: number,
    reteDifference: number,
    dateDifference: number,
    counterNumberShown: boolean,
    excludedForBazdid: boolean,
    masrafStateId: number,
    description: string,
    isSelected?: boolean,
    zoneTitle?: string,
    readingReportTitles: string,
    mobiles: string,
    balance: number,
    locationDateTime: string,
    phoneDateTime: string,
    modifyType?: any//for general list modify
    modify?: any//for general group list modify,
    isResponseHasError?: boolean// to make alert in the table
    editedErrorDescription?: string// to make alert in the table
    fileRepositoryId?: string // on single image like SinglePanel API
    highLowStateId?: number
}
export interface IOnOffLoadFlatLazy {
    data: IOnOffLoadFlat[],
    totalRecords: number
}
export interface IOutputManager {
    zoneId: number,
    fromDate: string,
    toDate: string
}
export interface IInactiveEntity {
    id: number,
    insertDateTime: string,
    insertDateJalali: string,
    insertTime: string,
    ip: string,
    entityTitle: string,
    operationTitle: string,
    userInfo: string,
    browserInfo: string,
    osInfo: string
}
export interface IInactiveEntityLazy {
    data: IInactiveEntity[],
    totalRecords: number
}