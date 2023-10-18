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
  saveDataForWaterMark = 'saveDataForWaterMark',
  saveDataForKarbari = 'saveDataForKarbari',
  saveDataForImageAttribution = 'saveDataForImageAttribution',
  saveDataForGuild = 'saveDataForGuild',
  saveDataForDynamicTraverse = 'saveDataForDynamicTraverse',
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
  saveDataForUserRoleHistory = 'saveDataForUserRoleHistory',
  saveDataForUserOnlines = 'saveDataForUserOnlines',
  saveDataForAddUsers = 'saveDataForAddUsers',
  saveDataForRoleManager = 'saveDataForRoleManager',
  saveDataForEditOnRole = 'saveDataForEditOnRole',
  saveDataForRoleHistory = 'saveDataForRoleHistory',
  saveDataForCountry = 'saveDataForCountry',
  saveDataForProvince = 'saveDataForProvince',
  saveDataForRegion = 'saveDataForRegion',
  saveDataForZone = 'saveDataForZone',
  saveDataForZoneBound = 'saveDataForZoneBound',
  saveDataForImportDynamic = 'saveDataForImportDynamic',
  saveDataForImportDataFileExcel = 'saveDataForImportDataFileExcel',
  saveDataForImportDataFileExcelReq = 'saveDataForImportDataFileExcelReq',
  saveDataForImportErrors = 'saveDataForImportErrors',
  saveDataForImportErrorsByTrackNumber = 'saveDataForImportErrorsByTrackNumber',
  saveDataForImportErrorsByTrackNumberReq = 'saveDataForImportErrorsByTrackNumberReq',
  saveDataForAssessPre = 'saveDataForAssessPre',
  saveDataForAssessPreReq = 'saveDataForAssessPre',
  saveDataForAssessAdd = 'saveDataForAssessAdd',
  saveDataForSimafaReadingPrograms = 'saveDataForSimafaReadingPrograms',
  importSimafaReadingProgramReq = 'importSimafaReadingProgramReq',
  saveDataForSimafaBatch = 'saveDataForSimafaBatch',
  saveDataForPolicies = 'saveDataForPolicies',
  saveDataForPoliciesHistory = 'saveDataForPoliciesHistory',
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
  saveDataForOutputDBFEqamatBagh = 'saveDataForOutputDBFEqamatBagh',
  saveDataForRRTraverse = 'saveDataForRRTraverse',
  saveDataForRRTraverseDifferential = 'saveDataForRRTraverseDifferential',
  saveDataForRRDisposalHours = 'saveDataForRRDisposalHours',
  saveDataForRRKarkard = 'saveDataForRRKarkard',
  saveDataForKarkardAllStates = 'saveDataForKarkardAllStates',
  saveDataForKarkardAllStatesTWO = 'saveDataForKarkardAllStatesTWO',
  saveDataForRRPreNumShown = 'saveDataForRRPreNumShown',
  saveDataForRRLocked = 'saveDataForRRLocked',
  saveDataForRROffloadedKarkard = 'saveDataForRROffloadedKarkard',
  saveDataForRRFragment = 'saveDataForRRFragment',
  saveDataForRRMaster = 'saveDataForRRMaster',
  saveDataForRRPerformance = 'saveDataForRRPerformance',
  saveDataForDMAAnalyze = 'saveDataForDMAAnalyze',
  saveDataForRRDetails = 'saveDataForRRDetails',
  saveDataForUserKarkard = 'saveDataForUserKarkard',
  saveDataForUserKarkardSummaryTwo = 'saveDataForUserKarkardSummaryTwo',
  saveDataForUserKarkardSummary = 'saveDataForUserKarkardSummary',
  saveDataForUserKarkardSummaryReq = 'saveDataForUserKarkardSummaryReq',
  saveDataForRRkarkardDaily = 'saveDataForRRkarkardDaily',
  saveDataForRRGIS = 'saveDataForRRGIS',
  saveDataForLMGeneralModify = 'saveDataForLMGeneralModify',
  saveDataForLMGeneralModifyReq = 'saveDataForLMGeneralModifyReq',
  saveDataForLMGeneralGroupModifyReq = 'saveDataForLMGeneralGroupModifyReq',
  saveDataForLMGeneralGroupModify = 'saveDataForLMGeneralGroupModify',
  AUXSaveDataForLMGeneralGroupModify = 'AUXSaveDataForLMGeneralGroupModify',
  saveDataForLMModifyReq = 'saveDataForLMModifyReq',
  saveDataForLMModify = 'saveDataForLMModify',
  saveDataForLMAll = 'saveDataForLMAll',
  saveDataForLMAllReq = 'saveDataForLMAllReq',
  saveDataForEditUsers = 'saveDataForEditUsers',
  saveDataForEditUsersGUID = 'saveDataForEditUsersGUID',
  saveDataForUserLoggins = 'saveDataForUserLoggins',
  saveDataForFragmentNOBDetails = 'saveDataForFragmentNOBDetails',
  fragmentNOBDetailsGUID = 'fragmentNOBDetailsGUID',
  saveDataForRRGallery = 'saveDataForRRGallery',
  saveDataForRandomImgs = 'saveDataForRandomImgs',
  saveDataForImgResultDetailsRes = 'saveDataForImgResultDetailsRes',
  saveDataForImgResultDetailsResFirst = 'saveDataForImgResultDetailsResFirst',
  saveDataForRandomImgsRSFirst = 'saveDataForRandomImgsRSFirst',
  saveDataForRRGalleryRSFirst = 'saveDataForRRGalleryRSFirst',
  saveDataForRRGalleryReq = 'saveDataForRRGalleryReq',
  saveDataForRequestLogListUser = 'saveDataForRequestLogListUser',
  saveDataForRequestLogAnonymous = 'saveDataForRequestLogAnonymous',
  saveDataForRequestLogListUserReq = 'saveDataForRequestLogListUserReq',
  saveDataForRequestLogAnonymousReq = 'saveDataForRequestLogAnonymousReq',
  saveDataForServerErrors = 'saveDataForServerErrors',
  saveDataForServerUserActivation = 'saveDataForServerUserActivation',
  saveDataForServerUserActivationReq = 'saveDataForServerUserActivationReq',
  saveDataForIpSpecialRules = 'saveDataForIpSpecialRules',
  saveDataForOSInfo = 'saveDataForOSInfo',
  license = 'license',
  saveDataForMsDriveInfo = 'saveDataForMsDriveInfo',
  saveDataForImgResultDetailsGridBased = 'saveDataForImgResultDetailsGridBased',
  saveDataForUserMasterHistory = "saveDataForUserMasterHistory",
  saveDataForUserDetailsHistory = "saveDataForUserDetailsHistory",
  usersLoginsReq = "usersLoginsReq",
  usersLogins = "usersLogins",
  notificationListByDate = "notificationListByDate",
  notificationListByDateReq = "notificationListByDateReq",
  notificationMessages = "notificationMessages",
  _userAddUserInfos = "_userAddUserInfos",
  offlineSingleReadingCounterReq = "offlineSingleReadingCounterReq",
  offlineSingleReadingCounter = "offlineSingleReadingCounter",
  RRGuildsWithParam = "RRGuildsWithParam",
  mobileManagerFeedbackTypeIsComplaint = "mobileManagerFeedbackTypeIsComplaint",
  mobileManagerFeedbackTypeIsNotComplaint = "mobileManagerFeedbackTypeIsNotComplaint",
  mobileManagerFeedbackAllC = "mobileManagerFeedbackAllC",
  mobileManagerFeedbackAllS = "mobileManagerFeedbackAllS",
  mobileManagerFeedbackAllCReq = "mobileManagerFeedbackAllCReq",
  mobileManagerFeedbackAllSReq = "mobileManagerFeedbackAllSReq",
  mobileManagerforbiddenTypeReq = 'mobileManagerforbiddenTypeReq',
  mobileManagerforbiddenType = 'mobileManagerforbiddenType',
  requestLogUnAuthorizedReq = "requestLogUnAuthorizedReq",
  requestLogUnAuthorized = "requestLogUnAuthorized",
  ipFilterRes = "ipFilterRes",
  ipFilterGetBlockedReq = "ipFilterGetBlockedReq",
  ipFilterGetBlocked = "ipFilterGetBlocked",
  ipfilterHistory = "ipfilterHistory",
  IOPolicyHistory = "IOPolicyHistory",
  IOPolicy = "IOPolicy",
  userCompare = "userCompare"
}
export interface ITestSidebar {
    routerUrl: string;
    name: string;
    isClosable: boolean;
    isRefreshable: boolean;
    sid_isOpenItems: boolean;
}
export interface IDialogMessage {
    messageTitle: string,
    messageTitleTwo?: string,
    text?: string,
    minWidth: string,
    isInput: boolean,
    inputMinLength?: number,
    placeHolder?: string,
    isDelete: boolean,
    icon: string,
    doesNotReturnButton?: boolean,
    disableClose?:boolean,
    isSelectableDate?: boolean,
    changePassword?: boolean
}
export interface ISimafaImportStatus {
    hasSingle: boolean,
    hasBatch: boolean
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
export enum ENSnackBarColors {
    warn = 'snack_warn',
    danger = 'snack_danger',
    success = 'snack_success',
    info = 'snack_info',
}
export enum ENToastColors {
    warn = 'warn',
    error = 'error',
    success = 'success',
    info = 'info',
}
export enum ENSnackBarColorsExact {
    warn = 'rgb(246, 128, 56)',
    danger = ' rgb(183, 28, 28)',
    success = 'rgb(75, 140, 56)',
    info = 'rgb(17, 111, 255)',
}
export enum ENSnackBarTimes {
    zero = 0,
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
export enum ENRandomNumbers {
    zero = 0,
    one = 1,
    two = 2,
    three = 3,
    four = 4,
    five = 5,
    six = 6,
    eight = 8,
    ten = 10,
    eleven = 11,
    fifteen = 15,
    sixteen = 16,
    eighteen = 18,
    twenty = 20,
    thirdy = 30,
    forthy = 40,
    fifty = 50,
    sixty = 60,
    oneHundred = 100,
    oneHundredAndTwenty = 120,
    twoHundred = 200,
    fourHundredEighty = 480,
}
export enum ENImageTypes {
    typical = 1,
    forbidden = 2,
    mobileApp = 3,
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
    key?: string;
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
    isSelectedOrigin: boolean;
    ltr?: boolean;
    readonly?: boolean;
    borderize?: boolean;
    icon?: string;
    isBoolean?: boolean;
    isNumber?: boolean;
    isSelectOption?: boolean;
    enableTooltip?: boolean;
}
export interface INotificationAlertTypes {
    title: string,
    value: number,
    titleUnicode: string
}
export interface ITabWrapperDetectDynamicRoute {
    _title: string,
    _dynamicRoute: string
}
export interface IOffloadModifyType {
    id: number,
    modifyeType: ENOffloadModifyType
}
export enum ENCompanyName {
    title = 'HiwaPardazAtlas'
}
export enum ENHasCount {
    hasCount = 'true',
    hasNotCount = 'false'
}
export enum ENLocalStorageNames {
    hasDynamicCount = 'hasDynamicCount',
    mapAnimationStartFrom = 'mapAnimationStartFrom',
    numberOfFlashRead = 'numberOfFlashRead',
    shouldUseCarouselGallery = 'shouldUseCarouselGallery',
    shouldUseBaseOnDate = 'shouldUseBaseOnDate',
    notifyPosition = 'notifyPosition',
    hasCanclableSpinner = 'hasCanclableSpinner',
    imageOption = 'imageOption',
    fontStyle = 'fontStyle',
    reOrderableTable = 'reOrderableTable',
    defaultAggregateTracks = 'defaultAggregateTracks',
}
// ENSelectedColumnVariables enum
//  variable name MUST be the same as columnManagerName of the columns data
export enum ENSelectedColumnVariables {
    selectedRRDynamicReport = 'dynamicReport',
    selectedRRExcelView = 'excelDynamic',
    selectedRAutoImport = 'automaticImport',
    selectedImageAttrResult = '_imageAttrResult',
    selectedFeedbackC = 'feedbackAllComplaint',
    selectedFeedbackS = 'feedbackAllSuggest',
    selectedImageAttrAnalyze = '_imageAttrAnalyze',
    selectedUsersSearch = 'selectedUsersSearch',
    selectedSimafaBatch = '_simafaBatch',
    selectedTrackReading = 'reading',
    selectedPolicyHistory = 'policyHistory',
    selectedIpFilterHistory = 'ipFilterHistory',
    selectedIOPolicyHistory = 'ipFilterHistory',
    selectedUserRoleHistoryDetails = 'userRoleHistoryDetails',
    selectedUserRoleHistorySummary = 'userRoleHistorySummary',
    selectedUserRoleHistory = 'userRoleHistoryAll',
    selectedUserMasterHistory = 'userMasterHistory',
    selectedUserMasterDetailsAll = 'userMasterDetailsAll',
    selectedRoleHistory = 'roleHistory',
    selectedToolsImgRDGridBased = 'imgResultGridBased',
    selectedTrackLoaded = 'loaded',
    selectedTrackFinished = 'finished',
    selectedTrackOffloaded = 'offloaded',
    selectedTrackOffloadedGroup = 'offloadedGroup',
    selectedTrackImported = 'imported',
    selectedlastStates = 'lastStates',
    selectedUsersAll = 'userAll',
    selectedUserOnlines = 'userOnlines',
    selectedListManagerAll = 'allLists',
    selectedGeneralModify = 'generalListModify',
    selectedGeneralGroupModify = 'generalGroupModify',
    selectedListManagerModify = 'ModifyList',
    selectedListManagerAssess = 'assess_pre',
    selectedListManagerMosh = 'searchMosh',
    selectedListManagerMoshDialog = 'searchMoshDialog',
    selectedListManagerBriefKardexDialog = 'briefKardex',
    selectedMyPreviousFailuresDialog = 'myPreviousFailures',
    selectedPolicyCompare = 'policyCompare',
    selectedCounterState = 'counterState',
    selectedListManagerPro = 'searchPro',
    selectedSearchManagerSimple = 'simpleSearch',
    selectedAuth1 = 'auth1',
    selectedAuth2 = 'auth2',
    selectedAuth3 = 'auth3',
    selectedAuth4 = 'auth4',
    selectedRRAnalyzeByParam = 'analyzePrfm',
    selectedDMAnalyze = 'analysis',
    selectedRRMaster = '_fragmentMaster',
    selectedRRDetails = 'rrDetails',
    selectedRRGuildsParams = 'rrGuildsParams',
    selectedRRRequestLog = 'requestLog',
    selectedRRRequestLogAnonymous = 'requestLogAnonymous',
    selectedRRRequestLogUnAuthorized = 'requestLogUnAuthorized',
    selectedRRRequestLogListUser = 'requestLogListUser',
    selectedRequestLogUsersLogins = 'usersLoginsDetails',
    selectedRequestLogIpFilterGetBlocked = 'ipFilterGetBlocked',
    selectedRequestLogNotifListByDate = 'notificationListByDateReq',
    selectedrrUserKarkard = 'rrUserKarkard',
    selectedRRTraverse = 'trv',
    selectedRRTraverseDifferential = 'trvDiff',
    selectedRRKarkard = 'karkard',
    selectedRRKarkardAllStates = 'offKarkardAllStatesReq',
    selectedRRLocked = 'rrLocked',
    selectedRRPreNumShown = 'rrPreNumber',
    selectedRROffloadedKarkard = 'karkardOffload',
    selectedRRFragment = 'rrFragmentKarkardReq',
    selectedRRKarkardDaily = 'karkardDaily',
    selectedRRDisposalHours = 'disposalHs',
    selectedAbFormulas = 'abBaha',
    selectedBudgetFormulas = 'Budget',
    selectedTabsare2Formulas = 'tabsare2',
    selectedTabsare3Formulas = 'tabsare3',
    selectedCounterReport = 'counterReport',
    selectedReadingConfigDefault = 'readingConfigDefault',
    selectedIpspecialrules = 'ipspecialrules',
    selectedReadingPeriod = 'readingPeriod',
    selectedReadingPeriodKind = 'periodKind',
    selectedImageAttribution = 'imgattr',
    selectedImageGuild = 'guild',
    selectedIpFilter = 'ipFilter',
    selectedFeedbackComplaint = 'feedbackComplaint',
    selectedFeedbackNotComplaint = 'feedbackNotComplaint',
    selectedDynamicTraverse = 'dynamicTraverse',
    selectedTextOutput = 'textOutput',
    selectedKarbari = 'karbari',
    selectedQotr = 'qotr',
    selectedForbidden = 'forbidden',
    selectedForbiddenWithType = 'forbiddenByParamWithType',
    selectedErrors = 'errors',
    selectedErrorsByTrackNumber = 'errorsByTrackNumber',
    selectedServerErrors = 'serverErrors',
    selectedServerUserActivation = 'userActivation',
    selectedSimafaReadingProgram = 'simafaReadingProgram',
}
export enum ENOffloadModifyType {
    selectAOption = 'انتخاب کنید',
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
export enum EN_Mess {
    checkValuesAndTryAgain = 'مقادیر را بررسی و مجددا امتحان نمایید',
    access_deniedLogin401 = '',
    access_denied401 = 'مجوز های دسترسی شما باطل شده است',
    access_denied401Msg = 'لطفا از ابتدا وارد سامانه شوید',
    youHaveNotAccess = 'دسترسی غیر مجاز',
    youHaveNotAccessMsg = 'از دسترسی خود به این قسمت اطمینان حاصل نمایید',
    dataNotFound = 'اطلاعاتی پیدا نشد، لطفا داده ورودی را بدقت وارد نمایید',
    timeOut = 'زمان ارسال درخواست به سرویس دهنده به اتمام رسید، احتمالا شبکه کُند و یا قطع است، لطفا دقایقی دیگر امتحان نمایید',
    threshold = 'به حداکثر تعداد درخواست رسیده‌اید',
    dataNotFoundOrDeleted = 'چنین آیتمی پیدا نشد، یا قبلاً حذف شده است',
    checkNetwork = 'از دسترسی به شبکه اطمینان حاصل نمایید',
    serviceError = 'خطای سرویس دهنده',
    notResponse = 'پاسخی دریافت نشد'
}