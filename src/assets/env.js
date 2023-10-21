(function (window) {
    window.__env = window.__env || {};

    // API url
    window.__env.headerProvinceTitle = 'ENV';
    // window.__env.API_URL = 'http://127.0.0.1/kontoriNew';
    // window.__env.API_URL = 'http://192.168.100.18:7529';
    window.__env.API_URL = 'https://37.191.92.157/kontoriNew'
    // for map instantiation    
    window.__env.mapUrls = [
        { title: 'OSM', url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' },
        { title: 'sattelite', url: 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg' }
    ];
    window.__env.hasNextBazdid = false;
    window.__env.mapCenter = [35.73698, 51.41606];
    window.__env.browserVersions = {
        Desktop: {
            Chrome: { alert: 70, normal: 86 },
            Firefox: { alert: 72, normal: 83 },
            IE: { alert: 0, normal: 0 },
            opera: { alert: 73, normal: 78 },
            safari: { alert: 10, normal: 10 },
        },
        Touch: {
            Chrome: { alert: 10, normal: 10 },
            Firefox: { alert: 10, normal: 10 },
            IE: { alert: 10, normal: 10 },
            opera: { alert: 55, normal: 63 },
            safari: { alert: 11, normal: 13 },
        }
    };
    window.__env.years = [
        { title: '1401', value: 1401 },
        { title: '1400', value: 1400 },
        { title: '1399', value: 1399 },
        { title: '1398', value: 1398 },
        { title: '1397', value: 1397 },
        { title: '1396', value: 1396 },
        { title: '1395', value: 1395 },
        { title: '1402', value: 1402 }
    ];
    window.__env.getDeleteDictionary = [
        { id: 0, title: 'حذف دائمی' },
        { id: 2, title: 'حذف موقت' },
        { id: 3, title: 'حذف موقت' },
        { id: 5, title: 'حذف موقت' }
    ];
    window.__env.getLogoutReasonDictionary = [
        { id: 0, title: 'توسط کاربر' },
        { id: 1, title: 'ویرایش شده' },
        { id: 2, title: 'تغییر گذرواژه' },
        { id: 3, title: 'لاگین همزمان' },
        { id: 4, title: 'غیرفعال شده' },
        { id: 5, title: 'اتمام زمان فعالیت مجاز' },
        { id: 6, title: 'بازنشانی گذرواژه' },
        { id: 7, title: 'تغییر نوع ورود' }
    ];
    window.__env.getInvalidLoginReasonDictionary = [
        { id: 1, title: 'کاربر غیرمجاز' },
        { id: 2, title: 'گذرواژه نادرست' },
        { id: 3, title: 'مسدودسازی درخواست مکرر' },
        { id: 4, title: 'کاربر غیرفعال' },
        { id: 5, title: 'کاربر قفل شده' },
        { id: 6, title: 'شماره سریال نادرست' }
    ];
    window.__env.hasCanclableSpinner = false;
    window.__env.timeout = 18000;
    window.__env.reOrderableTable = false;
    window.__env.defaultAggregateTracks = false;
    window.__env.shouldSaveTokensInLocal = false;
    window.__env.simafaImportStatus = { hasSingle: false, hasBatch: false };
    window.__env.version = '1.0.0';
    window.__env.aboutUs = { email: 'info@hivapardaz.ir', tel: '031-32121764', address: 'اصفهان، ارگ جهان نما، واحد 107', coName: 'هیوا پرداز اطلس' };
    window.__env.NotificationAlertTypesList = [
        { title: 'confidential', value: 0, titleUnicode: 'محرمانه' },
        { title: 'ordinary', value: 1, titleUnicode: 'عادی' },
        { title: 'sensitive', value: 2, titleUnicode: 'حساس' },
        { title: 'memory_full', value: 4, titleUnicode: 'حافظه' },
        { title: 'security', value: 8, titleUnicode: 'امنیتی' },
        { title: 'license', value: 16, titleUnicode: 'مجوز دسترسی' },
        { title: 'incorrect_time', value: 32, titleUnicode: 'زمان نادرست' }
    ];
    window.__env.NotificationMediaTypeList = [
        { title: 'text', value: 0, titleUnicode: 'متن' },
        { title: 'image', value: 1, titleUnicode: 'تصویر' },
        { title: 'video', value: 2, titleUnicode: 'ویدیو' },
        { title: 'audio', value: 4, titleUnicode: 'صوت' }
    ];
    window.__env.NotificationMediaTypeIds = {
        text: 0,
        image: 1,
        video: 2,
        audio: 4
    }
    window.__env.NotificationAlertTypesIds = {
        confidential: 0,
        ordinary: 1,
        sensitive: 2,
        memory_full: 4,
        security: 8,
        license: 16,
        incorrect_time: 32
    }

    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;
    window.__env.enableENV = false;
}(this));
