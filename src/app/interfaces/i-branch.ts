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
export interface IFlowState {
    id: number,
    title: string,
    isInternal: boolean,
    order: number,
    canGoPrevious: boolean,
    flowsAutomaticly: boolean,
    css: string,
    hasDetails: boolean,
    bpmsStateId: string,
    changableFlowActivityId?: any,
    flowActivityId: number,
    isEditing: boolean
}
export interface IFlowRule {
    id: number,
    fromFlowStateId: number,
    toFlowStateId: number,
    condition: string,
    offeringGroupId: any,
    isStart: boolean,
    isEnd: boolean,
    changableOfferingGroupId: any,
    changableFromFlow?: any,
    changableToFlow?: any,
    isEditing: boolean
}
export interface ISiphon {
    id: number,
    title: string,
    isActive: boolean,
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
    siphonId: number,
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
export interface IRequestDraft {
    id?: number,
    requestDraftId?: number,
    provinceId: null,
    regionId: null,
    zoneId: number,
    villageId: number,
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
    siphonId: number,
    branchDiameterId: number,
    siphon1Count: number,
    siphon2Count: number,
    siphon3Count: number,
    siphon4Count: number,
    commercialConstructionArea: number,
    domesticConstructionArea: number,
    otherConstructionArea: number,
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
    offeringIds: any,
    offeringGroupIds: any
}
export interface IBank {
    id: number,
    code: number,
    title: string,
    css: string,
    isEditing: boolean
}
export interface ITag {
    id: number,
    title: string,
    titleEn: string,
    isActive: boolean,
    isEditing: boolean
}
export interface IZoneConstants {
    id: number,
    value: string,
    zoneId: number,
    zoneTitle: string,
    changableZoneId?: any,
    title: string,
    tag: string,
    isEditing: boolean
}
export interface IAmountModifications {
    offeringId: number,
    amount: number
}
export interface ICalculationSchedulePaymentInput {
    installmentNumber: number,
    inAdvancedPaymentPercentage: number
}
export interface ICalculationInstallment {
    requestDraftId: number,
    invoiceId: number,
    schedulePaymentInput: ICalculationSchedulePaymentInput;
}
export interface IModification {
    offeringGroupIds: any[],
    schedulePaymentInput: ICalculationSchedulePaymentInput,
    requestDraftId: number,
    invoiceId: number,
    amountModifications: IAmountModifications[]
}
export interface ITariffType {
    id: number,
    title: string,
    isPositive: boolean,
    isEditing: boolean
}
export interface IScheduledPaymentMethod {
    id: number,
    title: string,
    isInstallment: boolean,
    isActive: boolean,
    isEditing: boolean
}
export interface IVillage {
    id: number,
    title: string,
    zoneId: number,
    changableZoneId?: any,
    isMetro: boolean,
    logicalOrder: number,
    isEditing: boolean
}
export interface ICalculationRequestDraft {
    requestDraftId: number,
    offeringGroupIds: number[]
}
export interface IRequestDraftCalculationRes {
    value: number,
    offeringTitle: string,
    typeTitle: string
}
export interface IRequestDraftLazy {
    data: IRequestDraft[],
    totalRecords: number
}
export interface ICounterNumberChangeAll {
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
    siphonId: number,
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
export interface ICounterNumberChangeGetAllLazy {
    data: ICounterNumberChangeAll[],
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
    offeringGroupId: number,
    dynamicId: any,
    dynamicGroupId: any,
    description: string,
    isActive: boolean,
    isEditing?: boolean
    offeringUnit: {
        id: number,
        title: string,
        symbol: string,
        isActive: boolean
    },
    offeringGroup: {
        id: number,
        title: string,
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
export interface IOfferingGroup {
    id: number,
    title: string,
    isActive: boolean,
    isEditing?: boolean
}
export interface IInvoiceType {
    id: number,
    title: string,
    description: string,
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
    siphonIds: number[],
    diameterIds: number[],
    offeringIds: number[],
    itemTypeIds: number[],
    rates: []
    // {
    //     fromRate: number,
    //     toRate: number
    // }
}