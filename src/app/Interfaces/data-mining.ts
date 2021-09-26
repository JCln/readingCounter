export interface IReadingTimeRes {
    counterReader: string,
    overalCount: number,
    maxBetweenTwoMinute: number,
    minBetweenTwoMinute: number,
    averageBetweenTwoMinute: number,
    countSameTime: number,
    closedCount: number,
    closedPercent: number
}
export enum ENDataMining {
    dataMining = 'dataMiningReq'
}
