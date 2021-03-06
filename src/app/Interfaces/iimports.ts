
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
    counterReaderId: string
}
export interface IReadingConfigDefault {
    id: number,
    zoneId: number,
    defaultAlalHesab: number,
    maxAlalHesab: number,
    minAlalHesab: number,
    defaultImagePercent: number,
    maxImagePercent: number,
    minImagePercent: number,
    defaultHasPreNumber: boolean,
    isOnQeraatCode: boolean,
    displayBillId: boolean,
    displayRadif: boolean,
    lowConstBoundMaskooni: number,
    lowPercentBoundMaskooni: number,
    highConstBoundMaskooni: number,
    highPercentBoundMaskooni: number,
    lowConstBoundSaxt: number,
    lowPercentBoundSaxt: number,
    highConstBoundSaxt: number,
    highPercentBoundSaxt: number,
    lowConstZarfiatBound: number,
    lowPercentZarfiatBound: number,
    highConstZarfiatBound: number,
    highPercentZarfiatBound: number,
    lowPercentRateBoundNonMaskooni: number,
    highPercentRateBoundNonMaskooni: number
}