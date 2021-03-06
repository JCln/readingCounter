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
export interface ISidebarVals {
    readonly id: number,
    req?: ENEssentialsToSave;
    value: ENEssentialsToSave;
    value_2?: ENEssentialsToSave;
    readonly url: string
}
export interface ITabs {
    title: string;
    isClosable: boolean;
    isRefreshable: boolean;
    route: string;
    cssClass: string;
    logicalOrder: number;
}
export enum ENEssentialsToSave {
    saveDataForDynamicReports = 'saveDataForDynamicReports',
    saveDataForToolsExcelViewer = 'saveDataForToolsExcelViewer',
    saveDataForKarbari = 'saveDataForKarbari',
    saveDataForImageAttribution = 'saveDataForImageAttribution',
    saveDataForImageAttrResult = 'saveDataForImageAttrResult',
    saveDataForImageAttrAnalyze = 'saveDataForImageAttrAnalyze',
    saveDataForCounterState = 'saveDataForCounterState',
    saveDataForQotrManager = 'saveDataForQotrManager',
    saveDataForCounterReport = 'saveDataForCounterReport',
    saveDataForFragmentNOB = 'saveDataForFragmentNOB',
    saveDataForAutomaticImport = 'saveDataForAutomaticImport',
    saveDataForTextOutput = 'saveDataForTextOutput',
    saveDataForAPKManager = 'saveDataForAPKManager',
    saveDataForReadingConfig = 'saveDataForReadingConfig',
    saveDataForReadingPeriodKindManager = 'saveDataForReadingPeriodKindManager',
    saveDataForWaterFormula = 'saveDataForWaterFormula',
    saveDataForBadgetFormula = 'saveDataForBadgetFormula',
    saveDataForTabsare2Formula = 'saveDataForTabsare2Formula',
    saveDataForTabsare3Formula = 'saveDataForTabsare3Formula',
    saveDataForAppLevel1 = 'saveDataForAppLevel1',
    saveDataForAppLevel2 = 'saveDataForAppLevel2',
    saveDataForAppLevel3 = 'saveDataForAppLevel3',
    saveDataForAppLevel4 = 'saveDataForAppLevel4',
    saveDataForAllUsers = 'saveDataForAllUsers',
    saveDataForAddUsers = 'saveDataForAddUsers',
    saveDataForRoleManager = 'saveDataForRoleManager',
    saveDataForEditOnRole = 'saveDataForEditOnRole',
    saveDataForCountry = 'saveDataForCountry',
    saveDataForProvince = 'saveDataForProvince',
    saveDataForRegion = 'saveDataForRegion',
    saveDataForZone = 'saveDataForZone',
    saveDataForZoneBound = 'saveDataForZoneBound',
    saveDataForImportDynamic = 'saveDataForImportDynamic',
    saveDataForImportErrors = 'saveDataForImportErrors',
    saveDataForAssessPre = 'saveDataForAssessPre',
    saveDataForAssessPreReq = 'saveDataForAssessPre',
    saveDataForAssessAdd = 'saveDataForAssessAdd',
    saveDataForSimafaReadingPrograms = 'saveDataForSimafaReadingPrograms',
    saveDataForSimafaBatch = 'saveDataForSimafaBatch',
    saveDataForPolicies = 'saveDataForPolicies',
    saveDataForProfile = 'saveDataForProfile',
    saveDataForTrackImported = 'saveDataForTrackImported',
    saveDataForTrackLoaded = 'saveDataForTrackLoaded',
    saveDataForTrackReading = 'saveDataForTrackReading',
    saveDataForLastStates = 'saveDataForLastStates',
    saveDataForTrackOffloaded = 'saveDataForTrackOffloaded',
    saveDataForTrackFinished = 'saveDataForTrackFinished',
    saveDataForFollowUp = 'saveDataForFollowUp',
    saveDataForFollowUpAUX = 'saveDataForFollowUpAUX',
    rSearchMoshtarakinReq = 'rSearchMoshtarakinReq',
    saveDataForSearchMoshtarakin = 'saveDataForSearchMoshtarakin',
    saveDataForSearchProReq = 'saveDataForSearchProReq',
    saveDataForSearchPro = 'saveDataForSearchPro',
    saveDataForSearchSimple = 'saveDataForSearchSimple',
    saveDataForUserSearch = 'saveDataForUserSearch',
    saveDataForUserSearchRes = 'saveDataForUserSearchRes',
    saveDataForFNB = 'saveDataForFNB',
    saveDataForLMPD = 'saveDataForLMPD',
    saveDataForOutputDBF = 'saveDataForOutputDBF',
    saveDataForRRTraverse = 'saveDataForRRTraverse',
    saveDataForRRTraverseDifferential = 'saveDataForRRTraverseDifferential',
    saveDataForRRDisposalHours = 'saveDataForRRDisposalHours',
    saveDataForRRKarkard = 'saveDataForRRKarkard',
    saveDataForRRPreNumShown = 'saveDataForRRPreNumShown',
    saveDataForRRLocked = 'saveDataForRRLocked',
    saveDataForRROffloadedKarkard = 'saveDataForRROffloadedKarkard',
    saveDataForRRMaster = 'saveDataForRRMaster',
    saveDataForRRPerformance = 'saveDataForRRPerformance',
    saveDataForDMAAnalyze = 'saveDataForDMAAnalyze',
    saveDataForRRDetails = 'saveDataForRRDetails',
    saveDataForRRkarkardDaily = 'saveDataForRRkarkardDaily',
    saveDataForRRGIS = 'saveDataForRRGIS',
    saveDataForLMGeneralModify = 'saveDataForLMGeneralModify',
    saveDataForLMGeneralModifyReq = 'saveDataForLMGeneralModifyReq',
    saveDataForOffloadModify = 'saveDataForOffloadModify',
    saveDataForLMModifyReq = 'saveDataForLMModifyReq',
    saveDataForLMModify = 'saveDataForLMModify',
    saveDataForLMAll = 'saveDataForLMAll',
    saveDataForLMAllReq = 'saveDataForLMAllReq',
    saveDataForLMAll_extra = 'saveDataForLMAll_extra',
    saveDataForEditUsers = 'saveDataForEditUsers',
    saveDataForWOUI = 'saveDataForWOUI',
    saveDataForUserLoggins = 'saveDataForUserLoggins',
    saveDataForFragmentNOBDetails = 'saveDataForFragmentNOBDetails',
    saveDataForRRGallery = 'saveDataForRRGallery',
    saveDataForRRGalleryReq = 'saveDataForRRGalleryReq',
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
    duration: ENSnackBarTimes;
    backColor?: ENSnackBarColors;
}
export interface ISnackBarSignal {
    message: string;
    duration: ENSnackBarTimes;
    backColor?: ENSnackBarColors;
}

