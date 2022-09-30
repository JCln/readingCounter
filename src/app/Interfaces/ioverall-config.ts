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
    saveDataForMomentLastRead = 'saveDataForMomentLastRead',
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
    saveDataForImportDataFileExcel = 'saveDataForImportDataFileExcel',
    saveDataForImportDataFileExcelReq = 'saveDataForImportDataFileExcelReq',
    saveDataForImportErrors = 'saveDataForImportErrors',
    saveDataForAssessPre = 'saveDataForAssessPre',
    saveDataForAssessPreReq = 'saveDataForAssessPre',
    saveDataForAssessAdd = 'saveDataForAssessAdd',
    saveDataForSimafaReadingPrograms = 'saveDataForSimafaReadingPrograms',
    importSimafaReadingProgramReq = 'importSimafaReadingProgramReq',
    saveDataForSimafaBatch = 'saveDataForSimafaBatch',
    saveDataForPolicies = 'saveDataForPolicies',
    saveDataForProfile = 'saveDataForProfile',
    saveDataForTrackImported = 'saveDataForTrackImported',
    saveDataForTrackLoaded = 'saveDataForTrackLoaded',
    saveDataForTrackReading = 'saveDataForTrackReading',
    saveDataForLastStates = 'saveDataForLastStates',
    saveDataForTrackOffloaded = 'saveDataForTrackOffloaded',
    saveDataForTrackOffloadedGroup = 'saveDataForTrackOffloadedGroup',
    offloadedGroupReq = 'offloadedGroupReq',
    saveDataForTrackFinished = 'saveDataForTrackFinished',
    saveDataForFollowUp = 'saveDataForFollowUp',
    saveDataForFollowUpReq = 'saveDataForFollowUpReq',
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
    saveDataForLMPDTrackNumber = 'saveDataForLMPDTrackNumber',
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
    saveDataForUserKarkard = 'saveDataForUserKarkard',
    saveDataForRRkarkardDaily = 'saveDataForRRkarkardDaily',
    saveDataForRRGIS = 'saveDataForRRGIS',
    saveDataForLMGeneralModify = 'saveDataForLMGeneralModify',
    saveDataForLMGeneralModifyReq = 'saveDataForLMGeneralModifyReq',
    saveDataForLMGeneralGroupModifyReq = 'saveDataForLMGeneralGroupModifyReq',
    saveDataForLMGeneralGroupModify = 'saveDataForLMGeneralGroupModify',
    saveDataForOffloadModify = 'saveDataForOffloadModify',
    saveDataForLMModifyReq = 'saveDataForLMModifyReq',
    saveDataForLMModify = 'saveDataForLMModify',
    saveDataForLMAll = 'saveDataForLMAll',
    saveDataForLMAllReq = 'saveDataForLMAllReq',
    saveDataForLMAll_extra = 'saveDataForLMAll_extra',
    saveDataForEditUsers = 'saveDataForEditUsers',
    saveDataForEditUsersGUID = 'saveDataForEditUsersGUID',
    saveDataForUserLoggins = 'saveDataForUserLoggins',
    saveDataForFragmentNOBDetails = 'saveDataForFragmentNOBDetails',
    fragmentNOBDetailsGUID = 'fragmentNOBDetailsGUID',
    saveDataForRRGallery = 'saveDataForRRGallery',
    saveDataForRandomImgs = 'saveDataForRandomImgs',
    saveDataForRandomImgsRSFirst = 'saveDataForRandomImgsRSFirst',
    saveDataForRRGalleryRSFirst = 'saveDataForRRGalleryRSFirst',
    saveDataForRRGalleryReq = 'saveDataForRRGalleryReq',
    saveDataForRequestLog = 'saveDataForRequestLog',
    saveDataForRequestLogReq = 'saveDataForRequestLogReq',
    saveDataForServerErrors = 'saveDataForServerErrors',
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
    Disconnected = 'اتصال از سامانه «لحظه» قطع می‌باشد',
    Connecting = 'درحال اتصال به سامانه «لحظه»',
    Disconnecting = 'درحال قطع ارتباط از سامانه «لحظه»',
    Reconnecting = 'درحال اتصال به سامانه «لحظه»',
    Connected = 'متصل به سامانه «لحظه»'
}
export enum ENColorText {
    blue = 'آبی',
    green = 'سبز',
    orange = 'نارنجی',
    red = 'قرمز',
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
    { name: 'نباشد', value: false },
    { name: 'باشد', value: true },
    { name: 'هیچکدام', value: '' }
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
    enableTooltip?: boolean;
}
export interface ITabWrapperDetectDynamicRoute {
    _title: string,
    _dynamicRoute: string
}
export interface IOffloadModifyType {
    id: number,
    modifyeType: ENOffloadModifyType
}
export enum ENHasCount {
    hasCount = 'true',
    hasNotCount = 'false'
}
export enum ENLocalStorageNames {
    hasDynamicCount = 'hasDynamicCount',
    mapAnimationStartFrom = 'mapAnimationStartFrom',
    shouldUseCarouselGallery = 'shouldUseCarouselGallery',
    shouldUseBaseOnDate = 'shouldUseBaseOnDate',
    hasCanclableSpinner = 'hasCanclableSpinner',
    imageOption = 'imageOption',
    fontStyle = 'fontStyle',
}
export enum ENRandomNumbers {
    zero = 0,
    one = 1,
    three = 3,
    four = 4,
    five = 5,
    eight = 8,
    ten = 10,
    eleven = 11,
    fifteen = 15,
    eighteen = 18,
    twenty = 20,
    thirdy = 30,
    forthy = 40,
    fifty = 50,
    oneHundred = 100,
    twoHundred = 200,
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
    selectedGeneralGroupModify = 'generalGroupModify',
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
    selectedRRRequestLog = 'requestLog',
    selectedrrUserKarkard = 'rrUserKarkard',
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
    selectedQotr = 'qotr',
    selectedForbidden = 'forbidden',
    selectedErrors = 'errors',
    selectedServerErrors = 'serverErrors',
    selectedSimafaReadingProgram = 'simafaReadingProgram',
}
export enum ENOffloadModifyType {
    callAnnounce = 'اعلام تلفنی',
    blueScreenLight = 'اشتباه در قرائت',
    intenseLight = 'نور صفحه آبی',
    longDistance = 'نور زیاد',
    counterStatesNotMatch = 'عکس از فاصله دور',
    wrongReading = 'اشتباه قرائت',
    bazresi = 'بازرسی',
    occasion = 'مناسب',
    inappropriate = 'نا مناسب',
    doorPicture = 'عکس درب',
    counterHumidity = 'رطوبت کنتور',
    others = 'سایر'
};
export enum ENSearch {
    eshterak = 'اشتراک',
    radif = 'ش پرونده',
    readCode = 'قرائت',
    billId = 'شناسه قبض',
}
export const IMasrafStates: ITHV[] = [
    { title: 'normal', header: 'عادی', value: 0 },
    { title: 'down', header: 'پایین', value: 1 },
    { title: 'up', header: 'بالا', value: 2 },
    { title: 'zero', header: 'صفر', value: 3 },
    { title: 'inCalculable', header: 'غیرقابل محاسبه', value: 4 }
]