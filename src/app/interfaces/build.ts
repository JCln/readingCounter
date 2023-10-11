export interface IENV {
    headerProvinceTitle: string,
    API_URL: string,
    mapUrls: { title: string, url: string }[],
    hasNextBazdid: boolean,
    reOrderableTable: boolean,
    mapCenter: [number, number],
    browserVersions: IBrowserVersions,
    years: { title: string, value: number }[],
    getDeleteDictionary: { id: number, title: string }[],
    simafaImportStatus: {
        hasSingle: boolean,
        hasBatch: boolean
    }
    hasCanclableSpinner: boolean,
    timeout: number,
    defaultAggregateTracks: boolean,
    version: string,
    aboutUs: { email: string, tel: string, address: string }
    NotificationAlertTypesList: { title: string, value: number, titleUnicode: string }[]
    NotificationMediaTypeList: { title: string, value: number, titleUnicode: string }[]
    NotificationMediaTypeIds: {
        text: number,
        image: number,
        video: number,
        audio: number
    },
    NotificationAlertTypesIds: {
        confidential: number,
        ordinary: number,
        sensitive: number,
        memory_full: number,
        security: number,
        license: number,
        incorrect_time: number
    }
    getLogoutReasonDictionary: { id: number, title: string }[],
    shouldSaveTokensInLocal: boolean,
}
export enum ENURLs {
    LOCAL = 'http://192.168.100.18:7529',
    DEFAULT = 'https://37.191.92.157/kontoriNew',
    TEH = 'http://85.133.245.143/kontoriNew',
    ESF = 'https://37.191.92.157/kontoriNew',
    TEH_ZONE4 = 'http://81.12.106.167:8081/kontoriNew',
    TEH_SE = 'http://46.209.181.2:9098/kontoriNew',
    TEH_SE_LOCAL = 'http://172.28.5.40/kontoriNew',
    KERMANSHAH = 'http://46.225.241.211:25123/kontoriNew',
    // REY = 'http://85.133.190.218:4121/kontoriNew', to be on next version
    REY = 'http://85.133.190.221:4121/kontoriNew',
    TSW = 'http://81.90.148.25:880/kontoriNew',
    TEH1 = 'http://217.146.220.33:50012/kontoriNew',
    TEH5 = 'http://178.252.151.147/kontoriNew',
}
export enum ENOSMUrls {
    DEFAULT = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    ESF_LOCAL = 'http://172.18.12.242/osm_tiles/{z}/{x}/{y}.png',
    TEH_ZONE4 = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    TEH_SE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    TEH_SE_LOCAL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    KERMANSHAH = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    REY = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
}
export enum ENSatteliteAccessToken {
    DEFAULT = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
    ESF = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
    TEH_ZONE4 = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
    TEH_SE = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
    TEH_SE_LOCAL = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
    KERMANSHAH = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
    REY = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
}
export enum ENSatelliteToken {
    DEFAULT = 'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
    ESF = 'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
    TEH_ZONE4 = 'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
    TEH_SE = 'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
    TEH_SE_LOCAL = 'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
    KERMANSHAH = 'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
    REY = 'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
}
export enum ENActivateProvinceTitle {
    LOCAL = 'LOCAL',
    DEFAULT = '',
    ESF = 'اصفهان',
    TEH = 'تهران',
    TEH_ZONE4 = 'منطقه 4 تهران',
    TEH_SE = 'جنوب شرقی تهران',
    TEH_SE_LOCAL = 'جنوب شرقی تهران',
    KERMANSHAH = 'کرمانشاه',
    REY = 'منطقه 6 تهران',
    TSW = 'جنوب غربی تهران',
    TEH1 = 'منطقه 1 تهران',
    TEH5 = 'منطقه 5 تهران'
}
export interface IENV_BROWSER_SETUP {
    alert: number,
    normal: number
}
export interface IBrowserVersions {
    Desktop: {
        Chrome: IENV_BROWSER_SETUP,
        Firefox: IENV_BROWSER_SETUP,
        IE: IENV_BROWSER_SETUP,
        opera: IENV_BROWSER_SETUP,
        safari: IENV_BROWSER_SETUP,
    }
    Touch: {
        Chrome: IENV_BROWSER_SETUP,
        Firefox: IENV_BROWSER_SETUP,
        IE: IENV_BROWSER_SETUP,
        opera: IENV_BROWSER_SETUP,
        safari: IENV_BROWSER_SETUP,
    }
}
export class ENMapCenter {
    static readonly DEFAULT = new ENMapCenter([32.669, 51.664]);
    static readonly ESF = new ENMapCenter([32.669, 51.664]);
    static readonly TEH = new ENMapCenter([35.7501, 51.5255]);
    static readonly TEH_ZONE4 = new ENMapCenter([35.656051, 51.315435]);
    static readonly TEH_SE = new ENMapCenter([35.656051, 51.315435]);
    static readonly TEH_SE_LOCAL = new ENMapCenter([35.656051, 51.315435]);
    static readonly KERMANSHAH = new ENMapCenter([34.3277, 47.0778]);
    static readonly REY = new ENMapCenter([35.5770, 51.4625]);
    static readonly TSW = new ENMapCenter([35.5770, 51.4625]);

