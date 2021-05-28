(function (window) {
    window.__env = window.__env || {};

    // API url
    window.__env.headerProvinceTitle = '';
    window.__env.API_URL = 'https://37.191.92.157/kontoriNew';
    window.__env.OSMmapBoxUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    window.__env.SATELLITEMapBoxUrl = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=';
    window.__env.SATELLITEMapAccessToken = 'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg';

    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;
    window.__env.enableENV = false;
}(this));
