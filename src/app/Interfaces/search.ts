export interface ISearchMoshReq {
    zoneId: number,
    searchBy: number,
    item: string,
    similar: boolean,
    showAll: boolean
}
export interface ISearchMoshReqDialog {
    zoneId: number,
    searchBy: number,
    item: number,
    similar: boolean
}
export interface ISearchSimpleReq {
    zoneId: number,
    fromDate: string,
    toDate: string,
    readingPeriodId: string,
    year: number,
    isCollapsed?: boolean
}
export interface ISearchSimpleOutput {
    trackingId: string,
    trackNumber: number,
    listNumber: string,
    insertDateJalali: string,
    zoneId: number,
    zoneTitle: string,
    isBazdid: boolean,
    isRoosta: boolean,
    fromEshterak: string,
    toEshterak: string,
    fromDate: string,
    toDate: string,
    overallQuantity: number,
    itemQuantity: number,
    counterReaderName: string,
    trackStatusTitle: string,
    hasMap: boolean
}
export interface ISearchProReportInput {
    zoneId: number,
    zoneIds: number[],
    fromDate: string,
    toDate: string,
    readingPeriodId: number,
    year: number,
    reportIds: number[],
    counterStateIds: number[],
    masrafStates: number[],
    karbariCodes: number[],
    fragmentMasterIds: string[],
    showAll: boolean,
    _selectedKindId: string,
    searchByText: string,
}
export enum ENSearchs {
    simple = '_searchSimpleReq'
}