    private constructor(public readonly value: [number, number]) {
    }
}
export class timeout {
    static time = 18000;
    // static time = 2000;
}
export class simafaImportStatus {
    // interface is simafaImportStatus
    static simafaImportStatus = {
        hasSingle: true,
        hasBatch: true
    }
}
export class version {
    static readonly version = 'build: 0.0.0';
}
export class aboutUs {
    static readonly email = 'info@hivapardaz.ir';
    static readonly tel = '031-32121764';
    static readonly address = 'اصفهان، ارگ جهان نما، واحد 107';
    static readonly coName = 'هیوا پرداز اطلس';
}
export class NotificationAlertTypesList {
    static readonly DEFAULT = new NotificationAlertTypesList([
        { title: 'confidential', value: 0, titleUnicode: 'محرمانه' },
        { title: 'ordinary', value: 1, titleUnicode: 'عادی' },
        { title: 'sensitive', value: 2, titleUnicode: 'حساس' },
        { title: 'memory_full', value: 4, titleUnicode: 'حافظه' },
        { title: 'security', value: 8, titleUnicode: 'امنیتی' },
        { title: 'license', value: 16, titleUnicode: 'مجوز دسترسی' },
        { title: 'incorrect_time', value: 32, titleUnicode: 'زمان نادرست' },
    ]);

    private constructor(public readonly value: { title: string, value: number, titleUnicode: string }[]) {
    }
}
export class NotificationMediaTypeList {
    static readonly DEFAULT = new NotificationMediaTypeList([
        { title: 'text', value: 0, titleUnicode: 'متن' },
        { title: 'image', value: 1, titleUnicode: 'تصویر' },
        { title: 'video', value: 2, titleUnicode: 'ویدیو' },
        { title: 'audio', value: 4, titleUnicode: 'صوت' },
    ]);

    private constructor(public readonly value: { title: string, value: number, titleUnicode: string }[]) {
    }
}
export class NotificationMediaTypeIds {
    static text = 0;
    static image = 1;
    static video = 2;
    static audio = 4;
}
export class NotificationAlertTypesIds {
    static confidential = 0;
    static ordinary = 1;
    static sensitive = 2;
    static memory_full = 4;
    static security = 8;
    static license = 16;
    static incorrect_time = 32;
}
export class ENMapUrls {
    static readonly DEFAULT = new ENMapUrls([{ title: 'OSM', url: ENOSMUrls.DEFAULT }, { title: 'sattelite', url: ENSatteliteAccessToken.DEFAULT + ENSatelliteToken.DEFAULT }]);
    static readonly ESF = new ENMapUrls([{ title: 'OSM', url: ENOSMUrls.ESF_LOCAL }]);
    static readonly TEH = new ENMapUrls([{ title: 'OSM', url: ENOSMUrls.TEH_SE }]);
    static readonly TEH_ZONE4 = new ENMapUrls([{ title: 'OSM', url: ENOSMUrls.TEH_ZONE4 }]);
    static readonly TEH_SE = new ENMapUrls([{ title: 'OSM', url: ENOSMUrls.TEH_SE }]);
    static readonly TEH_SE_LOCAL = new ENMapUrls([{ title: 'OSM', url: ENOSMUrls.TEH_SE_LOCAL }]);
    static readonly KERMANSHAH = new ENMapUrls([{ title: 'OSM', url: ENOSMUrls.KERMANSHAH }]);
    static readonly REY = new ENMapUrls([{ title: 'OSM', url: ENOSMUrls.REY }]);

