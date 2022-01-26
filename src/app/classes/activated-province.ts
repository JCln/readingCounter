import {
  BrowserVersions,
  ENActivateProvinceTitle,
  ENHasDarkOSMMap,
  ENHasNextBazdid,
  ENMapCenter,
  ENOSMUrls,
  ENOSMUrlsDark,
  ENSatelliteToken,
  ENSatteliteAccessToken,
  ENURLs,
  IENV,
  IENV_BROWSER_SETUP,
} from 'interfaces/build';

export class ActivatedProvince implements IENV {
    public static readonly DEFAULT = new ActivatedProvince(
        ENActivateProvinceTitle.DEFAULT,
        ENURLs.DEFAULT,
        ENOSMUrls.DEFAULT,
        ENOSMUrlsDark.DEFAULT,
        ENSatteliteAccessToken.DEFAULT,
        ENSatelliteToken.DEFAULT,
        ENHasNextBazdid.DEFAULT.value,
        ENHasDarkOSMMap.DEFAULT.value,
        ENMapCenter.DEFAULT.value,
        BrowserVersions.DEFAULT.value
    );
    public static readonly ESF = new ActivatedProvince(
        ENActivateProvinceTitle.ESF,
        ENURLs.ESF,
        ENOSMUrls.ESF,
        ENOSMUrlsDark.ESF,
        ENSatteliteAccessToken.ESF,
        ENSatelliteToken.ESF,
        ENHasNextBazdid.ESF.value,
        ENHasDarkOSMMap.ESF.value,
        ENMapCenter.ESF.value,
        BrowserVersions.ESF.value
    );
    public static readonly TEH_ZONE4 = new ActivatedProvince(
        ENActivateProvinceTitle.TEH_ZONE4,
        ENURLs.TEH_ZONE4,
        ENOSMUrls.TEH_ZONE4,
        ENOSMUrlsDark.TEH_ZONE4,
        ENSatteliteAccessToken.TEH_ZONE4,
        ENSatelliteToken.TEH_ZONE4,
        ENHasNextBazdid.TEH_ZONE4.value,
        ENHasDarkOSMMap.TEH_ZONE4.value,
        ENMapCenter.TEH_ZONE4.value,
        BrowserVersions.TEH_ZONE4.value
    );
    public static readonly TEH_SE = new ActivatedProvince(
        ENActivateProvinceTitle.TEH_SE,
        ENURLs.TEH_SE,
        ENOSMUrls.TEH_SE,
        ENOSMUrlsDark.TEH_SE,
        ENSatteliteAccessToken.TEH_SE,
        ENSatelliteToken.TEH_SE,
        ENHasNextBazdid.TEH_SE.value,
        ENHasDarkOSMMap.TEH_SE.value,
        ENMapCenter.TEH_SE.value,
        BrowserVersions.TEH_SE.value
    );
    public static readonly TEH_SE_LOCAL = new ActivatedProvince(
        ENActivateProvinceTitle.TEH_SE_LOCAL,
        ENURLs.TEH_SE_LOCAL,
        ENOSMUrls.TEH_SE_LOCAL,
        ENOSMUrlsDark.TEH_SE_LOCAL,
        ENSatteliteAccessToken.TEH_SE_LOCAL,
        ENSatelliteToken.TEH_SE_LOCAL,
        ENHasNextBazdid.TEH_SE_LOCAL.value,
        ENHasDarkOSMMap.TEH_SE_LOCAL.value,
        ENMapCenter.TEH_SE_LOCAL.value,
        BrowserVersions.TEH_SE_LOCAL.value
    );
    public static readonly KERMANSHAH = new ActivatedProvince(
        ENActivateProvinceTitle.KERMANSHAH,
        ENURLs.KERMANSHAH,
        ENOSMUrls.KERMANSHAH,
        ENOSMUrlsDark.KERMANSHAH,
        ENSatteliteAccessToken.KERMANSHAH,
        ENSatelliteToken.KERMANSHAH,
        ENHasNextBazdid.KERMANSHAH.value,
        ENHasDarkOSMMap.KERMANSHAH.value,
        ENMapCenter.KERMANSHAH.value,
        BrowserVersions.KERMANSHAH.value
    );

    private constructor(
        public readonly headerProvinceTitle: ENActivateProvinceTitle,
        public readonly API_URL: string,
        public readonly OSMmapBoxUrl: string,
        public readonly OSMDarkmapBoxUrl: string,
        public readonly SATELLITEMapBoxUrl: string,
        public readonly SATELLITEMapAccessToken: string,
        public readonly hasNextBazdid: boolean,
        public readonly hasDarkOSMMap: boolean,
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
        }
    ) { }

    public getActiveProvince = (provinceName: ENActivateProvinceTitle): any => {
        return ActivatedProvince[provinceName];
    }
}
