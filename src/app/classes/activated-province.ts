import {
  BrowserVersions,
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
  timeout,
} from 'interfaces/build';

export class ActivatedProvince implements IENV {
    public static readonly DEFAULT = new ActivatedProvince(
        ENActivateProvinceTitle.DEFAULT,
        ENURLs.DEFAULT,
        ENMapUrls.DEFAULT.value,
        ENHasNextBazdid.DEFAULT.value,
        ENMapCenter.DEFAULT.value,
        BrowserVersions.DEFAULT.value,
        ENYears.DEFAULT.value,
        getDeleteDictionary.DEFAULT.value,
        ENHasCanclableSpinner.DEFAULT.value,
        timeout.time
    );
    public static readonly ESF = new ActivatedProvince(
        ENActivateProvinceTitle.ESF,
        ENURLs.ESF,
        ENMapUrls.ESF.value,
        ENHasNextBazdid.ESF.value,
        ENMapCenter.ESF.value,
        BrowserVersions.ESF.value,
        ENYears.ESF.value,
        getDeleteDictionary.DEFAULT.value,
        ENHasCanclableSpinner.DEFAULT.value,
        timeout.time
    );
    public static readonly TEH_ZONE4 = new ActivatedProvince(
        ENActivateProvinceTitle.TEH_ZONE4,
        ENURLs.TEH_ZONE4,
        ENMapUrls.TEH_ZONE4.value,
        ENHasNextBazdid.TEH_ZONE4.value,
        ENMapCenter.TEH_ZONE4.value,
        BrowserVersions.TEH_ZONE4.value,
        ENYears.TEH_ZONE4.value,
        getDeleteDictionary.DEFAULT.value,
        ENHasCanclableSpinner.DEFAULT.value,
        timeout.time
    );
    public static readonly TEH_SE = new ActivatedProvince(
        ENActivateProvinceTitle.TEH_SE,
        ENURLs.TEH_SE,
        ENMapUrls.TEH_SE.value,
        ENHasNextBazdid.TEH_SE.value,
        ENMapCenter.TEH_SE.value,
        BrowserVersions.TEH_SE.value,
        ENYears.TEH_SE.value,
        getDeleteDictionary.DEFAULT.value,
        ENHasCanclableSpinner.DEFAULT.value,
        timeout.time
    );
    public static readonly TEH_SE_LOCAL = new ActivatedProvince(
        ENActivateProvinceTitle.TEH_SE_LOCAL,
        ENURLs.TEH_SE_LOCAL,
        ENMapUrls.TEH_SE_LOCAL.value,
        ENHasNextBazdid.TEH_SE_LOCAL.value,
        ENMapCenter.TEH_SE_LOCAL.value,
        BrowserVersions.TEH_SE_LOCAL.value,
        ENYears.TEH_SE_LOCAL.value,
        getDeleteDictionary.DEFAULT.value,
        ENHasCanclableSpinner.DEFAULT.value,
        timeout.time
    );
    public static readonly KERMANSHAH = new ActivatedProvince(
        ENActivateProvinceTitle.KERMANSHAH,
        ENURLs.KERMANSHAH,
        ENMapUrls.KERMANSHAH.value,
        ENHasNextBazdid.KERMANSHAH.value,
        ENMapCenter.KERMANSHAH.value,
        BrowserVersions.KERMANSHAH.value,
        ENYears.KERMANSHAH.value,
        getDeleteDictionary.DEFAULT.value,
        ENHasCanclableSpinner.DEFAULT.value,
        timeout.time
    );

    private constructor(
        public readonly headerProvinceTitle: ENActivateProvinceTitle,
        public readonly API_URL: string,
        public readonly mapUrls: { title: string, url: string }[],
        public readonly hasNextBazdid: boolean,
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
        public timeout: number,
    ) { }

    public getActiveProvince = (provinceName: ENActivateProvinceTitle): any => {
        return ActivatedProvince[provinceName];
    }
}
