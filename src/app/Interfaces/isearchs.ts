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
    hasDetails: boolean,
    listNumber?: string,
    trackNumber?: number
}
