export interface IAnalyzeRes {
    zoneId: number,
    regionTitle: string,
    zoneTitle: string,
    caption: string,
    statusTitle: string,
    min: number,
    max: number,
    average: number,
    variance: number,
    standardDeviation: number,
    median: number,
    mode: number,
    duration: string,
    timeSpan: {
        ticks: number,
        days: number,
        hours: number,
        milliseconds: number,
        minutes: number,
        seconds: number,
        totalDays: number,
        totalHours: number,
        totalMilliseconds: number,
        totalMinutes: number,
        totalSeconds: number
    }
}
export interface IDashboardUsersInfo {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}
export interface IDashboardKarkardTimed {
    adiCount: number,
    faqedCount: number,
    maneCount: number,
    xarabCount: number,
    tavizCount: number,
    saierCount: number,
    caption: string
}
export interface IDashboardUnReadCount {
    value: number,
    title: string,
    order: number
}
export interface IDashboardMoshtarakCount {
    value: number,
    title: string,
    order: number
}
export interface IDashboardEditCountConfig {
    unEditCount: number,
    editedCount: number,
    ratio: number
}
export interface IDashboardEditCount {
    daily: IDashboardEditCountConfig,
    weekly: IDashboardEditCountConfig,
    monthly: IDashboardEditCountConfig,
    yearly: IDashboardEditCountConfig,
}
export interface IDashboardDateDifferenceConfig {
    count: number,
    median: number,
    average: number,
    standardDeviation: number,
    variance: number,
    mode: number
}
export interface IDashboardDateDifference {
    yesterday: IDashboardDateDifferenceConfig,
    weekly: IDashboardDateDifferenceConfig,
    monthly: IDashboardDateDifferenceConfig,
    annualy: IDashboardDateDifferenceConfig,
}
export interface IDashboardTimed {
    inDayCount: number,
    inWeekCount: number,
    inMonthCount: number,
    inYearCount: number
}
export interface IDashboardReadDaily {
    count: number,
    period: string,
    hint: string
}
export interface IDashboardTraverseTimed {
    ahad: IDashboardTimed,
    karbari: IDashboardTimed,
    mobile: IDashboardTimed,
    counterSerial: IDashboardTimed,
    empty: IDashboardTimed,
}
export interface IDashboardTimedItem {
    _8_10: number,
    _8_10Closed: number,
    _8_10Rate: number,
    _10_12: number,
    _10_12Closed: number,
    _10_12Rate: number,
    _12_14: number,
    _12_14Closed: number,
    _12_14Rate: number,
    _14_16: number,
    _14_16Closed: number,
    _14_16Rate: number,
    _16_18: number,
    _16_18Closed: number,
    _16_18Rate: number,
    other: number,
    otherClosed: number,
    otherRate: number,
    title: string
}
export interface IDashboardSpecial {
    daily: IDashboardTimedItem,
    weekly: IDashboardTimedItem,
    monthly: IDashboardTimedItem,
    yearly: IDashboardTimedItem
}