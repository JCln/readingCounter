import { ITHV } from "./ioverall-config";

export enum EN_messages {
    passwords_notFetch = 'تعداد ارقام گذرواژه با تایید آن برابر نیست',
    password_notExactly = 'گذرواژه جدید با تکرار آن یکی نیست',
    passwordShouldChange = 'لطفا گذرواژه را تغییر دهید',
    passwordShouldChangeReason = 'جهت تامین امنیت حساب کاربری خود، گذرواژه باید تغییر کند.',
    sameLength_eshterak = 'تعداد ارقام از اشتراک، تا اشتراک باید برابر باشند',
    lessThan_eshterak = 'از اشتراک کمتر از تا اشتراک است!',
    sameLength_notValid = 'مقادیر ابتدا و انتهایی را وارد نمایید',

    server_noDataFounded = 'اطلاعاتی جهت دانلود وجود ندارد',
    lessThan_rate = 'از نرخ کمتر از تا نرخ است!',
    percent_pictures = 'درصد تصویر نمیتواند بیش تر از 100 و کمتر از 0 باشد',
    percent_alalhesab = 'درصد علی الحساب نمیتواند بیش تر از 100 و کمتر از 0 باشد',
    thereis_no_reader = 'قرائت کننده‌ای در این ناحیه انتخاب نشده است',
    not_found_period = 'مدت دوره‌ای پیدا نشد',
    thereis_no_default = 'تنظیمات قرائت پیشفرضی وجود ندارد',
    thereis_no_type = 'نوع دوره ای وجود ندارد',
    not_found_zoneId = 'ناحیه ای تعریف نشده است',
    try_uploadAgain = 'مجددا امتحان نمایید',
    notFound = 'موردی یافت نشد',
    notFoundToExport = 'موردی برای ذخیره وجود ندارد',
    notFoundDataToRegister = 'مقداری برای ثبت وجود ندارد',
    highLow100 = 'مقدار نمیتواند بیش تر از 100 و کمتر از 0 باشد',
    userPass_empty = 'نام کاربری یا گذرواژه نمیتواند خالی باشد',
    insertTwoStep = 'کد تایید را وارد نمایید',
    insertTwoStep2 = 'کد تایید اشتباه است',
    timoutInterval = 'زمان ارسال کد به اتمام رسید. لطفا مجددا تلاش نمایید.',
    insertTwoStepLength = 'ارقام کد تایید اشتباه است',
    userPassEnterCaptcha = 'لطفا عبارت تصویر امنیتی را وارد نمایید',
    access_denied = 'دسترسی کافی به شما داده نشده است',
    access_whenLoginAgain = 'برای ذخیره تغییرات از برنامه خارج و مجددا وارد شوید',
    insert_without_decimal = 'شماره نسخه را بدون اعشار وارد نمایید',
    insert_reading_time = 'دوره قرائتی ایجاد و سپس امتحان نمایید',
    insert_reader = 'یک قرائت کننده انتخاب نمایید',
    insert_ActivationUser = 'نوع فعالیتی انتخاب نمایید',
    insert_karbaricode = 'کد کاربری را وارد نمایید',
    insert_assessAdd = 'حداقل یکی از موارد باید انتخاب شود',
    insert_karbari = 'نام کاربری را وارد نمایید',
    insert_password = 'گذرواژه را وارد نمایید',
    insert_host = 'هاست را وارد نمایید',
    insert_catalog = 'کاتالوگ را وارد نمایید',
    insert_confirm_pass = 'تکرار گذرواژه را وارد نمایید',
    insert_name = 'نام را وارد نمایید',
    insert_surename = 'نام خانوادگی را وارد نمایید',
    insert_userName = 'نام کاربری را وارد نمایید',
    insert_mobile = 'شماره موبایل را وارد نمایید',
    insert_showName = 'نام قابل نمایش را وارد نمایید',
    insert_work = 'خدمتی را مشخص نمایید',
    insert_File = 'فایلی انتخاب کنید',
    insert_Image = 'تصویری انتخاب کنید',
    uploadMaxCountPassed = 'حجم فایل انتخابی از حداکثر حجم قابل ارسال(آپلود) بیشتر است',
    insertIsNotImage = 'فرمت ارسالی باید تصویر باشد',
    imageNotExists = 'تصویر/صوت برای نمایش وجود ندارد',
    changesOnNextRead = 'تغییر تعداد نمایش با قرائت بعدی اعمال خواهد شد',
    insert_video = 'ویدیویی انتخاب کنید',
    accedd_denied_relogin = 'دسترسی شما باطل شده است. ساعت سیستم خود را نیز بررسی و مجددا وارد شوید',
    insert_roleAccess = 'سطح دسترسی به ناحیه ای را انتخاب نمایید',
    needMoreAccess = 'برای تغییر دراین قسمت به دسترسی های بیشتری نیاز دارید',
    insert_group_access = 'گروه دسترسی را مشخص نمایید',
    insert_again = 'مجددا مقادیر را وارد نمایید',
    insert_inputExtensions = 'فرمت فایل های ورودی خالی است',
    insert_contentType = 'نوع داده (content) خالی است',
    insert_fromDate = 'از تاریخ خالی است',
    insert_statusId = 'وضعیت فعلی خالی است',
    insert_counterStateShouldHaveValue = 'باید همه وضعیت های فعلی درحال اصلاح انتخاب شده باشند ',
    insert_modifyTypeShouldHaveValue = 'باید نوع اصلاح همه سطرهای درحال ویرایش انتخاب شده باشند ',
    insert_modifyTypeSingle = 'نوع اصلاح انتخاب نشده است',
    insert_startDay = 'روز شروع اجرا خالی است',
    insert_endDay = 'روز پایان اجرا خالی است',
    insert_minLengthMaxLogRecord = 'تعداد رکورد های لاگ کمتر از حداقل مجاز است',
    insert_startTime = 'زمان شروع خالی است',
    insert_endTime = 'زمان پایان خالی است',
    insert_toDate = 'تا تاریخ خالی است',
    insert_date = 'تاریخ را وارد نمایید',
    insert_fromRate = 'از نرخ را وارد نمایید',
    insert_toRate = 'تا نرخ را وارد نمایید',
    insert_readingPeriod = 'دوره قرائت را وارد نمایید',
    insert_readingPeriodKind = 'نوع دوره قرائت را وارد نمایید',
    insert_year = 'سالی وارد نمایید',
    insert_quantity = 'تعدادی وارد نمایید',
    insert_zone = 'ناحیه ای وارد نمایید',
    insert_region = 'منطقه خودگردانی وارد نمایید',
    insert_province = 'استانی وارد نمایید',
    insert_country = 'کشوری وارد نمایید',
    insert_CounterReader = 'قرائت کننده‌ای انتخاب نمایید',
    insert_listNumber = 'شماره لیست را وارد نمایید',
    no_listNumberExist = 'شماره لیستی برای نمایش بازدید وجود ندارد',
    insert_title = 'عنوان را وارد نمایید',
    insert_LatinTitle = 'عنوان لاتین را وارد نمایید',
    insert_days = 'تعداد روز را وارد نمایید',
    insert_govermentalCode = 'کد دولتی را وارد نمایید',
    insert_logicalOrder = 'ترتیب را وارد نمایید',
    insert_text = 'متن را وارد نمایید',
    insert_colorName = 'رنگ را مشخص نمایید',
    insert_showTime = 'زمان نمایش را وارد نمایید',
    insert_url = 'آدرس URL  را وارد نمایید',
    insert_title_route = 'عنوان مسیر را وارد نمایید',
    insert_rrDetails = 'گزارش بازرسی',
    insert_searchType = 'نوع جستجو را وارد نمایید',
    insert_caption = 'پانوشت را وارد نمایید',
    insert_value = 'مقداری وارد نمایید',
    insert_karbariMoshtarakinCode = 'کاربری مشترکین را وارد نمایید',
    insert_moshtarakinId = 'کد مشترکین را وارد نمایید',
    insert_Id = 'کد را وارد نمایید',
    insert_counterState = 'وضعیت کنتور را مشخص نمایید',
    insert_counterStateDetails = 'وضعیت کنتور(وضعیت فعلی) را مشخص نمایید',
    insert_counterNumber = 'رقم فعلی(رقم کنتور) را مشخص نمایید',
    insert_desc = 'توضیحی وارد نمایید',
    insert_AcceptVerbs = 'متد قابل پذیرش را وارد نمایید',
    insert_jsonInfo = 'jsonInfo را وارد نمایید',
    insert_parameterSendType = 'parameter send type را وارد نمایید',
    insert_excelFile = 'لطفا یک فایل excel انتخاب نمایید',
    insert_excelRows = 'تعداد سطر های فایل Excel را وارد نمایید',
    download_excel = 'دریافت فایل Excel',
    download_excelButton = 'دریافت Excel',
    userDesc = 'توضیحات کاربر',
    downloadPermit = 'از دانلود فایل اطمینان دارید؟',
    downloadLimit = 'شما به حداکثر موارد بارگیری در روز جاری رسیده اید',
    downloadLimitText = 'لطفا مجددا تلاش ننمایید',
    insert_abFormula = 'فرمول آب را وارد نمایید',
    insert_fazelabFormula = 'فرمول فاضلاب را وارد نمایید',
    insert_formula = 'فرمول را وارد نمایید',
    insert_versionName = 'نام نسخه را وارد نمایید',
    insert_versionCode = 'شماره نسخه را وارد نمایید',
    insert_APK = 'لطفا یک فایل apk انتخاب نمایید',
    insert_IP = 'IP را وارد نمایید',
    insert_subnet = 'تا IP را وارد نمایید',
    insert_Period = 'مدت را وارد نمایید',
    insert_limit = 'حداکثر تعداد را وارد نمایید',
    insert_trackNumber = 'شماره پیگیری را وارد نمایید',
    insert_clientOrder = 'ترتیب نمایش را وارد نمایید',
    insert_modify_type = 'نوع اصلاح را وارد نمایید',
    no_modifyFound = 'نوع اصلاح مشخص نشده است',
    modifySearchType = 'نوع جستجو مشخص نشده است',
    abbrMessage = 'خلاصه تغییرات بصورت زیر است',
    abbrMessageLatestInfo = 'نتیجه اصلاح',
    insert_number = 'مقدار عددی وارد نمایید',
    insert_fromEshterak = 'از اشتراک را وارد نمایید',
    insert_ToEshterak = 'تا اشتراک را وارد نمایید',
    insert_radif = 'شماره پرونده را وارد نمایید',
    insert_allReaders = 'برای هر مسیر یک قرائت کننده مشخص نمایید',
    insert_nextBazdidDate = 'تاریخ بازدید بعدی را مشخص نمایید',

