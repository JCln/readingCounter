/* READING MANAGER */
export interface IKarbari {
    id: number,
    moshtarakinId: number,
    title: string,
    provinceId: number | string,
    isMaskooni: boolean,
    isTejari: boolean,
    isInGuilds: boolean,
    isSaxt: boolean,
    hasReadingVibrate: boolean,
    dynamicID: any
}
export interface IQotr {
    id: number,
    title: string,
    provinceId: any
}

export interface IUploadForm {
    file: any,
    description: string,
    onOffLoadId: string,
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
    dynamicZoneId: any,
    isAhad: boolean,
    isKarbari: boolean,
    canNumberBeLessThanPre: boolean,
    isTavizi: boolean,
    clientOrder: number,
    hasImage: boolean,
    displayIcons: boolean,
    displayDebt: boolean
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
    displayPreDate: boolean,
    displayMobile: boolean,
    hasImage: boolean,
    displayDebt: boolean,
    displayIcons: boolean
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
    changableZoneId?: string, // temp zone for converting dictionaies
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
    trackNumber?: number,
    count?: number,
    counterReaderName?: string,
    isEditing?: boolean
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
    zoneId: any,
    changableZoneId: string, // temp zone for converting dictionaies
    clientOrder: number,
    canEnterNumber: boolean,
    isMane: boolean,
    canNumberBeLessThanPre: boolean,
    isTavizi: boolean,
    hasImage: boolean,
    displayDebt: boolean,
    displayIcons: boolean,
    shouldEnterNumber: boolean,
    isXarab: boolean,
    isFaqed: boolean,
    isNew?: boolean,
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
    id: number,
    columnId?: number,
    zoneId: number,
    dynamicId: any,
    itemTitle: string,
    startIndex: any,
    endIndex: any,
    length: any,
    isNew?: boolean,
    isEditing?: boolean
}