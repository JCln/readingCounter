export interface IReadingPeriodKindManage {
    id: number,
    title: string,
    moshtarakinId: number,
    readingPeriodKindId: number,
    zoneId: number | string,
    clientOrder: number
}
export interface ICounterState {
    id: number,
    moshtarakinId: number,
    title: string,
    zoneId: number,
    clientOrder: number,
    canEnterNumber: boolean,
    isMane: boolean,
    canNumberBeLessThanPre: boolean,
    isTavizi: boolean,
    shouldEnterNumber: boolean,
    isXarab: boolean,
    isFaqed: boolean
}
export interface ICounterStateGridFriendly {
    take: number,
    skip: number,
    sort: [
        {
            field: string,
            dir: string
        }
    ],
    filter: {
        field: string,
        operator: string,
        logic: string,
        filters: [
            null
        ]
    },
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