    format_invalid_trackNumber = 'فرمت شماره پیگیری اشتباه است',
    format_invalidOrWrong = 'مقدار/ مقادیر وارد شده خالی یا اشتباه است',
    format_invalid_trackNumbersLength = 'تعداد ارقام شماره پیگیری اشتباه است',
    format_invalid_numberLengths = 'تعداد ارقام وارد شده اشتباه است',
    should_insert_APK = 'فرمت ارسالی باید فایل apk باشد',
    should_insert_ZIP = 'فرمت ارسالی باید فایل zip باشد',
    should_insert_image = 'فایل ارسالی باید تصویر با فرمت (jpg-jpeg-png) باشد',
    should_insert_video = 'فرمت ارسالی باید ogg و یا mp4 باشد',
    format_invalid_esterak = 'فرمت اشتراک ناصحیح است',
    format_invalid = 'فرمت ناصحیح است',
    format_isNotExactLengthNumber = 'تعداد ارقام تاریخ اشتباه است',
    format_isNotExactLengthEndTime = 'تعداد ارقام زمان اشتباه است',
    format_invalid_excel = 'فرمت ارسالی باید فایل excel باشد',
    invalid_mobile = 'شماره موبایل نادرست است',
    invalid_email = 'ایمیل نادرست است',
    format_invalid_from_eshterak = 'فرمت از اشتراک ناصحیح است',
    format_invalid_fromDate = 'فرمت از تاریخ ناصحیح است',
    format_invalid_toDate = 'فرمت تا تاریخ ناصحیح است',
    format_invalid_to_eshterak = 'فرمت  تا اشتراک ناصحیح است',
    format_invalid_counterNumber = 'فرمت رقم کنتور اشتباه است',
    format_invalid_counterNumberTimes = 'تعداد ارقام کنتور اشتباه است',
    format_defaultMinImg = 'درصد تصویر از حداقل مجاز تعریف شده کمتر است',
    format_defaultMaxImg = 'درصد تصویر از حداکثر مجاز تعریف شده بیشتر است',
    format_defaultMinAlalHesab = 'درصد علی‌الحساب از حداقل مجاز تعریف شده کمتر است',
    format_defaultMaxAlalHesab = 'درصد علی‌الحساب از حداکثر مجاز تعریف شده بیشتر است',
    format_invalidCounts = 'تعداد نویسه توضیحات کمتراز حد مجاز است',
    format_imagePercent = 'فرمت درصد تصویر اشتباه است',
    format_alalhesab = 'فرمت علی‌الحساب اشتباه است',
    insert_deactiveTerminationMinutes = 'زمان session های فعال خالی است',
    insert_maxLogRecords = 'حداکثر تعداد رکوردهای لاگ خالی است',

