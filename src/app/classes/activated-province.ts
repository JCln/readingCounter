import {
    BrowserVersions,
    defaultAggregateTracks,
    ENActivateProvinceTitle,
    ENHasCanclableSpinner,
    ENHasNextBazdid,
    ENMapCenter,
    ENMapUrls,
    ENURLs,
    ENYears,
    getDeleteDictionary,
    IENV,
    IENV_BROWSER_SETUP,
    reorderableTable,
    simafaImportStatus,
    timeout,
} from 'interfaces/build';

import { version } from '../interfaces/build';

export class ActivatedProvince implements IENV {
    public static readonly DEFAULT = new ActivatedProvince(
        ENActivateProvinceTitle.DEFAULT,
        ENURLs.DEFAULT,
        ENMapUrls.DEFAULT.value,
        ENHasNextBazdid.DEFAULT.value,
        reorderableTable.DEFAULT.value,
        defaultAggregateTracks.DEFAULT.value,
        ENMapCenter.DEFAULT.value,
        BrowserVersions.DEFAULT.value,
        ENYears.DEFAULT.value,
        getDeleteDictionary.DEFAULT.value,
        ENHasCanclableSpinner.DEFAULT.value,
        simafaImportStatus.simafaImportStatus,
        timeout.time,
        version.version
    );
    public static readonly ESF = new ActivatedProvince(
        ENActivateProvinceTitle.ESF,
        ENURLs.ESF,
        ENMapUrls.ESF.value,
        ENHasNextBazdid.ESF.value,
        reorderableTable.DEFAULT.value,
        defaultAggregateTracks.DEFAULT.value,
        ENMapCenter.ESF.value,
        BrowserVersions.DEFAULT.value,
        ENYears.DEFAULT.value,
        getDeleteDictionary.DEFAULT.value,
        ENHasCanclableSpinner.DEFAULT.value,
        simafaImportStatus.simafaImportStatus,
        timeout.time,
        version.version
    );
    public static readonly TEH_ZONE4 = new ActivatedProvince(
        ENActivateProvinceTitle.TEH_ZONE4,
        ENURLs.TEH_ZONE4,
        ENMapUrls.TEH_ZONE4.value,
        ENHasNextBazdid.TEH_ZONE4.value,
        reorderableTable.DEFAULT.value,
        defaultAggregateTracks.DEFAULT.value,
        ENMapCenter.TEH_ZONE4.value,
        BrowserVersions.DEFAULT.value,
        ENYears.DEFAULT.value,
        getDeleteDictionary.DEFAULT.value,
        ENHasCanclableSpinner.DEFAULT.value,
        simafaImportStatus.simafaImportStatus,
        timeout.time,
        version.version
    );
    public static readonly TEH_SE = new ActivatedProvince(
        ENActivateProvinceTitle.TEH_SE,
        ENURLs.TEH_SE,
        ENMapUrls.TEH_SE.value,
        ENHasNextBazdid.TEH_SE.value,
        reorderableTable.DEFAULT.value,
        defaultAggregateTracks.DEFAULT.value,
        ENMapCenter.TEH_SE.value,
        BrowserVersions.DEFAULT.value,
        ENYears.DEFAULT.value,
        getDeleteDictionary.DEFAULT.value,
        ENHasCanclableSpinner.DEFAULT.value,
        simafaImportStatus.simafaImportStatus,
        timeout.time,
        version.version
    );
    public static readonly TEH_SE_LOCAL = new ActivatedProvince(
        ENActivateProvinceTitle.TEH_SE_LOCAL,
        ENURLs.TEH_SE_LOCAL,
        ENMapUrls.TEH_SE_LOCAL.value,
        ENHasNextBazdid.TEH_SE_LOCAL.value,
        reorderableTable.DEFAULT.value,
        defaultAggregateTracks.DEFAULT.value,
        ENMapCenter.TEH_SE_LOCAL.value,
        BrowserVersions.DEFAULT.value,
        ENYears.DEFAULT.value,
        getDeleteDictionary.DEFAULT.value,
        ENHasCanclableSpinner.DEFAULT.value,
        simafaImportStatus.simafaImportStatus,
        timeout.time,
        version.version
    );
    public static readonly KERMANSHAH = new ActivatedProvince(
        ENActivateProvinceTitle.KERMANSHAH,
        ENURLs.KERMANSHAH,
        ENMapUrls.KERMANSHAH.value,
        ENHasNextBazdid.KERMANSHAH.value,
        reorderableTable.DEFAULT.value,
        defaultAggregateTracks.DEFAULT.value,
        ENMapCenter.KERMANSHAH.value,
        BrowserVersions.DEFAULT.value,
        ENYears.DEFAULT.value,
        getDeleteDictionary.DEFAULT.value,
        ENHasCanclableSpinner.DEFAULT.value,
        simafaImportStatus.simafaImportStatus,
        timeout.time,
        version.version
    );
    // ZONE 6 TEHRAN
    public static readonly REY = new ActivatedProvince(
        ENActivateProvinceTitle.REY,
        ENURLs.REY,
        ENMapUrls.REY.value,
        ENHasNextBazdid.REY.value,
        reorderableTable.DEFAULT.value,
        defaultAggregateTracks.DEFAULT.value,
        ENMapCenter.REY.value,
        BrowserVersions.DEFAULT.value,
        ENYears.DEFAULT.value,
        getDeleteDictionary.DEFAULT.value,
        ENHasCanclableSpinner.DEFAULT.value,
        simafaImportStatus.simafaImportStatus,
        timeout.time,
        version.version
    );
    public static readonly TSW = new ActivatedProvince(
        ENActivateProvinceTitle.TSW,
        ENURLs.TSW,
        ENMapUrls.REY.value,
        ENHasNextBazdid.REY.value,
        reorderableTable.DEFAULT.value,
        defaultAggregateTracks.DEFAULT.value,
        ENMapCenter.TSW.value,
        BrowserVersions.DEFAULT.value,
        ENYears.DEFAULT.value,
        getDeleteDictionary.DEFAULT.value,
        ENHasCanclableSpinner.DEFAULT.value,
        simafaImportStatus.simafaImportStatus,
        timeout.time,
        version.version
    );
    public static readonly TEH1 = new ActivatedProvince(
        ENActivateProvinceTitle.TEH1,
        ENURLs.TEH1,
        ENMapUrls.DEFAULT.value,
        ENHasNextBazdid.DEFAULT.value,
        reorderableTable.DEFAULT.value,
        defaultAggregateTracks.DEFAULT.value,
        ENMapCenter.DEFAULT.value,
        BrowserVersions.DEFAULT.value,
        ENYears.DEFAULT.value,
        getDeleteDictionary.DEFAULT.value,
        ENHasCanclableSpinner.DEFAULT.value,
        simafaImportStatus.simafaImportStatus,
        timeout.time,
        version.version
    );

