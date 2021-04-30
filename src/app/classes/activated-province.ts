import { ENActivateProvinceTitle } from '../Interfaces/ioverall-config';

export class ActivatedProvince {
    public static readonly DEFAULT = new ActivatedProvince(
        ENActivateProvinceTitle.DEFAULT,
        'https://37.191.92.157/kontoriNew',
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
        'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg'
    );
    public static readonly ESF = new ActivatedProvince(
        ENActivateProvinceTitle.ESF,
        'https://37.191.92.157/kontoriNew',
        'http://172.18.12.242/osm_tiles/{z}/{x}/{y}.png',
        'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
        'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg'
    );
    public static readonly TEH = new ActivatedProvince(
        ENActivateProvinceTitle.TEH,
        'https://37.191.92.157/kontoriNew',
        'https://{s}.tile.openstreetmap11.org/{z}/{x}/{y}.png',
        'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
        'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg'
    );

    private constructor(
        public readonly headerProvinceTitle: ENActivateProvinceTitle,
        public readonly API_URL: string,
        public readonly OSMmapBoxUrl: string,
        public readonly SATELLITEMapBoxUrl: string,
        public readonly SATELLITEMapAccessToken: string,

    ) { }

    public getActiveProvince = (provinceName: ENActivateProvinceTitle): any => {
        return ActivatedProvince[provinceName];
    }
}
