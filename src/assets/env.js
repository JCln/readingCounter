(function (window) {
    window.__env = window.__env || {};

    // API url
    window.__env.headerProvinceTitle = '';
    window.__env.API_URL = 'https://37.191.92.157/kontoriNew';
    window.__env.OSMmapBoxUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    window.__env.SATELLITEMapBoxUrl = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=';
    window.__env.SATELLITEMapAccessToken = 'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg';
    window.__hasNextBazdid = 'false';
    window.__mapCenter = [32.669, 51.664];
    window.__browserVersions = {
        Desktop: {
            Chrome: { alert: 83, normal: 86 },
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
    };

    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;
    window.__env.enableENV = false;
}(this));
