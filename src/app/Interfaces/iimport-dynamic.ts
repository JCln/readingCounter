export interface IImportDynamicDefault {
    fromEshterak: string,
    toEshterak: string,
    zoneId: number,
    alalHesabPercent: number,
    imagePercent: number,
    hasPreNumber: boolean,
    displayBillId: boolean,
    displayRadif: boolean,
    fromDate: string,
    toDate: string,
    counterReaderId: string,
    readingPeriodId: number
}
export interface IImportDynamic {
    fromEshterak: string,
    toEshterak: string,
    zoneId: number,
    alalHesabPercent: number,
    imagePercent: number,
    hasPreNumber: boolean,
    displayBillId: boolean,
    displayRadif: boolean,
    fromDate: string,
    toDate: string,
    counterReaderId: string,
    kindId?: number,
    period?: number
}
