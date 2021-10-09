/* READING MANAGER */
export interface IKarbari {
    id: number,
    moshtarakinId: number,
    title: string,
    provinceId: number | string,
    isMaskooni: boolean,
    isTejari: boolean,
    isSaxt: boolean,
    hasReadingVibrate: boolean
}
export interface IQotr {

}
export interface IReadingConfigDefault {
    id: number,
    zoneId: number,
    defaultAlalHesab: number,
    maxAlalHesab: number,
    minAlalHesab: number,
    defaultImagePercent: number,
    maxImagePercent: number,
    minImagePercent: number,
    defaultHasPreNumber: boolean,
    isOnQeraatCode: boolean,
    displayBillId: boolean,
    displayRadif: boolean,
    lowConstBoundMaskooni: number,
    lowPercentBoundMaskooni: number,
    highConstBoundMaskooni: number,
    highPercentBoundMaskooni: number,
    lowConstBoundSaxt: number,
    lowPercentBoundSaxt: number,
    highConstBoundSaxt: number,
    highPercentBoundSaxt: number,
    lowConstZarfiatBound: number,
    lowPercentZarfiatBound: number,
    highConstZarfiatBound: number,
    highPercentZarfiatBound: number,
    lowPercentRateBoundNonMaskooni: number,
    highPercentRateBoundNonMaskooni: number
}
export interface IReadingPeriod {
    id: number,
    title: string,
    moshtarakinId: number,
    readingPeriodKindId: number | string,
    zoneId: number | string,
    clientOrder: number
}
export interface IReadingPeriodKind {
    id: number,
    title: string,
    moshtarakinId: number,
    clientOrder: number,
    isEnabled: boolean
}
export interface ICounterReport {
    id: number,
    moshtarakinId: number,
    title: string,
    zoneId: number | string,
    isAhad: boolean,
    isKarbari: boolean,
    canNumberBeLessThanPre: boolean,
    isTavizi: boolean,
    clientOrder: number
}

// ab baha formular manager
export interface IAbBahaFormula {
    id: string,
    zoneId: number | string,
    karbariMoshtarakinCode: number | string,
    fromDate: string,
    toDate: string,
    fromRate: number,
    toRate: number,
    abFormula: string,
    fazelabFormula: string,
    formula?: string
}
export interface ITabsare2Formula {
    id: string,
    zoneId: number | string,
    formula: string
}
// 

export interface IReadingPeriodKind {
    id: number,
    title: string,
    moshtarakinId: number,
    readingPeriodKindId: number,
    zoneId: number | string,
    clientOrder: number
}
export interface ICounterState {
    id?: number,
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
    isFaqed: boolean,
    isNew?: boolean
}
// export interface IGridFriendlyFilter {
//     field: string,
//     operator: string,
//     logic: string,
//     filter: [
//         IGridFriendlyFilter
//     ] | null
// }
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
        // field: string,
        // operator: string,
        logic: string,
        filters: any | null
    }
    ,
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
    counterReaderName: string,
    stateTitle?: string,
    hasMap: boolean
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
// Output manager
export interface IOutputManager {
    zoneId: number,
    fromDate: string,
    toDate: string
}
// 

