export interface ISidebarItems {
    items: [
        {
            title: string;
            cssClass: string;
            logicalOrder: number;
            route: string;
            isOpen: boolean;
            subItems?: [
                {
                    title: string;
                    isClosable: boolean;
                    isRefreshable: boolean;
                    route: string;
                    cssClass: string;
                    logicalOrder: number;
                }
            ]
        }
    ]
}
export interface ITabs {
    title: string;
    isClosable: boolean;
    isRefreshable: boolean;
    route: string;
    cssClass: string;
    logicalOrder: number;
}
export interface ITestSidebar {
    routerUrl: string;
    name: string;
    isClosable: boolean;
    isRefreshable: boolean;
    sid_isOpenItems: boolean;
}
export interface ISnackBar {
    message: string;
    duration: number;
    backColor?: string;
}
export enum ENSnackBarColors {
    warn = 'snack_warn',
    danger = 'snack_danger',
    success = 'snack_success',
}
export enum ENSnackBarTimes {
    threeMili = 3000,
    fourMili = 4000,
    fiveMili = 5000,
    sevenMili = 7000,
    tenMili = 10000
}
export enum ENStorageColumnKey {
    all_users_session = 'all_users_session'
}
export enum ENTrueFalse {
    true = 'true',
    false = 'false'
}
export enum ENTrackingRoute {
    migrateDataRowToImported,
    migrateDataRowToReading,
    migrateDataRowToOffloaded,
    migrateToPreState,
}
export enum ENTrackingMessage {
    toImported = 'علت بازگشت به صادر شده',
    toReading = 'علت بازگشت به درحال قرائت',
    toOffloaded = 'علت بازگشت به بارگذاری شده',
    toPrevious = 'علت بازگشت به مرحله قبلی'
}
export interface IResponses {
    isValid: boolean
    message: string;
    status: number
}
export interface ITrueFalseFilter {
    name: string;
    value: string | boolean;
}
export const TrueFalseFilter: ITrueFalseFilter[] = [
    { name: 'نباشد', value: false },
    { name: 'باشد', value: true },
    { name: 'هیچکدام', value: '' }
]

export interface IDictionaryManager {
    readonly id: number | string;
    title: string;
    isSelected: boolean;
}
export interface ITrueFalse {
    name: string;
    value: string | boolean;
}
export interface ISearchInOrderTo {
    title: string;
    isSelected: boolean;
}
export interface ITitleValue {
    title: string;
    value: number;
}
export interface IObjectIteratation {
    field: string;
    header: string;
    isSelected: boolean;
    ltr?: boolean;
    readonly?: boolean;
    borderize?: boolean;
    icon?: string;
    isBoolean?: boolean;
    isSelectOption?: boolean;
}
export interface ITabWrapperDetectDynamicRoute {
    _title: string,
    _dynamicRoute: string
}

export interface IActivatedProvinceConfig {
    headerProvinceTitle: ENActivateProvinceTitle,
    API_URL: string;
    OSMmapBoxUrl: string,
    SATELLITEMapBoxUrl: string,
    SATELLITEMapAccessToken: string
}
export interface IOffloadModifyType {
    id: number,
    modifyeType: ENOffloadModifyType
}
export enum ENSelectedColumnVariables {
    selectedTracks = 'menuDefault',
    selectedlastStates = 'lastStates',
    selectedUsersAll = '_usersAll',
    selectedListManagerAll = 'listManagerAll',
    selectedAuth2 = '_auth2',
    selectedAuth3 = '_auth3',
    selectedAuth4 = '_auth4',
    selectedRRAnalyzeByParam = '_RRAnalyzeByParam',
    selectedRRMaster = '_RRMaster',
    selectedRRDetails = '_RRDetails',
    selectedRRTraverse = '_RRTraverse',
    selectedRRTraverseDifferential = '_RRTraverseDifferential',
    selectedRRKarkard = '_RRKarkard',
    selectedRRKarkardDaily = '_RRKarkardDaily',
    selectedRRDisposalHours = '_RRDisposalHours',
    selectedAbFormulas = '_abFormulas',
    selectedBudgetFormulas = '_budgetFormulas',
    selectedTabsare2Formulas = '_tabsare2Formulas',
    selectedTabsare3Formulas = '_tabsare3Formulas',
    selectedCounterReport = '_counterReport',
    selectedReadingConfigDefault = '_readingConfigDefault',
    selectedReadingPeriod = '_readingPeriod',
    selectedReadingPeriodKind = '_readingPeriodKind',
    selectedTextOutput = '_textOutput',
    selectedKarbari = '_karbari',
}
export enum ENOffloadModifyType {
    callAnnounce = 'اعلام تلفنی',
    blueScreenLight = 'اشتباه در قرائت',
    intenseLight = 'نور صفحه آبی',
    longDistance = 'نور زیاد',
    counterStatesNotMatch = 'عکس از فاصله دور',
    wrongReading = 'عدم تطابق رقم فعلی با رقم کنتور',
    occasion = 'مناسب',
    inappropriate = 'نا مناسب',
    doorPicture = 'عکس درب',
    counterHumidity = 'رطوبت کنتور',
    others = 'سایر'
};
export enum ENActivateProvinceTitle {
    DEFAULT = '',
    ESF = 'اصفهان',
    TEH = 'تهران'
}
export enum ENSearch {
    eshterak = 'اشتراک',
    radif = 'ش پرونده',
    readCode = 'قرائت',
    billId = 'شناسه قبض',
}