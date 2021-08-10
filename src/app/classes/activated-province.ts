import { ENActivateProvinceTitle, IENV } from 'interfaces/ioverall-config';

export class ActivatedProvince implements IENV {
    public static readonly DEFAULT = new ActivatedProvince(
        ENActivateProvinceTitle.DEFAULT,
        'https://37.191.92.157/kontoriNew',
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
        'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
        false
    );
    public static readonly ESF = new ActivatedProvince(
        ENActivateProvinceTitle.ESF,
        'https://37.191.92.157/kontoriNew',
        'http://172.18.12.242/osm_tiles/{z}/{x}/{y}.png',
        'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
        'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
        false
    );   
    public static readonly ZONE4 = new ActivatedProvince(
        ENActivateProvinceTitle.ZONE4,
        'http://81.12.106.167:8081/kontoriNew',
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
        'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
        true
    );
    public static readonly TEH_SE = new ActivatedProvince(
        ENActivateProvinceTitle.TEH_SE,
        'http://5.160.85.228:9098/kontoriNew',
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
        'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
        true
    );

    private constructor(
        public readonly headerProvinceTitle: ENActivateProvinceTitle,
        public readonly API_URL: string,
        public readonly OSMmapBoxUrl: string,
        public readonly SATELLITEMapBoxUrl: string,
        public readonly SATELLITEMapAccessToken: string,
        public readonly hasNextBazdid: boolean,
    ) { }

    public getActiveProvince = (provinceName: ENActivateProvinceTitle): any => {
        return ActivatedProvince[provinceName];
    }
}
