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
export interface IFileExcelReq {
    zoneId: number,
    year: number,
    alalHesabPercent: number,
    imagePercent: number,
    hasPreNumber: boolean,
    displayBillId: boolean,
    displayRadif: boolean,
    counterReaderId: string;
    readingPeriodId: string;
    listNumber: string;
    skipErrors: boolean;
    description: string;
    file: any
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
    readingPeriodId?: number,
    canContinue?: boolean,
    fromEshterak?: string,
    id?: string,
    listNumber?: string,
    toEshterak?: string,
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
    zoneId: number,
    kindId?: string
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