// List Manager
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
    gisAccuracy: string,
    imageCount: number | boolean,
    masraf: number,
    eslahType: number,
    newRate: number,
    dateDifference: number,
    counterNumberShown: boolean,
    excludedForBazdid: boolean,
    masrafStateId: number,
    description: string
}
export interface IOffLoadPerDay {
    trackNumber: number,
    listNumber: string,
    counterReaders: string,
    fromEshterak: string,
    toEshterak: string,
    overalCount: number,
    readCount: number,
    maneCount: number,
    manePercent: number,
    hasPreNumber: boolean,
    displayBillId: boolean,
    displayRadif: boolean,
    isBazdid: boolean,
    isRoosta: boolean,
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

// 

// Forbidden Manager
export interface IForbiddenManager {
    gisAccuracy: string,
    id: string,
    imageCount: number
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
export interface IAnalyzeRes {
    zoneId: number,
    regionTitle: string,
    zoneTitle: string,
    caption: string,
    statusTitle: string,
    min: number,
    max: number,
    average: number,
    variance: number,
    standardDeviation: number,
    median: number,
    mode: number,
    duration: string,
    timeSpan: {
        ticks: number,
        days: number,
        hours: number,
        milliseconds: number,
        minutes: number,
        seconds: number,
        totalDays: number,
        totalHours: number,
        totalMilliseconds: number,
        totalMinutes: number,
        totalSeconds: number
    }
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
// export interface IForbiddenManagerGridFriendlyRes {
//     aggregates: null,
//     data: IForbiddenManager[],
//     errors: null,
//     groups: null,
//     total: number
// }
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
            hasDetails: boolean,
            hasMap: boolean
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

export interface IOnOffLoad {
    fileRepositoryId: string,
    targetId: string,
    name: string,
    extention: string,
    sizeInByte: number,
    contentType: string
}
export interface IOverAllWOUIInfo {
    sizeInKB: number,
    numbers: number,
    imageNumbers: number,
    audioNumbers: number
}
export interface IManageServer {
    name: string;
    icon: string;
    background: string;
    color?: string;
}

export interface ITextOutput {
    id?: any,
    zoneId: number | string,
    itemTitle: string,
    startIndex: any,
    endIndex: any,
    length: any,
    isNew: boolean
}
// reading report manager(reports)
export interface IReadingReportReq {
    zoneId?: number,
    fromDate: string,
    toDate: string,
    counterReaderId: string,
    readingPeriodId: number,
    reportCode: number,
    year: number
}
export interface IReadingReportGISReq {
    zoneId: number,
    isCounterState: boolean,
    counterStateId: number,
    isKarbariChange: boolean,
    isAhadChange: boolean,
    isForbidden: boolean,
    readingPeriodId: number,
    year: number,
    fromDate: string,
    toDate: string,
    isCluster: boolean
}
export interface IReadingReportGISResponse {
    x: string,
    y: string,
    gisAccuracy: string,
    info1: string,
    info2: string,
    info3: string
}
export interface IReadingReportMaster {
    zoneId: number,
    zoneTitle: string,
    reportId: number,
    reportTitle: string,
    itemCount: number
}
export interface IReadingReportDetails {
    billId: number,
    radif: number,
    eshterak: number,
    fulName: string,
    address: string,
    karbariCode: number,
    possibleKarbariCode: number,
    ahadMaskooniOrAsli: number,
    possibleAhadMaskooniOrAsli: number,
    ahadTejariOrFari: number,
    possibleAhadTejariOrFari: number,
    ahadSaierOrAbBaha: number,
    possibleSaierOrAbBaha: number,
    reportTitle: string,
    counterReaderName: string,
    offloadDateJalali: string,
    counterSerial: string,
    possibleCounterSerial: string
}
export interface IReadingReportTraverse {
    billId: string,
    radif: number,
    eshterak: string,
    fulName: string,
    address: string,
    karbariCode: number,
    possibleKarbariCode: number,
    ahadMaskooniOrAsli: number,
    possibleAhadMaskooniOrAsli: number,
    ahadTejariOrFari: number,
    possibleAhadTejariOrFari: number,
    ahadSaierOrAbBaha: number,
    possibleSaierOrAbBaha: number,
    counterReaderName: string,
    offloadDateJalali: string,
    counterSerial: string,
    possibleCounterSerial: string,
    possibleAddress: string,
    mobile: string,
    possibleMobile: string,
    possibleEmpty: number
}

export interface IReadingReportChartTraverseDifferential {
    inProvince: {
        ahadCount: number,
        karbariCount: number,
        mobileCount: number,
        counterSerialCount: number,
        emptyCount: number,
        areaTitle: string
    }
    inRegion: {
        ahadCount: number,
        karbariCount: number,
        mobileCount: number,
        counterSerialCount: number,
        emptyCount: number,
        areaTitle: string
    }
    inZone: {
        ahadCount: number,
        karbariCount: number,
        mobileCount: number,
        counterSerialCount: number,
        emptyCount: number,
        areaTitle: string
    }
}
export interface IReadingReportChartKarkard {
    inProvince: IReadingReportKarkard,
    inRegion: IReadingReportKarkard,
    inZone: IReadingReportKarkard
}
export interface IReadingReportChartReq {
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
export interface IReadingReportTraverseDifferentialRes {
    billId: string,
    radif: number,
    eshterak: string,
    fulName: string,
    address: string,
    offloadDateJalali: string,
    description: string,
    value: string,
    newValue: string
}
export interface IReadingReportTraverseDifferentialReq {
    zoneId: number,
    fromDate: string,
    toDate: string,
    readingPeriodId: number,
    year: number,
    traverseType: number,
    zoneIds: [
        number
    ]
}
export interface IRRChartResWrapper {
    dayJalali: string,
    fromEshterak: string,
    toEshterak: string,
    counterReaderName: string,
    overalCount: number,
    _8To10: number,
    _10To12: number,
    _12To14: number,
    _14To16: number,
    _16To18: number,
    saierCount: number,
    areaTitle?: string
}
// } should test bottom
export interface IReadingReportChartDisposeRes {
    inProvince: IRRChartResWrapper,
    inRegion: IRRChartResWrapper,
    inZone: IRRChartResWrapper
}
export interface IReadingReportKarkard {
    offloadDayalali: string,
    fromEshterak: string,
    toEshterak: string,
    counterReaderName: string,
    fromTime: string,
    toTime: string,
    duration: number,
    overalCount: number,
    adiCount: number,
    faqedCount: number,
    maneCount: number,
    xarabCount: number,
    tavizCount: number,
    saierCount: number,
    areaTitle?: string,
    zoneId: number,
    zoneTitle: string,
    trackNumber: number
}
// fragment manager 
export interface IFragmentMaster {
    id?: string,
    zoneId: number,
    zoneTempId?: number,
    routeTitle: string,
    fromEshterak: string,
    toEshterak: string,
    isValidated?: boolean,
    isNew?: boolean
}
export interface IFragmentDetails {
    id?: string,
    fragmentMasterId: string,
    routeTitle: string,
    fromEshterak: string,
    toEshterak: string,
    orderDigit?: number,
    orderPersian?: string,
    isNew?: boolean
    // for batch
    trackNumber?: number,
    count?: number,
    counterReaderName?: string
}
export interface IFragmentDetailsByEshterakReq {
    fromEshterak: string,
    toEshterak: string,
    zoneId: number
}
export interface IAssessPreDisplayDtoSimafa {
    reportIds: number[],
    counterStateIds: number[],
    masrafStates: number[],
    karbariCodes: number[],
    listNumber: string,
    zoneId: number
}
export interface IAssessAddDtoSimafa {
    onOffLoadIds: string[],
    alalHesabPercent: number,
    imagePercent: number,
    hasPreNumber: boolean,
    displayBillId: boolean,
    displayRadif: boolean,
    counterReaderId: string,
    trackNumber: number
}