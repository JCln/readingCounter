export enum ENInterfaces {
    AuthsAccountRefresh = 'V1/Account/Refresh',
    AuthsAccountLogin = 'V1/account/login',
    AuthsAccountLogout = 'V1/Account/Logout',
    AuthsCaptchaApiShow = 'V1/Account/CreateDNTCaptchaParams',

    AuthLevel4GET = 'V1/AuthLevel4/all',
    AuthLevel4DICTIONARY = 'V1/AuthLevel4/Dictionary',
    AuthLevel4REMOVE = 'V1/AuthLevel4/Remove',
    AuthLevel4EDIT = 'V1/AuthLevel4/Edit',
    AuthLevel4ADD = 'V1/AuthLevel4/Add',

    AuthLevel3GET = 'V1/AuthLevel3/all',
    AuthLevel3DICTIONARY = 'V1/AuthLevel3/Dictionary',
    AuthLevel3REMOVE = 'V1/AuthLevel3/Remove',
    AuthLevel3EDIT = 'V1/AuthLevel3/Edit',
    AuthLevel3ADD = 'V1/AuthLevel3/Add',

    AuthLevel2GET = 'V1/AuthLevel2/all',
    AuthLevel2DICTIONARY = 'V1/AuthLevel2/Dictionary',
    AuthLevel2REMOVE = 'V1/AuthLevel2/Remove',
    AuthLevel2EDIT = 'V1/AuthLevel2/Edit',
    AuthLevel2ADD = 'V1/AuthLevel2/Add',

    AuthLevel1GET = 'V1/AuthLevel1/all',
    AuthLevel1DICTIONARY = 'V1/AuthLevel1/Dictionary',
    AuthLevel1REMOVE = 'V1/AuthLevel1/Remove',
    AuthLevel1EDIT = 'V1/AuthLevel1/Edit',
    AuthLevel1ADD = 'V1/AuthLevel1/Add',

    ZoneBoundGET = 'V1/ZoneBound/All',
    ZoneBoundDICTIONARY = 'V1/ZoneBound/Dictionary',
    ZoneBoundREMOVE = 'V1/ZoneBound/Remove',
    ZoneBoundEDIT = 'V1/ZoneBound/Edit',
    ZoneBoundADD = 'V1/ZoneBound/Add',

    ZoneGET = 'V1/Zone/All',
    ZoneDICTIONARY = 'V1/Zone/Dictionary',
    ZoneREMOVE = 'V1/Zone/Remove',
    ZoneEDIT = 'V1/Zone/Edit',
    ZoneADD = 'V1/Zone/Add',

    RegionGET = 'V1/Region/All',
    RegionDICTIONARY = 'V1/Region/Dictionary',
    RegionREMOVE = 'V1/Region/Remove',
    RegionEDIT = 'V1/Region/Edit',
    RegionADD = 'V1/Region/Add',

    ProvinceGET = 'V1/Province/All',
    ProvinceDICTIONARY = 'V1/Province/Dictionary',
    ProvinceREMOVE = 'V1/Province/Remove',
    ProvinceEDIT = 'V1/Province/Edit',
    ProvinceADD = 'V1/Province/Add',

    CountryGET = 'V1/Country/All',
    CountryDICTIONARY = 'V1/Country/Dictionary',
    CountryREMOVE = 'V1/Country/Remove',
    CountryEDIT = 'V1/Country/Edit',
    CountryADD = 'V1/Country/Add',

    RoleGET = 'V1/Role/All',
    RoleDICTIONARY = 'V1/Role/Dictionary',
    RoleREMOVE = 'V1/Role/Remove',
    RoleEDIT = 'V1/Role/Edit',
    RoleADD = 'V1/Role/Add',
    RoleHistory = 'V1/Role/History',
    UserRoleHistory = 'V1/User/UserRoleHistory',
    UserMasterHistory = 'V1/User/UserMasterHistory',
    UserDetailsHistory = 'V1/User/UserDetailsHistory',

    downloadFileGET = 'V1/Download/File',
    downloadFileInfo = 'V1/Download/File/info',
    downloadFileForbidden = 'V1/Download/File/forbidden',
    downloadFileByUrl = `V1/Download/File/ByUrl`,

    ReadingConfigALL = 'V1/ReadingConfigDefault/All',
    ReadingConfigGET = 'V1/ReadingConfigDefault/Get',
    ReadingConfigREMOVE = 'V1/ReadingConfigDefault/Remove',
    ReadingConfigEDIT = 'V1/ReadingConfigDefault/Edit',
    ReadingConfigADD = 'V1/ReadingConfigDefault/Add',
    readingConfigDefaultByZoneId = `V1/ReadingConfigDefault/Get/`,

    FormulaWaterAll = 'V1/AbBahaFormula/All',
    FormulaWaterEdit = 'V1/AbBahaFormula/Edit',
    FormulaWaterExcelSample = 'v1/abbahaformula/excelsample',
    FormulaWaterAdd = 'V1/AbBahaFormula/Add',
    FormulaWaterAddExcel = 'V1/AbBahaFormula/AddExcel',
    FormulaWaterRemove = 'V1/AbBahaFormula/Remove',

    FormulaBudgetAll = 'V1/BudgetFormula/All',
    FormulaBudgetEdit = 'V1/BudgetFormula/Edit',
    FormulaBudgetExcelSample = 'V1/BudgetFormula/ExcelSample',
    FormulaBudgetAdd = 'V1/BudgetFormula/Add',
    FormulaBudgetAddExcel = 'V1/BudgetFormula/AddExcel',
    FormulaBudgetRemove = 'V1/BudgetFormula/Remove',

    FormulaTabsare2All = 'V1/Tabsare2Formula/All',
    FormulaTabsare2Edit = 'V1/Tabsare2Formula/Edit',
    FormulaTabsare2Add = 'V1/Tabsare2Formula/Add',
    FormulaTabsare2Remove = 'V1/Tabsare2Formula/Remove',

    FormulaTabsare3All = 'V1/Tabsare3Formula/All',
    FormulaTabsare3ExcelSample = 'V1/Tabsare3Formula/ExcelSample',
    FormulaTabsare3Edit = 'V1/Tabsare3Formula/Edit',
    FormulaTabsare3Add = 'V1/Tabsare3Formula/Add',
    FormulaTabsare3AddExcel = 'V1/Tabsare3Formula/AddExcel',
    FormulaTabsare3Remove = 'V1/Tabsare3Formula/Remove',

    textOutputGET = 'V1/TextOutputField/All',
    textOutputRemove = 'V1/TextOutputField/Remove',
    textOutputAdd = 'V1/TextOutputField/Add',
    textOutputEdit = 'V1/TextOutputField/Edit',

    userGET = 'V1/User/All',
    userEDIT = 'V1/user/Edit',
    userADD = 'V1/user/Add',
    userSearch = 'V1/User/Search',
    userLOGINS = 'V1/User/Logins',
    userEditOnRole = 'V1/User/EditOnRole',
    userRESETPASS = 'V1/User/ResetPassword',
    unlockUser = 'V1/User/Unlock',
    userACTIVATE = 'V1/User/Activate',
    userDEACTIVATE = 'V1/User/Deactivate',
    userOnlines = 'V1/User/Onlines',
    postUserKarkardSummary = 'V1/Tracking/UserKarkardSummary',

    fragmentMASTERALL = 'V1/Fragment/Master/All',
    fragmentMASTERREMOVE = 'V1/Fragment/Master/Remove',
    fragmentMASTEREDIT = 'V1/Fragment/Master/Edit',
    fragmentMASTERADD = 'V1/Fragment/Master/Add',
    fragmentMASTERVALIDATE = 'V1/Fragment/Master/Validate',
    fragmentMasterInZone = `V1/Fragment/Master/InZone/`,
    fragmentDETAILSDETAILS = 'V1/Fragment/Details',
    fragmentDETAILSREMOVE = 'V1/Fragment/Detials/Remove',
    fragmentDETAILSEDIT = 'V1/Fragment/Details/Edit',
    fragmentDETAILSADD = 'V1/Fragment/Details/Add',
    fragmentDETAILSByEshterak = 'V1/Fragment/Details/ByEshterak',

    automaticImportAll = 'V1/AutomaticImport/All',
    automaticImportByFragment = 'V1/AutomaticImport/ByFragment/',
    automaticImportEdit = 'V1/AutomaticImport/Edit',
    automaticImportAdd = 'V1/AutomaticImport/Add',
    automaticImportRemove = 'V1/AutomaticImport/Remove',

    OutputDBF = 'V1/Output/Dbf',
    OutputDBFEqamatBagh = 'V1/Output/Dbf1',
    OutputSINGLE = 'V1/Output/single',
    OutputDELAYED = 'V1/Output/Delayed',
    forbidden = 'V1/Forbidden/ByParam',

    trackingIMPORTED = 'V1/Tracking/Imported',
    trackingLOADED = 'V1/Tracking/Loaded',
    trackingREADING = 'V1/Tracking/Reading',
    trackingOFFLOADED = 'V1/Tracking/Offloaded',
    trackingFINISHED = 'V1/Tracking/Finished',
    trackingLASTSTATES = 'V1/Tracking/LastStates',
    trackingEDIT = 'V1/Tracking/Edit',
    trackingToIMPORTED = 'V1/Tracking/ToImported',
    trackingToImportedFromLoad = 'V1/Tracking/ToImportedFromLoad',
    trackingToREADING = 'V1/Tracking/ToReading',
    trackingToOFFLOADED = 'V1/Tracking/ToOffloaded',
    trackingToOFFLOADEDGeneralModify = 'V1/List/OffLoaded/AllInGroup/',
    trackingToOffloadedGroupModifyBatch = 'V1/OffLoad/ModifyBatch',
    GeneralModifyAllExcelInGroup = 'V1/List/OffLoaded/AllExcelInGroup',
    trackingPRE = 'V1/Tracking/Pre',
    trackingBriefKardex = 'V1/AbBahaReport',
    trackingFinishReadiED = 'V1/Tracking/FinishReading',
    trackingREMOVE = 'V1/Tracking/Remove',
    trackingFOLLOWUP = 'V1/Tracking/FollowUp/?trackNumber=',
    trackingAnalyzeByParam = 'V1/Tracking/Analyze/ByParam',
    ImageAttributionResult = 'V1/ImageAttributionFile/Result',
    ImageAttributionAnalyze = 'V1/ImageAttributionFile/Analyze',
    trackingPostOffloadModify = 'V1/OffLoad/Modify',
    trackingEditState = 'V1/Tracking/EditState',
    trackingStatesDictionary = 'V1/Tracking/States/Dictionary',
    trackingUserKarkard = 'V1/Tracking/UserKarkard',

    ListSearchMoshtarak = 'V1/List/Search/Moshtarak',
    ListSearchPro = 'V1/List/Search/Pro',
    ListGetProExcel = 'V1/List/Search/ProExcel',
    ListSearchSimple = 'V1/Tracking/Search/Simple',
    ListTraverse = 'V1/List/Offloaded/Traverse',
    ListTraverseDifferential = 'V1/List/Offloaded/TraverseDifferential',
    ListTraverseDifferentialDictionary = 'V1/List/TraverseDifferential/Dictionary',
    ListOFFKarkard = 'V1/List/Offloaded/Karkard',
    ListKarkardOffloaded = 'V1/List/Offloaded/KarkardOffloaded',
    ListKarkardByFragment = 'V1/List/Offloaded/KarkardByFragment',
    ListKarkardChart = 'V1/List/Offloaded/KarkardChart',
    ListTraverseDifferntialChart = 'V1/List/Offloaded/TraverseDifferntialChart',
    ListOffloadedPERDAY = `V1/List/OffLoaded/PerDay/`,
    ListPerDayXY = 'V1/List/OffLoaded/PerDayXY',
    ListXY = `V1/List/OffLoaded/XY`,
    ListOffloadedALL = `V1/List/OffLoaded/All/`,
    ListDictionary = 'V1/List/TraverseDifferential/Dictionary',
    ListKarkardDaily = 'V1/List/Offloaded/KarkardDaily',
    ListToGis = 'V1/List/Offloaded/Gis',
    ListDispersalHours = 'V1/List/Offloaded/DispersalHours',
    ListDispersalChart = 'V1/List/Offloaded/DispersalChart',
    ListAllImages = `V1/List/OffLoaded/AllImages/`,
    downloadFileAllImages = 'V1/Download/File/AllImages?access_token=',
    downloadFileAllImagesTWO = 'V1/Download/File/AllImages2?access_token=',
    ListRRLocked = 'V1/List/Offloaded/Locked',
    ListRRPreNumberShown = 'V1/List/Offloaded/PreNumberShown',


    readingPeriodAll = 'V1/readingPeriod/All',
    readingPeriodEdit = 'V1/readingPeriod/Edit',
    readingPeriodAdd = 'V1/readingPeriod/Add',
    readingPeriodRemove = 'V1/readingPeriod/Remove',
    readingPeriodKindAll = 'V1/readingPeriodKind/All',
    readingPeriodKindDictionary = 'V1/readingPeriodKind/Dictionary',
    readingPeriodDictionaryByZoneIdAndKindId = `V1/readingPeriod/Dictionary/`,
    readingPeriodByKindDictionary = `V1/ReadingPeriod/DictionaryByKind/`,
    readingPeriodKindEdit = 'V1/readingPeriodKind/Edit',
    readingPeriodKindAdd = 'V1/readingPeriodKind/Add',
    readingPeriodKindRemove = 'V1/readingPeriodKind/Remove',

    KarbariAll = 'V1/Karbari/All',
    // KarbariDictionary = 'V1/Karbari/Dictionary',
    KarbariDictionaryCode = 'V1/Karbari/DictionaryCode',
    KarbariRemove = 'V1/Karbari/Remove',
    KarbariEdit = 'V1/Karbari/Edit',
    KarbariAdd = 'V1/Karbari/Add',
    rrInStatePost = 'V1/List/Offloaded/InState',
    postRRGuildWithParams = 'V1/List/Guilds/WithParam',

    signalRStartConnection = '/notifyHub',
    // signalRBroadcastMessage = 'broadcast',
    signalRBroadcastMessage = 'V1/NotifyManager/Broadcast/TextWithTimer',
    signalRNotifDirectImage = 'V1/NotifyManager/Direct/Image',
    signalRNotifDirectVideo = 'V1/NotifyManager/Direct/Video',
    signalRNotifDirectText = 'V1/NotifyManager/Direct/Text',
    NotifyDirectText = 'V1/NotifyManager/Direct/Text',
    NotifyManagerUnreadCount = 'V1/NotifyManager/Unread/Count',
    NotifyManagerUnreadGet = 'V1/NotifyManager/Unread/Get',
    NotifyManagerListByDate = 'V1/NotifyManager/List/ByDate',
    NotifyManagerConfirmDelivery = 'V1/NotifyManager/ConfirmDelivery',
    signalRMomentSystemAddReadingRow = 'AddReadingRow',
    receiveTextWithTimer = 'receiveTextWithTimer',
    ReceiveImageWithCaption = 'ReceiveImageWithCaption',
    ReceiveVideoWithCaption = 'ReceiveVideoWithCaption',
    ReceiveDirectMessage = 'receiveDirectMessage',
    receiveNotificationUnreadCount = 'receiveNotificationUnreadCount',
    signalRSendMessage = 'sendMessage',
    signalRReceiveMessage = 'receiveMessage',

    serverManagerCheckAuthenticity = 'V1/Server/CheckAuthenticity',
    serverManagerDelete = 'V1/Server/Delete',
    serverManagerHangFire = '/main/admin/hangFire?access_token=',
    serverManagerHealthCheck = '/healthchecks-ui',
    serverManagerErrorsElmah = '/elmah/detail/',
    serverManagerResetApp = 'V1/Server/ResetApp',
    serverManagerDrivesInfo = 'V1/Server/DrivesInfo',
    serverManagerOSInfo = 'V1/Server/OsInfo',

    requestLogUser = 'V1/RequestLog/List/User',
    requestLogAnonymous = 'V1/RequestLog/List/Anonymous',
    serverManagerErrors = 'V1/Server/Errors',
    requestLogUserActivationDictionary = 'V1/RequestLog/UserActivationLogTypes',
    requestLogUserActivation = 'V1/RequestLog/UserActivation',
    requestLogUsersLogins = 'V1/User/UsersLogins',

    dynamicReportManagerAll = 'V1/DynamicReport/All',
    dynamicReportManagerRemove = 'V1/DynamicReport/Remove/',
    dynamicReportManagerDisplayLinkAdd = '/DynamicReportManagerMvc/DisplayDesigner?access_token=',
    dynamicReportManagerDisplayLink = '/DynamicReportManagerMvc/DisplayViewer',
    dynamicReportManagerDisplayLinkEdit = '/DynamicReportManagerMvc/DisplayDesigner',

    counterStateAll = 'V1/CounterState/All',
    counterStateDictionary = 'V1/CounterState/Dictionary',
    counterStateDictionaryByZoneId = `V1/CounterState/DictionaryByZoneId/`,
    counterStateDictionaryByCode = `V1/CounterState/DictionaryByCode/`,
    counterStateDictionaryForModify = `V1/CounterState/DictionaryForModify/`,
    counterStateGridFriendly = 'V1/CounterState/GridFriendly',
    counterStateRemove = 'V1/CounterState/Remove',
    counterStateEdit = 'V1/CounterState/Edit',
    counterStateAdd = 'V1/CounterState/Add',

    CounterReportAll = 'V1/CounterReport/All',
    CounterReportGet = 'V1/CounterReport/Get',
    CounterReportRemove = 'V1/CounterReport/Remove',
    CounterReportEdit = 'V1/CounterReport/Edit',
    CounterReportAdd = 'V1/CounterReport/Add',
    CounterReportDICTIONARY = 'V1/CounterReport/Dictionary',
    CounterReportByZoneIdDICTIONARY = `V1/CounterReport/DictionaryByZoneId/`,

    counterReadersByZoneId = `V1/User/CounterReaders/`,

    ReadingReportMasterWithParam = 'V1/ReadingReport/Master/WithParam',
    ReadingReportDETAILSWithParam = 'V1/ReadingReport/Details/WithParam',
    ReadingReportTitles = `V1/ReadingReport/Titles`,

    imageAttributionGet = 'V1/ImageAttribution/All',
    imageAttributionRemove = 'V1/ImageAttribution/Remove',
    imageAttributionEdit = 'V1/ImageAttribution/Edit',
    imageAttributionAdd = 'V1/ImageAttribution/Add',

    APKPreList = 'V1/APK/PreList',
    APKLast = 'V1/APK/Last',
    APKUpload = 'V1/APK/Upload',
    APKRemove = `V1/Apk/Remove`,
    GuildManagerAll = 'V1/Guild/All',
    GuildManagerEdit = 'V1/Guild/Edit',
    GuildManagerAdd = 'V1/Guild/Add',
    GuildManagerRemove = 'V1/Guild/Remove',
    dynamicTraverseAll = 'V1/DynamicTraverse/All',
    dynamicTraverseEdit = 'V1/DynamicTraverse/Edit',
    dynamicTraverseAdd = 'V1/DynamicTraverse/Add',
    dynamicTraverseRemove = 'V1/DynamicTraverse/Remove/',
    offloadManual = 'V1/Manual/OffLoad',
    fileUploadSingle = 'V1/Upload/Single',
    loadManual = `V1/Load/Manual`,
    offlineSingleReadingCounter = 'addANEW',

    QotrAll = 'V1/Qotr/All',
    QotrDictionary = 'V1/Qotr/Dictionary',
    QotrRemove = 'V1/Qotr/Remove',
    QotrEdit = 'V1/Qotr/Edit',
    QotrAdd = 'V1/Qotr/Add',

    dataMiningReadingTime = 'V1/List/Offloaded/ReadingTime',

    /* NON MANAGER INTERFACES */
    getPolicies = 'V1/Policy/Active',
    editPolicies = 'V1/Policy/Edit',
    policiesHistory = 'V1/Policy/History',
    ipRateManager = 'V1/Ip/SpecialRules',
    getSideBar = 'V1/User/SideBar',
    changePassword = 'V1/Account/ChangePassword',
    getMyProfile = 'V1/Account/MyInfo',
    getWaterMarkConfig = 'V1/WaterMark/Get',
    postWaterMarkConfig = 'V1/WaterMark/AddOrEdit',
    chat = 'V1/Chat/Index?accessToken=',
    settingsLicense = 'V1/ApiSettings/License',
    settingsExtendTime = 'V1/ApiSettings/ExtendTime?key=',
    settingsExpireLicense = 'V1/ApiSettings/ExpireLicense?key=',
    settingsCompressTime = 'V1/ApiSettings/CompressTime?key=',

    postImportData = 'V1/Import/Dynamic',
    postImportErrorsByTrackNumber = 'V1/Import/ImportErrorsByTrackNumber',
    postImportDynamicCount = 'V1/Import/DynamicCount',
    getImportErrros = 'V1/Import/ImportErrors',
    postSimafaReadingProgram = 'V1/Import/Simafa/ReadingPrograms',
    postSimafaBatch = 'V1/Import/Simafa/Batch',
    postSimafaSingle = 'V1/Import/Simafa/single',
    postSimafaAssessPre = 'V1/Import/Simafa/AssessPre',
    postSimafaAssessAdd = 'V1/Import/Simafa/AssessAdd',

    getImportDataFileExcelSample = 'V1/Import/File/ExcelSample',
    postImportDataFileExcel = 'V1/Import/File/Excel',

    postToolsRandomImages = 'V1/List/OffLoaded/RandomImages',
    postImgAttrResultDetails = 'V1/ImageAttributionFile/ResultDetails',
    postImgAttrResultDetailsGridBased = 'V1/ImageAttributionFile/ResultDetailsGridBased',
    getImageAttributionAll = `V1/ImageAttributionFile/All`,
    getImageAttributionAddOrEdit = 'V1/ImageAttributionFile/AddOrEdit',

    editToolsDynamicExcel = 'V1/DynamicExcel/Edit',
    getToolsDynamicExcel = 'V1/DynamicExcel/All',
    addToolsDynamicExcel = 'V1/DynamicExcel/Add',
    removeToolsDynamicExcel = 'V1/DynamicExcel/Remove',

    getDashboardDispersalRateTimed = 'V1/List/Dashboard/DispersalRate/Timed',
    getCounterReaderLocations = 'V1/List/Latest/Locations',
    getDashboardEditCount = 'V1/Tracking/Dashboard/Tracking/EditCount',
    getDashboardDateDifference = 'V1/List/Dashboard/DateDifference/Timed',
    getDashboardTraverseTimed = 'V1/List/Dashboard/Traverse/Timed',
    getDashboardCountInStates = 'V1/Tracking/Dashboard/CountInStates',
    getDashboardShownReadings = 'V1/List/Dashboard/ShownReadings/Timed',
    getDashboardKarkardTimed = 'V1/List/Dashboard/Karkard/Timed',
    getDashboardMediaTimed = 'V1/List/Dashboard/Media/Timed',
    getLatestOnOffloadId = 'V1/List/Latest/OnOffLoadId',
    postKarkardAllStates = 'V1/List/Offloaded/KarkardAllStates',
    getDashboardNotReader = 'V1/Tracking/Dashboard/Tracking/NotReader',
    getDashboardReadingReportTimed = 'V1/ReadingReport/Dashboard/Timed',
    getDashboardReadTimed = 'V1/List/Dashboard/Read/Timed',
    getDashboardErrorCount = 'V1/DbQuery/ErrorCount',
    getDashboardForbiddenTimed = 'V1/Forbidden/Dashboard/Timed',
    getDashboardRequestLogCount = 'V1/RequestLog/Dashboard/Request/Count',
    getDashboardRequestRate = 'V1/RequestLog/Dashboard/Request/Rate',
    getDashboardQueryCount = 'V1/RequestLog/Dashboard/Query/Count',
    getDashboardQueryRate = 'V1/RequestLog/Dashboard/Query/Rate',
    getDashboardReadDaily = 'V1/List/Dashboard/Read/Daily',
    getDashboardUnReadCount = 'V1/DbQuery/UnreadCount',
    getDashboardMoshtarakCount = 'V1/DbQuery/MoshtarakCount',
    postDashboardAnalyzePerformance = 'V1/Tracking/Dashboard/Analyze/Performance',
    getDashboardUsersOverall = 'V1/User/Dashboard/Overall',
    getDashboardAttemptAverage = 'V1/List/Dashboard/Attempt/Timed',
    getDashboardLockedCount = 'V1/List/Dashboard/Locked/Timed',
    getDashboardPackageAverage = 'V1/Tracking/Dashboard/Tracking/PackAverage',
    getDashboardXY = 'V1/List/Dashboard/XY/Timed',
    getDashboardDateDiffUnClose = 'V1/List/Dashboard/DateDifferenceUnClosed/Timed',


    // New Mobile App
    feedbackTypeManagerGetC = 'V1/FeedbackType/AllC',
    feedbackTypeManagerEditC = 'V1/FeedbackType/EditC',
    feedbackTypeManagerAddC = 'V1/FeedbackType/AddC',
    feedbackTypeManagerRemoveC = 'V1/FeedbackType/RemoveC',

    feedbackTypeManagerGetS = 'V1/FeedbackType/AllS',
    feedbackTypeManagerEditS = 'V1/FeedbackType/EditS',
    feedbackTypeManagerAddS = 'V1/FeedbackType/AddS',
    feedbackTypeManagerRemoveS = 'V1/FeedbackType/RemoveS',

    feedbackManagerAllC = 'V1/Feedback/All/true',
    feedbackManagerAllS = 'V1/Feedback/All/false',
}