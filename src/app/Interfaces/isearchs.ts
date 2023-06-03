export interface IFollowUp {
    trackNumber: number,
    listNumber: string,
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
    readingPeriodTitle: string,
    year: number,
    alalHesabPercent: number,
    imagePercent: number,
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
    hasDetails: boolean,
    zoneTitle?: string,
    zoneId?: number,
    listNumber?: string,
    trackNumber?: number,
}