    private constructor(public readonly value: { title: string, url: string }[]) {
    }
}
export class ENYears {
    static readonly DEFAULT = new ENYears([
        { title: '1402', value: 1402 },
        { title: '1401', value: 1401 },
        { title: '1400', value: 1400 },
        { title: '1399', value: 1399 },
        { title: '1398', value: 1398 },
        { title: '1397', value: 1397 },
        { title: '1396', value: 1396 },
        { title: '1395', value: 1395 },
        { title: '1403', value: 1403 },
    ]);

    private constructor(public readonly value: { title: string, value: number }[]) {
    }
}
export class getLogoutReasonDictionary {
    static readonly DEFAULT = new getLogoutReasonDictionary([
        { id: 0, title: 'خروج از برنامه' },
        { id: 1, title: 'ویرایش شده' },
        { id: 2, title: 'تغییر گذرواژه' },
        { id: 3, title: 'لاگین همزمان' },
        { id: 4, title: 'غیرفعال شده' }
    ]);
    private constructor(public readonly value: { id: number, title: string }[]) {
    }
}
export class getInvalidLoginReasonDictionary {
    static readonly DEFAULT = new getInvalidLoginReasonDictionary([
        { id: 1, title: 'کاربر غیرمجاز' },
        { id: 2, title: 'گذرواژه نادرست' },
        { id: 3, title: 'مسدودسازی درخواست مکرر' },
        { id: 4, title: 'کاربر غیرفعال' },
        { id: 5, title: 'کاربر قفل شده' },
        { id: 6, title: 'شماره سریال نادرست' }
    ]);
    private constructor(public readonly value: { id: number, title: string }[]) {
    }
}
export class getDeleteDictionary {
    static readonly DEFAULT = new getDeleteDictionary([
        { id: 0, title: 'حذف دائم' },
        { id: 2, title: 'حذف موقت' },
        { id: 3, title: 'حذف موقت' },
        { id: 5, title: 'حذف موقت' }
    ]);
    private constructor(public readonly value: { id: number, title: string }[]) {
    }
}
export class ENHasNextBazdid {
    static readonly DEFAULT = new ENHasNextBazdid(true);
    static readonly ESF = new ENHasNextBazdid(false);
    static readonly TEH = new ENHasNextBazdid(true);
    static readonly TEH_ZONE4 = new ENHasNextBazdid(true);
    static readonly TEH_SE = new ENHasNextBazdid(true);
    static readonly TEH_SE_LOCAL = new ENHasNextBazdid(true);
    static readonly KERMANSHAH = new ENHasNextBazdid(false);
    static readonly REY = new ENHasNextBazdid(false);

    private constructor(public readonly value: boolean) {
    }
}
export class resizableTable {
    static readonly DEFAULT = new resizableTable(false);

    private constructor(public readonly value: boolean) {
    }
}
export class reorderableTable {
    static readonly DEFAULT = new reorderableTable(false);

    private constructor(public readonly value: boolean) {
    }
}
export class defaultAggregateTracks {
    static readonly DEFAULT = new defaultAggregateTracks(true);

    private constructor(public readonly value: boolean) {
    }
}
export class shouldSaveTokensInLocal {
    static readonly DEFAULT = new shouldSaveTokensInLocal(false);

    private constructor(public readonly value: boolean) {
    }
}
export class ENHasCanclableSpinner {
    static readonly DEFAULT = new ENHasCanclableSpinner(true);
    static readonly ESF = new ENHasCanclableSpinner(false);
    static readonly TEH = new ENHasCanclableSpinner(false);
    static readonly TEH_ZONE4 = new ENHasCanclableSpinner(false);
    static readonly TEH_SE = new ENHasCanclableSpinner(false);
    static readonly TEH_SE_LOCAL = new ENHasCanclableSpinner(false);
    static readonly KERMANSHAH = new ENHasCanclableSpinner(false);

    private constructor(public readonly value: boolean) {
    }
}
export class BrowserVersions {
    static readonly DEFAULT = new BrowserVersions({
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
    });

    private constructor(public readonly value: IBrowserVersions) {
    }
}