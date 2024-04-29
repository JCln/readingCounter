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

export interface ITariffAll {
    id: number,
    zoneId: number,
    zoneTitle: string,
    formula: string,
    usageId: number,
    usageTitle: string,
    fromDate: string,
    toDate: string,
    fromRate: number,
    toRate: number,
    offeringId: number,
    offeringTitle: string,
    calulcationOrder: number,
    tarrifTypeItemId: number,
    tarrifTypeItemTitle: string,
    isEditing?: boolean,
}
export interface ITariffAllLazy {
    data: ITariffAll[],
    totalRecords: number
}
export interface ITarrifTypeItem {
    id: number,
    tariffTypeId: number,
    tariffCalculationMode: number,
    dynamicTariffCalculationMode: number,
    dynamicTariffTypeId: number,
    title: string,
    description: string,
    isActive: boolean,
    isEditing?: boolean
}
export interface ITarrifParameter {
    id: number,
    tag: string
    title: string,
    isActive: boolean,
    isEditing?: boolean
}
export interface IOffering {
    id: number,
    title: string,
    offeringUnitId: number,
    dynamicId: any,
    description: string,
    isActive: boolean,
    isEditing?: boolean
    offeringUnit: {
        id: number,
        title: string,
        symbol: string,
        isActive: boolean
    }
}
export interface IOfferingUnit {
    id: number,
    title: string,
    symbol: string,
    isActive: boolean,
    isEditing?: boolean
}
export interface ITariff {
    id: number,
    formula: string,
    zoneId: number,
    usageId: number,
    fromDate: string,
    toDate: string,
    fromRate: number,
    toRate: number,
    offeringId: number,
    calulcationOrder: number,
    tarrifTypeItemId: number
}
export interface ITariffExcelToFillInput {
    fromDate: string,
    toDate: string,
    zoneIds: number[],
    usageIds: number[],
    offeringIds: number[],
    itemTypeIds: number[],
    rates: []
    // {
    //     fromRate: number,
    //     toRate: number
    // }
}