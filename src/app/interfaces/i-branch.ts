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
    nationalId: string,
    postalCode: string,
    mobiles: string,
    customerNumber: number,
    readingNumber: string,
    billId: string,
    fullName: string,
    fatherName: string,
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
    otherArea: number,
    capacity: number | null,
    watarInstallationJalaliDay: string,
    sewageInstallationJalaliDay: string,
    guildId: number | null,
    ownershipTypeId: number,
    branchStateId: number,
    waterSourceId: number | null,
    customerTypeId: number,
    previousClientId: number | null,
    description: string,
    isLast: boolean,
    x: string,
    y: string,
    guildTitle: string,
    branchStateTitle: string,
    ownershipTypeTitle: string,
    customerTypeTitle: string,
    waterSourceTitle: string,
}