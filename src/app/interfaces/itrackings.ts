export interface ITracking {
    id: string,
    groupId: string,
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
    insertTime: string,
    itemQuantity: number,
    alalHesabPercent: number,
    imagePercent: number,
    hasPreNumber: boolean,
    displayBillId: boolean,
    displayRadif: boolean,
    counterReaderId: string,
    counterReaderName: string,
    stateTitle?: string,
    fragmentMasterTitle: string,
    fragmentDetailTitle: string,
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
export interface IOffLoadPerDay {
    trackNumber: number,
    zoneTitle?: string,
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
