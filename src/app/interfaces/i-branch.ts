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
    usageTitle: string,
    guildTitle: string,
    branchStateTitle: string,
    ownershipTypeTitle: string,
    customerTypeTitle: string,
    waterSourceTitle: string,
    zoneTitle: string,
}
export interface IClientGetAllLazy {
    data: IClientAll[],
    totalRecords: number
}
export interface ITarrifTypeItem {
    id: number,
    tariffTypeId: number,
    tariffCalculationMode: number,
    title: string,
    description: string,
    isActive: boolean
}
export interface ITarrifParameter {
    id: number,
    tag: string
    title: string,
    isActive: boolean
}
export interface IOffering {
    id: number,
    title: string,
    offeringUnitId: number,
    changableOfferingUnitId: any,
    description: string,
    isActive: true,
    offeringUnit: {
        id: number,
        title: string,
        symbol: string,
        isActive: true
    }
}
export interface IOfferingUnit {
    id: number,
    title: string,
    symbol: string,
    isActive: boolean
}