    twoStepTypeByUserPass = 'نام کاربری، گذرواژه',
    twoStepTypeByTwo = 'دو مرحله ای',
    tableSaved = 'ذخیره ستونها انجام شد',
    tableResetSaved = 'بازنشانی ستونها انجام شد',
    ResetLocalStorage = 'از بازگشت به تنظیمات پیش‌فرض اطمینان دارید',
    tableDefaultColumnOrder = 'ستونها درحالت پیشفرض قرار دارند',
    carouselShowEnabled = 'نمایش تصاویر بطور گروهی خواهد بود',
    carouselShowDisabled = 'نمایش تصاویر بطور تکی خواهد بود',
    basedOnDateShowEnabled = 'جستجو براساس تاریخ خواهد بود',
    basedOnDateShowDisabled = 'جستجو براساس نوع خواهد بود',
    possibleResizableEnabled = 'تغییر اندازه ستونها فعال شد',
    possibleResizableDisabled = 'تغییر اندازه ستونها غیرفعال شد',
    possibleReOrderableEnabled = 'تغییر ترتیب ستونها فعال شد',
    virtualScrollEnabled = 'scroll در جداول فعال شد',
    virtualScrollDisabled = 'scroll در جداول غیر فعال شد',
    possibleReOrderableDisabled = 'تغییر ترتیب ستونها غیرفعال شد',
    twoStepsAuthEnabledWarn = 'شما درحال فعال سازی ورود دو مرحله ای می‌باشید',
    twoStepsAuthDisabledWarn = 'شما درحال غیرفعال سازی ورود دو مرحله ای می‌باشید',
    twoStepsAuthEnabled = 'ورود دو مرحله ای فعال شد',
    twoStepsAuthDisabled = 'ورود دو مرحله ای غیرفعال شد',
    areYouSure = 'آیا اطمینان دارید؟',
    possibledefaultAggregateTracksEnabled = 'گروه‌بندی در کارتابل بطور پیشفرض فعال شد',
    tableGeneralSearchEnabled = 'جستجوی کلی در جداول فعال شد',
    tableGeneralSearchDisabled = 'جستجوی کلی در جداول غیرفعال شد',
    possibledefaultAggregateTracksDisabled = 'گروه‌بندی در کارتابل بطور پیشفرض غیرفعال شد',
    spinnerHasCancelable = 'امکان لغو درخواست غیر فعال شد',
    spinnerHasActive = 'امکان لغو درخواست فعال شد',
    notifyPositionChange = 'مکان اعلان پیام‌ها تغییر نمود',
    imageOptionChanged = 'تنظیم اندازه تصاویر انجام شد',
    done = 'انجام شد',
    doneSingleListModify = 'اصلاح لیست انجام شد',
    doneBroadcast = 'پیام مخابره شد',