    private constructor(
        public readonly headerProvinceTitle: ENActivateProvinceTitle,
        public readonly API_URL: string,
        public readonly mapUrls: { title: string, url: string }[],
        public readonly hasNextBazdid: boolean,
        public readonly reOrderableTable: boolean,
        public readonly defaultAggregateTracks: boolean,
        public readonly mapCenter: [number, number],
        public readonly browserVersions: {
            Desktop: {
                Chrome: IENV_BROWSER_SETUP,
                Firefox: IENV_BROWSER_SETUP,
                IE: IENV_BROWSER_SETUP,
                opera: IENV_BROWSER_SETUP,
                safari: IENV_BROWSER_SETUP,
            },
            Touch: {
                Chrome: IENV_BROWSER_SETUP,
                Firefox: IENV_BROWSER_SETUP,
                IE: IENV_BROWSER_SETUP,
                opera: IENV_BROWSER_SETUP,
                safari: IENV_BROWSER_SETUP,
            }
        },
        public readonly years: { title: string, value: number }[],
        public readonly getDeleteDictionary: { id: number, title: string }[],
        public readonly hasCanclableSpinner: boolean,
        public simafaImportStatus: { hasSingle: boolean, hasBatch: boolean },
        public timeout: number,
        public version: string,
    ) { }

    public getActiveProvince = (provinceName: ENActivateProvinceTitle): any => {
        return ActivatedProvince[provinceName];
    }
}
