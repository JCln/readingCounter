
export interface IAssessPreDisplayDtoSimafa {
    reportIds: number[],
    counterStateIds: number[],
    masrafStates: number[],
    karbariCodes: number[],
    listNumber: string,
    zoneId: number
}
export interface IAssessAddDtoSimafa {
    onOffLoadIds: string[],
    alalHesabPercent: number,
    imagePercent: number,
    hasPreNumber: boolean,
    displayBillId: boolean,
    displayRadif: boolean,
    counterReaderId: string,
    trackNumber: number
}