    // DIALOG TITLES
    iOPolicyAddTitle = 'افزودن ورودی خروجی داده',
    iOPolicyEditTitle = 'ویرایش ورودی خروجی داده',

    allowed_forbiddenByDate = 'مشاهده غیر مجاز تنها با تاریخ امکان پذیر است',
    allowed_empty = 'مقادیر نمیتواند خالی باشند',
    confirmResetIIS = 'از ریست IIS اطمینان دارید',
    confirmResetApp = 'از ریست APP اطمینان دارید',
    confirmOfflineApp = 'از آفلاین کردن APP اطمینان دارید',
    confirmServerDelete = 'از حذف خطاها اطمینان دارید',
    confirmExtendLicenseTime = 'از افزایش زمان اطمینان دارید',
    confirmExpireLicense = 'از پایان زمان اطمینان دارید',
    compressExpireLicense = 'از کاهش زمان اطمینان دارید',
    checkAuthenticity = 'از بررسی اعتبار سنجی اطمینان دارید',
    NTPCheck = 'از بررسی پروتکل زمان شبکه اطمینان دارید',
    dBConnection = 'از اتصال به پایگاه داده اطمینان دارید',
    NTPResult = 'زمان پروتکل شبکه (NTP)',

    confirm_userGroupChange_1 = 'تا زمان ورود مجدد، کاربران گروه',
    confirm_userGroupChange_2 = 'امکان ادامه فعالیت را نخواهند داشت. آیا از ویرایش اطمینان دارید؟',
    confirm_userChange = 'تا زمان ورود مجدد، ',
    confirm_userChange_2 = 'امکان ادامه فعالیت را نخواهد داشت. آیا از ویرایش اطمینان دارید؟',
    confirm_yourPassword = 'تا زمان ورود مجدد، امکان ادامه فعالیت را نخواهید داشت. آیا از تغییر گذرواژه اطمینان دارید؟',
    confirmUserGroupChange1 = `1- توجه فرمایید دسترسی کاربران در گروه دقیقا منطبق با دسترسی تعیین شده توسط شما خواهد بود (تغییرات در دسترسی های قبلی لحاظ نمیگردد بلکه دسترسی های اعطا شده پس از ذخیره توسط شما اعمال خواهد شد)  \n 2-  کلیه کاربران در گروه مد نظر شما تا زمان ورود مجدد به سامانه اجازه فعالیت نخواهند داشت.`,
    confirm_remove = 'از حذف  مورد اطمینان دارید؟',
    confirm_removeingUser1 = 'شما درحال حذف کاربر «',
    confirm_removeingUser2 = '» با نام کاربری «',
    confirm_IS = '» می‌باشید',
    confirm_removeUser = 'از حذف  کاربر اطمینان دارید؟',
    confirm_createList = ' لیست صادر شود؟',
    isNotValidatedFragment = 'نوبتی تایید نشده است',
    importDynamic_created = 'لیست صادر شد',
    gisAccuracy_insufficient = 'دقت نقطه ناکافی است',
    import_simafaBatch = 'لیست صادر شده بصورت زیر است:',
    import_NoRouteAvailable = 'مسیری برای ایجاد وجود ندارد',
    confirm_send = ' از ارسال موارد اطمینان دارید؟',
    reson_delete_backtoImported = 'علت بازگشت به صادر شده',
    reasonBacktoImportedCaution1 = 'کاربر محترم، درصورت ارجاع این مسیر به مرحله صادر شده، قرائت کننده «',
    reasonBacktoImportedCaution2 = '» باید مطلع گردد. درصورت اختلال احتمالی، مسئولیت آن با ارجاع دهنده خواهد بود',
    reasonForceOffloadCaution1 = 'کاربر محترم، درصورت اتمام قرائت این مسیر، قرائت کننده «',
    reasonForceOffloadCaution2 = '» باید مطلع گردد. درصورت اختلال احتمالی، مسئولیت آن با ثبت کننده خواهد بود',
    reason_forceOffload = 'علت اتمام قرائت',
    reason_deleteRoute = 'علت حذف مسیر',
    insert_Key = 'کلید را وارد نمایید',
    insertLocalKey = 'کلید(*) را وارد نمایید',
    insert_TrueKey = 'کلید نادرست است',
    reason_backToPrev = 'علت بازگشت به مرحله قبلی',
    toReading = 'علت بازگشت به درحال قرائت',
    reason_toOffloaded = 'علت بازگشت به بارگذاری شده',
    toPrevious = 'علت بازگشت به مرحله قبلی',

