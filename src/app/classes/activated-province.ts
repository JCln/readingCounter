import { ENActivateProvinceTitle, IENV, IENV_BROWSER_SETUP } from 'interfaces/ioverall-config';

export class ActivatedProvince implements IENV {
    public static readonly DEFAULT = new ActivatedProvince(
        ENActivateProvinceTitle.DEFAULT,
        'https://37.191.92.157/kontoriNew',
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
        'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
        false,
        [32.669, 51.664],
        {
            Desktop: {
                Chrome: { alert: 70, normal: 86 },
                Firefox: { alert: 80, normal: 83 },
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
        }
    );
    public static readonly ESF = new ActivatedProvince(
        ENActivateProvinceTitle.ESF,
        'https://37.191.92.157/kontoriNew',
        'http://172.18.12.242/osm_tiles/{z}/{x}/{y}.png',
        'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
        'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
        false,
        [32.669, 51.664],
        {
            Desktop: {
                Chrome: { alert: 70, normal: 86 },
                Firefox: { alert: 80, normal: 83 },
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
        }
    );
    public static readonly TEH_ZONE4 = new ActivatedProvince(
        ENActivateProvinceTitle.TEH_ZONE4,
        'http://81.12.106.167:8081/kontoriNew',
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
        'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
        true,
        [35.7501, 51.5255],
        {
            Desktop: {
                Chrome: { alert: 70, normal: 86 },
                Firefox: { alert: 80, normal: 83 },
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
        }
    );
    public static readonly TEH_SE = new ActivatedProvince(
        ENActivateProvinceTitle.TEH_SE,
        'http://5.160.85.228:9098/kontoriNew',
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
        'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
        true,
        [35.656051, 51.315435],
        {
            Desktop: {
                Chrome: { alert: 70, normal: 86 },
                Firefox: { alert: 80, normal: 83 },
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
        }
    );
    public static readonly TEH_SE_LOCAL = new ActivatedProvince(
        ENActivateProvinceTitle.TEH_SE,
        'http://172.28.5.40/kontoriNew',
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
        'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
        true,
        [35.656051, 51.315435],
        {
            Desktop: {
                Chrome: { alert: 70, normal: 86 },
                Firefox: { alert: 80, normal: 83 },
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
        }
    );

    private constructor(
        public readonly headerProvinceTitle: ENActivateProvinceTitle,
        public readonly API_URL: string,
        public readonly OSMmapBoxUrl: string,
        public readonly SATELLITEMapBoxUrl: string,
        public readonly SATELLITEMapAccessToken: string,
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
        }
    ) { }

    public getActiveProvince = (provinceName: ENActivateProvinceTitle): any => {
        return ActivatedProvince[provinceName];
    }
}