export enum ENHubMessages {
    Disconnected = '?????????? ???? ???????????? ???????????? ?????? ???????????????',
    Connecting = '?????????? ?????????? ???? ???????????? ????????????',
    Disconnecting = '?????????? ?????? ???????????? ???? ???????????? ????????????',
    Reconnecting = '?????????? ?????????? ???? ???????????? ????????????',
    Connected = '???????? ???? ???????????? ????????????'
}
export enum ENColorText {
    blue = '??????',
    green = '??????',
    orange = '????????????',
    red = '????????',
}
export enum ENSnackBarColors {
    warn = 'snack_warn',
    danger = 'snack_danger',
    success = 'snack_success',
    info = 'snack_info',
}
export enum ENSnackBarColorsExact {
    warn = 'rgb(246, 128, 56)',
    danger = ' rgb(183, 28, 28)',
    success = 'rgb(75, 140, 56)',
    info = 'rgb(17, 111, 255)',
}
export enum ENSnackBarTimes {
    threeMili = 3000,
    fourMili = 4000,
    fiveMili = 5000,
    sevenMili = 7000,
    tenMili = 10000,
    fifteenMili = 15000,
    twentyMili = 20000,
    thirdyMili = 30000,
    fiftyMili = 50000
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
export interface IResponses {
    isValid: boolean;
    message: string;
    status: number;
}
export interface ITrueFalseFilter {
    name: string;
    value: string | boolean;
}
export const TrueFalseFilter: ITrueFalseFilter[] = [
    { name: '??????????', value: false },
    { name: '????????', value: true },
    { name: '??????????????', value: '' }
]
export enum ENBrowserStatus {
    good = 200,
    warn = 400,
    alarm = 500
}
export const ENBrowserInfo = {
    Chrome: { title: 'Google Chrome', url: 'https://browser-update.org/fa/update-browser.html' },
    FireFox: { title: 'Mozilla FireFox', url: 'https://browser-update.org/fa/update-browser.html' },
    Opera: { title: 'Opera', url: 'https://browser-update.org/fa/update-browser.html' },
    Safari: { title: 'Safari', url: 'https://browser-update.org/fa/update-browser.html' },
    IE: { title: 'IE', url: 'https://browser-update.org/fa/update-browser.html' },
}
export interface IBrowserNotif {
    message: string;
    backgroundColor: string;
    isClosable: boolean;
    isShow: boolean;
}
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
export interface ITHV {
    title: string,
    header: string,
    value: number
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
    isNumber?: boolean;
    isSelectOption?: boolean;
}
export interface ITabWrapperDetectDynamicRoute {
    _title: string,
    _dynamicRoute: string
}
export interface IOffloadModifyType {
    id: number,
    modifyeType: ENOffloadModifyType
}
export enum ENHasImportDynamicCount {
    hasCount = 'true',
    hasNotCount = 'false'
}
export enum ENLocalStorageNames {
    hasDynamicCount = 'hasDynamicCount',
    mapAnimationStartFrom = 'mapAnimationStartFrom',
    isDarkModeMap = 'isDarkModeMap'
}
export enum ENRandomNumbers {
    zero = 0,
    five = 5,
    ten = 10,
    eleven = 11,
    fifteen = 15,
    twenty = 20,
    thirdy = 30,
    forthy = 40,
    fifty = 50,
    twoHundred = 200,
}
export enum ENThemeName {
    themeColor = 'themeColor'
}
export enum ENThemeColor {
    light = 0,
    dark = 1,
    purple = 2,
    bedge = 3,
    corporate = 4,
}
export enum ENSelectedColumnVariables {
    selectedRRDynamicReport = 'dynamicReport',
    selectedRRExcelView = 'excelDynamic',
    selectedRAutoImport = 'automaticImport',
    selectedImageAttrResult = '_imageAttrResult',
    selectedImageAttrAnalyze = '_imageAttrAnalyze',
    selectedUsersSearch = 'selectedUsersSearch',
    selectedSimafaBatch = '_simafaBatch',
    selectedTrackReading = 'reading',
    selectedTrackLoaded = 'loaded',
    selectedTrackFinished = 'finished',
    selectedTrackOffloaded = 'offloaded',
    selectedTrackImported = 'imported',
    selectedlastStates = 'lastStates',
    selectedUsersAll = 'userAll',
    selectedListManagerAll = 'allLists',
    selectedGeneralModify = 'generalListModify',
    selectedListManagerModify = 'ModifyList',
    selectedListManagerAssess = 'assess_pre',
    selectedListManagerMosh = 'searchMosh',
    selectedListManagerMoshDialog = 'searchMoshDialog',
    selectedListManagerBriefKardexDialog = 'briefKardex',
    selectedCounterState = 'counterState',
    selectedListManagerPro = 'searchPro',
    selectedSearchManagerSimple = 'simpleSearch',
    selectedAuth1 = 'auth1',
    selectedAuth2 = 'auth2',
    selectedAuth3 = 'auth3',
    selectedAuth4 = 'auth4',
    selectedRRAnalyzeByParam = 'analyzePrfm',
    selectedDMAnalyze = 'analysis',
    selectedRRMaster = 'master',
    selectedRRDetails = 'rrDetails',
    selectedRRTraverse = 'trv',
    selectedRRTraverseDifferential = 'trvDiff',
    selectedRRKarkard = 'karkard',
    selectedRRLocked = 'rrLocked',
    selectedRRPreNumShown = 'rrPreNumber',
    selectedRROffloadedKarkard = 'karkardOffload',
    selectedRRKarkardDaily = 'karkardDaily',
    selectedRRDisposalHours = 'disposalHs',
    selectedAbFormulas = 'abBaha',
    selectedBudgetFormulas = 'Budget',
    selectedTabsare2Formulas = 'tabsare2',
    selectedTabsare3Formulas = 'tabsare3',
    selectedCounterReport = 'counterReport',
    selectedReadingConfigDefault = 'readingConfigDefault',
    selectedReadingPeriod = 'readingPeriod',
    selectedReadingPeriodKind = 'periodKind',
    selectedImageAttribution = 'imgattr',
    selectedTextOutput = 'textOutput',
    selectedKarbari = 'karbari',
    selectedForbidden = 'forbidden',
    selectedErrors = 'errors',
    selectedServerErrors = 'serverErrors',
    selectedSimafaReadingProgram = 'simafaReadingProgram',
}
export enum ENOffloadModifyType {
    callAnnounce = '?????????? ??????????',
    blueScreenLight = '???????????? ???? ??????????',
    intenseLight = '?????? ???????? ??????',
    longDistance = '?????? ????????',
    counterStatesNotMatch = '?????? ???? ?????????? ??????',
    wrongReading = '???????????? ??????????',
    bazresi = '????????????',
    occasion = '??????????',
    inappropriate = '???? ??????????',
    doorPicture = '?????? ??????',
    counterHumidity = '?????????? ??????????',
    others = '????????'
};
export enum ENSearch {
    eshterak = '????????????',
    radif = '?? ????????????',
    readCode = '??????????',
    billId = '?????????? ??????',
}
export const IMasrafStates: ITHV[] = [
    { title: 'normal', header: '????????', value: 0 },
    { title: 'down', header: '??????????', value: 1 },
    { title: 'up', header: '????????', value: 2 },
    { title: 'zero', header: '??????', value: 3 },
    { title: 'inCalculable', header: '?????????????? ????????????', value: 4 }
]
export enum ENClientServerErrors {
    'cs400' = 400,
    'cs401' = 401,
    'cs403' = 403,
    'cs404' = 404,
    'cs405' = 405,
    'cs408' = 408,
    'cs409' = 409,
    'cs410' = 410,
    'cs422' = 422,
    'cs0' = 0,
    'cs500' = 500,
    'cs501' = 501,
    'cs502' = 502,
    'cs504' = 504,
}
export interface Theme {
    name: string,
    properties: any
}
export enum ENLoginVersion {
    version = '0.7.2'
}