    broadTitle1 = 'قطع سامانه',
    broadTitle2 = 'رفرش صفحه',
    broadTitle3 = 'تماس با راهبر',
    broadMessage1 = 'همکار گرامی سامانه به دلیل بروزرسانی مدت کوتاهی قطع خواهد شد',
    broadMessage2 = 'لطفا از سامانه خارج و سپس یکبار صفحه را رفرش نمایید',
    broadMessage3 = 'همکار گرامی خسته نباشید، باتوجه به بروزرسانی نسخه نرم‌افزار درصورت بروز هرگونه مشکل با راهبر سامانه تماس حاصل نمایید',

    call_supportGroup = 'خطای سرور، با پشتیبانی تماس حاصل نمایید',
    reLoginPlease = 'لطفا مجددا وارد سامانه شوید',
    checkPlease = 'لطفا نسبت به اصلاح مورد اقدام نمایید',
    browserSupport_alarm = 'نسخه مرورگر شما برنامه را پشتیبانی نمی‌کند',
    browserSupport_warn = 'برای پشتیبانی بهتر، مرورگر',
}
export enum ENPrimeNGTranslator {
    accept = 'تایید',
    reject = 'بازگشت',
    startsWith = ' شروع با',
    contains = 'شامل باشد',
    notContains = ' شامل نباشد',
    endsWith = ' پایان با',
    equals = 'برابر',
    notEquals = 'نا برابر',
    lt = ' کمتر از',
    lte = 'کمتر یا برابر',
    gt = 'بزرگتر',
    gte = 'بزرگتر یا برابر',
    is = 'باشد',
    isNot = 'نباشد',
    before = 'قبل',
    after = 'بعد',
    clear = 'پاک کردن',
    apply = 'تایید',
    matchAll = 'مطابقت با همه',
    matchAny = ' مطابقت',
    addRule = 'جستجو براساس',
    removeRule = 'حذف جستجو',
    choose = ' انتخاب',
    upload = 'ارسال',
    cancel = 'بازگشت'
}
export enum ENExportTableTranslationName {
    myPreviousFailures = 'تلاش های ناموفق',
    assess_pre = 'بازدید',
    errors = 'خطاها',
    errorsByTrackNumber = 'خطاها با پیگیری',
    simafaReadingProgram = 'سیمافا',
    auth1 = 'درخت دسترسی یک',
    auth2 = 'درخت دسترسی دو',
    auth3 = 'درخت دسترسی سه',
    auth4 = 'درخت دسترسی چهار',
    analysis = 'آنالیز',
    forbidden = 'غیرمجاز',
    allLists = 'لیست ها',
    briefKardex = 'خلاصه کاردکس',
    generalListModify = 'اصلاح لیست کلی',
    generalGroupModify = 'اصلاح لیست کلی (دسته‌ای)',
    ModifyList = 'اصلاح لیست',
    searchMoshDialog = 'جستجوی مشترک(دیالوگ)',
    apk = 'apk',
    counterReport = 'گزارش بازرسی',
    Budget = 'بودجه',
    tabsare2 = 'تبصره دو',
    tabsare3 = 'تبصره سه',
    abBaha = 'آبها',
    automaticImport = 'صدورلیست خودکار',
    karbari = 'کاربری',
    qotr = 'قطر',
    readingConfigDefault = 'تنظیمات پیشفرض',
    readingPeriod = 'دوره قرائت',
    periodKind = 'نوع دوره قرائت',
    textOutput = 'تکست خروجی',
    searchMosh = 'جستجو مشترک',
    searchPro = 'جستجو تجمیعی',
    simpleSearch = 'جستجو',
    serverAuthenticityBrief = 'اصالت سنجی(خلاصه)',
    serverAuthenticityResult = 'اصالت سنجی',
    ipFilter = 'فیلتر IP',
    ipSpecialRules = 'نقش IP',
    policyHistory = 'تاریخچه تنظیمات امنیتی',
    usersLogins = 'ورودهای کاربران',
    roleHistory = 'تاریخچه نقشها',
    serverErrors = 'خطاهای سرور',
    userRoleHistoryAll = 'تاریخچه کاربران',
    ipFilterBlockedUsers = 'کاربران مسدود شده',
    reqLogUserActivationByUserId = 'تاریخچه کاربران با کد کاربری',
    userLogs = 'درخواست کاربر',
    userRoleHistorySummary = 'تایخچه نقشهای کاربر(خلاصه)',
    finished = 'دانلود شده',
    imported = 'صادر شده',
    lastStates = 'آخرین وضعیت',
    loaded = 'بارگیری شده',
    offloaded = 'بارگذاری شده',
    offloadedGroup = 'اصلاح لیست',
    reading = 'درحال قرائت',
    country = 'کشور',
    province = 'استان',
    region = 'مناطق خودگردان',
    zone = 'نواحی/ شهر',
    zoneBound = 'محدوده ها',
    feedbackAllComplaint = 'شکایتها',
    feedbackAllSuggest = 'پیشنهادها',
    forbiddenByParamWithType = 'غیرمجاز(پ)',
    momentLs = 'سامانه لحظه',
    rrDetails = 'جزئیات',
    disposalHs = 'پراکندگی ساعات',
    rrGuildsParams = 'اصناف',
    _imageAttrAnalyze = 'آنالیز تصاویر',
    _imageAttrResult = 'نتیجه پایش',
    karkard = 'کارکرد',
    karkardDaily = 'کارکرد روزانه',
    master = 'بازرسی',
    analyzePrfm = 'آنالیز عملکرد',
    dynamicReport = 'گزارش پویا',
    excelDynamic = 'گزارش اکسل',
    fragmentKarkard = 'نوبتی',
    rrLocked = 'قفل شده ها',
    karkardOffload = 'اصلاح کارکرد',
    rrPreNumber = 'با رقم قبلی',
    trv = 'پیمایش',
    trvDiff = 'پیمایش تغییرات',
    rrUserKarkard = 'کارکرد کاربر',
    userActivation = 'فعالیت کاربر',
    downloadAttemptsReq = 'تلاشهای دانلود',
    requestLogGetUploaded = 'آپلودهای موفق',
    IOPolicyHistory = 'تاریخچه تنظیمات امنیتی',
    ipFilterHistory = 'تاریخچه فیلتر IP',
    ipFilterGetBlocked = 'IP های بلاک شده',
    requestLogAnonymous = 'همه درخواستها',
    requestLogUnAuthorized = 'درخواست های غیرمجاز',
    requestLogListUser = 'درخواست کاربر',
    notificationListByDateReq = 'پیام ها',
    uploadAttemptsReq = 'تلاشهای آپلود',
    userMasterHistory = 'تاریخچه کاربران',
    imgResultGridBased = 'نتیجه پایش(جدول)',
    userOnlines = 'کاربران آنلاین',
    userSearch = 'جستجوی کاربران',
    userAll = 'همه کاربران',
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
    saveDataForUserMasterHistory = 'saveDataForUserMasterHistory',
    saveDataForUserDetailsHistory = 'saveDataForUserDetailsHistory',
    usersLoginsReq = 'usersLoginsReq',
    usersLogins = 'usersLogins',
    notificationListByDate = 'notificationListByDate',
    notificationListByDateReq = 'notificationListByDateReq',
    notificationMessages = 'notificationMessages',
    _userAddUserInfos = '_userAddUserInfos',
    offlineSingleReadingCounterReq = 'offlineSingleReadingCounterReq',
    offlineSingleReadingCounter = 'offlineSingleReadingCounter',
    RRGuildsWithParam = 'RRGuildsWithParam',
    mobileManagerFeedbackTypeIsComplaint = 'mobileManagerFeedbackTypeIsComplaint',
    mobileManagerFeedbackTypeIsNotComplaint = 'mobileManagerFeedbackTypeIsNotComplaint',
    mobileManagerFeedbackAllC = 'mobileManagerFeedbackAllC',
    mobileManagerFeedbackAllS = 'mobileManagerFeedbackAllS',
    mobileManagerFeedbackAllCReq = 'mobileManagerFeedbackAllCReq',
    mobileManagerFeedbackAllSReq = 'mobileManagerFeedbackAllSReq',
    mobileManagerforbiddenTypeReq = 'mobileManagerforbiddenTypeReq',
    mobileManagerforbiddenType = 'mobileManagerforbiddenType',
    requestLogUnAuthorizedReq = 'requestLogUnAuthorizedReq',
    requestLogUnAuthorized = 'requestLogUnAuthorized',
    ipFilterRes = 'ipFilterRes',
    ipFilterGetBlockedReq = 'ipFilterGetBlockedReq',
    ipFilterGetBlocked = 'ipFilterGetBlocked',
    ipfilterHistory = 'ipfilterHistory',
    IOPolicyHistory = 'IOPolicyHistory',
    userCompare = 'userCompare',
    downloadAttempts = 'downloadAttempts',
    uploadAttempts = 'uploadAttempts',
    getUploaded = 'getUploaded',
    logMemoryStatus = 'logMemoryStatus',
    iOPolicy = 'iOPolicy',
    ipFilterBlockedUsers = 'ipFilterBlockedUsers',
    serverAuthenticityBrief = 'serverAuthenticityBrief',
    reqLogUserActivationByUserId = 'reqLogUserActivationByUserId',
    userRoleCompare = 'userRoleCompare',
    serverGetAuthenticity = 'serverGetAuthenticity',
    listLatestInfo = 'listLatestInfo',
    ipFilterGetInvalidTime = 'ipFilterGetInvalidTime',
    ipFilterGetInvalidTimeReq = 'ipFilterGetInvalidTimeReq',
    authenticityAttemptsReq = 'authenticityAttemptsReq',
    authenticityAttempts = 'authenticityAttempts',
    importedEditedRes = 'importedEditedRes'
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
    fiftyMili = 50000,
    snackTimeMultipleTo = 150
}
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
}
export enum ENImageTypes {
    typical = 1,
    forbidden = 2,
    mobileApp = 3,
    single = 4,
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
    fontFamily = 'fontFamily',
    tablesGeneralSearch = 'tablesGeneralSearch',
    reOrderableTable = 'reOrderableTable',
    virtuallScrollable = 'virtuallScrollable',
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
    selectedUserLoggins = 'userLogs',
    selectedPolicyHistory = 'policyHistory',
    selectedIpFilterHistory = 'ipFilterHistory',
    selectedServerAuthenticityBrief = 'serverAuthenticityBrief',
    selectedServerGetAuthenticity = 'serverAuthenticityResult',
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
    selectedImportedEdited = 'importedEdited',
    selectedRRGuildsParams = 'rrGuildsParams',
    selectedRRRequestLog = 'requestLog',
    selectedRRRequestLogAnonymous = 'requestLogAnonymous',
    selectedRRRequestLogUnAuthorized = 'requestLogUnAuthorized',
    selectedRRRequestLogListUser = 'requestLogListUser',
    selectedRequestLogUsersLogins = 'usersLoginsDetails',
    selectedRequestLogIpFilterGetBlocked = 'ipFilterGetBlocked',
    selectedRequestAuthenticityAttempts = 'authenticityAttempts',
    selectedRequestLogIpFilterGetInvalidTime = 'ipFilterGetInvalidTime',
    selectedRequestLogIpFilterBlockedUsers = 'ipFilterBlockedUsers',
    selectedRequestLogUserActivationByUserId = 'reqLogUserActivationByUserId',
    selectedRequestLogNotifListByDate = 'notificationListByDateReq',
    selectedRequestLogDownloadAttempts = 'downloadAttemptsReq',
    selectedRequestLogGetUploaded = 'requestLogGetUploaded',
    selectedRequestLogUploadAttempts = 'uploadAttemptsReq',
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
    access_denied451LegalReasons = 'بدلیل موارد امنیتی دسترسی شما به سامانه باطل شده است',
    access_denied401 = 'مجوز های دسترسی شما باطل شده است',
    access_denied401Msg = 'لطفا مجددا وارد سامانه شوید',
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
export enum ENGroupByNames {
    selectedAggregate = 'selectedAggregate',
    selectedAggregateMaster = 'selectedAggregateMaster'
}
export interface IFiltered {
    global: string,
    hasFilter: boolean
}
