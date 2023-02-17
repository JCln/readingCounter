(function (window) {
    window.__env = window.__env || {};

    // API url
    window.__env.headerProvinceTitle = 'test';
    window.__env.API_URL = 'https://37.191.92.157/kontoriNew';
    // for map instantiation    
    window.__env.mapUrls = [
        { title: 'sattelite', url: 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg' },
        { title: 'OSM', url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' },
        { title: 'OSM_ESF_local', url: 'http://172.18.12.242/osm_tiles/{z}/{x}/{y}.png' },
    ];
    window.__env.hasNextBazdid = false;
    window.__env.mapCenter = [32.669, 51.664];
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
        { id: 0, title: 'Z' },
        { id: 2, title: 'TW' },
        { id: 5, title: 'F' }
    ];
    window.__env.hasCanclableSpinner = false;
    window.__env.timeout = 18000;
    window.__env.reSizableTable = false;
    window.__env.reOrderableTable = false;
    window.__env.defaultAggregateTracks = false;
    window.__env.version = '1.0.0';
    
    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;
    window.__env.enableENV = false;
}(this));
