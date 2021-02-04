export interface IReadingPeriodKindManage {
    id: number,
    title: string,
    moshtarakinId: number,
    readingPeriodKindId: number,
    zoneId: number | string,
    clientOrder: number
}
export interface ICounterState {
    id: number,
    moshtarakinId: number,
    title: string,
    zoneId: number,
    clientOrder: number,
    canEnterNumber: boolean,
    isMane: boolean,
    canNumberBeLessThanPre: boolean,
    isTavizi: boolean,
    shouldEnterNumber: boolean,
    isXarab: boolean,
    isFaqed: boolean
}
export interface ICounterStateGridFriendlyReq {
    take: number,
    skip: number,
    sort: [
        {
            field: string,
            dir: string
        }
    ],
    filter: {
        field: string,
        operator: string,
        logic: string,
        filters: [
            null
        ]
    },
    group: [
        {
            field: string,
            dir: string,
            aggregates: [
                {
                    field: string,
                    aggregate: string
                }
            ]
        }
    ],
    aggregate: [
        {
            field: string,
            aggregate: string
        }
    ]
}
export interface ICounterStateGridFriendlyResp {
    aggregates: null;
    data: ICounterState[];
    errors: null;
    groups: null;
    total: number;
}
export interface ITracking {
    id: string,
    trackNumber: number,
    listNumber: null,
    insertDateJalali: string,
    zoneId: number,
    zoneTitle: string,
    isBazdid: boolean,
    year: number,
    isRoosta: boolean,
    fromEshterak: string,
    toEshterak: string,
    fromDate: string,
    toDate: string,
    itemQuantity: number,
    alalHesabPercent: number,
    imagePercent: number,
    hasPreNumber: boolean,
    displayBillId: boolean,
    displayRadif: boolean,
    counterReaderId: string,
    counterReaderName: string
}
export interface IEditTracking {
    id: string,
    alalHesabPercent: number,
    imagePercent: number,
    hasPreNumber: boolean,
    displayBillId: boolean,
    displayRadif: boolean,
    counterReaderId: string;
}
// List Manager
export interface IListManagerAll {
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
    zoneId: number,
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
    gisAccuracy: string,
    imageCount: number,
    masraf: number,
    eslahType: number,
    newRate: number,
    dateDifference: number,
    counterNumberShown: boolean,
    excludedForBazdid: boolean,
    masrafStateId: number,
    description: string
}
export interface IListManagerPD {
    trackNumber: number,
    listNumber: string,
    counterReaders: string,
    fromEshterak: string,
    toEshterak: string,
    overalCount: number,
    readCount: number,
    overalDistance: number,
    overalDuration: number,
    offLoadPerDayHistory: [
        {
            day: string,
            fromEshterak: string,
            toEshterak: string,
            readCount: number,
            maneCount: number,
            manePercent: number,
            xarabFaqedCount: number,
            xarabFaqedPercent: number,
            fromTime: string,
            toTime: string,
            duration: number,
            distance: number
        }
    ]
}
export interface IListManagerPDHistory {
    day: string,
    fromEshterak: string,
    toEshterak: string,
    readCount: number,
    maneCount: number,
    manePercent: number,
    xarabFaqedCount: number,
    xarabFaqedPercent: number,
    fromTime: string,
    toTime: string,
    duration: number,
    distance: number
}
export interface IListManagerPDXY {
    x: string,
    y: string,
    gisAccuracy: string,
    firstName: string,
    sureName: string,
    time: string,
    day: string,
    eshterak: string,
    radif: number,
    counterStateId: number,
    counterStateTitle: string,
    hasAlert: boolean
}
export interface IFollowUp {
    trackNumber: number,
    listNumber: string,
    zoneTitle: string,
    isBazdid: boolean,
    isRoosta: boolean,
    fromEshterak: string,
    toEshterak: string,
    fromDate: string,
    toDate: string,
    overallQuantity: number,
    itemQuantity: number,
    readingPeriodTitle: string,
    year: number,
    changeHistory: [
        {
            id: string,
            insertDateJalali: string,
            inserterCode: number,
            userDisplayName: string,
            seen: boolean,
            counterReaderName: string,
            trackStatusTitle: string,
            hasDetails: boolean
        }
    ]
}
export interface IFollowUpHistory {
    id: string,
    insertDateJalali: string,
    inserterCode: number,
    userDisplayName: string,
    seen: boolean,
    counterReaderName: string,
    trackStatusTitle: string,
    hasDetails: boolean
}