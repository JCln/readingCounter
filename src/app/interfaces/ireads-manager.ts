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
// export interface IQotr {

// }
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
    clientOrder: number,
    hasImage: boolean
}

// fragment manager 
export interface IFragmentDetailsByEshterakReq {
    fromEshterak: string,
    toEshterak: string,
    zoneId: number
}
export interface IAutomaticImportAddEdit {
    id?: string,
    fragmentMasterId: string,
    readingPeriodKindId: number,
    startDay: string,
    endDay: string,
    startTime: string,
    counterReaderId: string,
    alalHesabPercent: number,
    imagePercent: number,
    hasPreNumber: boolean,
    displayBillId: boolean,
    displayRadif: boolean,
    displayPreDate
displayMobile
hasImage
}
export interface IAutomaticImport {
    id: string,
    fragmentMasterId: string,
    readingPeriodId: number,
    jobDescription: string,
    dueDateTime: string,
    dueJalaliDay: string,
    dueTime: string,
    delayedJobId: string,
    executionCount: number,
    executionResult: string,
    successExecution: boolean,
    isActive: boolean,
    createDateTime: string
}
export interface IFragmentMaster {
    id?: string,
    zoneId: any,
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
export interface IImageAttribution {
    id?: number,
    title: string,
    isNew?: boolean
}
export interface IGuild {
    id: number,
    title: string,
    moshtarakinId: number,
    isActive?: boolean,
    isNew?: boolean
}
export interface IDynamicTraverse {
    id: number,
    title: string,
    storageTitle: string,
    isChangeable: boolean,
    defaultValue: boolean,
    isActive?: boolean,
    isNew?: boolean
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
    hasImage: boolean,
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
export interface IReadingPeriodKind {
    id: number,
    title: string,
    moshtarakinId: number,
    readingPeriodKindId: number,
    zoneId: number | string,
    clientOrder: number,
    days: number
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
export interface ITextOutput {
    id?: any,
    columnId?: number,
    zoneId: number | string,
    itemTitle: string,
    startIndex: any,
    endIndex: any,
    length: any,
    isNew?: boolean
}