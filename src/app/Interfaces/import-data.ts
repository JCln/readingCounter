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
    readingPeriodId: number,
    kindId?: number,
    period?: number
}
export interface IBatchImportDataResponse {
    trackNumber: number,
    count: number,
    errorCount: number,
    counterReaderName: string,
    fragmentDetailId: string,
    listNumber: string
}
export interface IImportDataResponse {
    trackNumber: number,
    count: number,
    errorCount: number,
    counterReaderName: string,
    warningCount: number
}
export interface IImportSimafaBatchReq {
    routeAndReaderIds: [
        {
            routeId: string,
            counterReaderId: string | number
        }
    ],
    readingProgramId: string,
    fragmentMasterId: string,
    zoneId: number,
    alalHesabPercent: number,
    imagePercent: number,
    hasPreNumber: boolean,
    displayBillId: boolean,
    displayRadif: boolean,
    year: number,
    readingPeriodId: number
}
export interface IImportSimafaSingleReq {
    counterReaderId: string,
    readingProgramId: string,
    zoneId: number,
    alalHesabPercent: number,
    imagePercent: number,
    hasPreNumber: boolean,
    displayBillId: boolean,
    displayRadif: boolean,
    year: number,
    readingPeriodId: number
}
export interface IImportSimafaReadingProgramsReq {
    readingPeriodId: number,
    year: number,
    zoneId: number
}
export interface IImportErrors {
    eshterak: string,
    qeraatCode: string,
    billId: string,
    radif: number,
    errorDescriptoin: string,
    hasError: true,
    warningCount: number
}
export interface IReadingProgramRes {
    id: string,
    zoneId: number,
    fromEshterak: string,
    toEshterak: string,
    listNumber: string,
    year: number,
    readingPeriodId: number,
    canContinue: boolean
}
export enum ENImportDatas {
    importDynamic = 'importDynamicReq'
}
