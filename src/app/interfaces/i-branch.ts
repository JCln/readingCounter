export interface IBranchState {
    id: number,
    title: string,
    isActive: boolean,
    isNew?: boolean
}
export interface ICustomerType {
    id: number,
    title: string,
    isActive: boolean,
    isNew?: boolean
}
export interface IWaterSource {
    id: number,
    title: string,
    isActive: boolean,
    isNew?: boolean
}
export interface IOwnershipType {
    id: number,
    title: string,
    isActive: boolean,
    isNew?: boolean
}
export interface IClientAll {
    id?: number,
    zoneId: number,
    nationalId: string | null,
    postalCode: string | null,
    mobiles: string,
    customerNumber: number | null,
    readingNumber: string | null,
    billId: string | null,
    fullName: string | null,
    fatherName: string | null,
    address: string,
    usageId: number,
    branchDiameterId: number,
    siphon1Count: number,
    siphon2Count: number,
    siphon3Count: number,
    siphon4Count: number,
    domesticCount: number,
    commercialCount: number,
    otherCount: number,
    familyCount: number,
    domesticArea: number,
    commercialArea: number,
    otherArea: number | null,
    capacity: number | null,
    watarInstallationJalaliDay: string | null,
    waterInstallationDateTime: string | null,
    sewageInstallationJalaliDay: string | null,
    sewageInstallationDateTime: string | null,
    guildId: number,
    ownershipTypeId: number,
    branchStateId: number | null,
    waterSourceId: number,
    customerTypeId: number | null,
    previousClientId: number,
    changeOrInsertLogId: string | null,
    description: string,
    isLast: boolean,
    fromDateTime: string | null,
    toDateTime: string | null,
    x: string | null,
    y: string,
    zoneTitle: {},
    usageTitle: {},
    branchDiameterTitle: {} | null,
    guildTitle: string | null,
    branchStateTitle: string | null,
    ownershipTypeTitle: string | null,
    customerTypeTitle: string | null,
    waterSourceTitle: string
}