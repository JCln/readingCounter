export class EnvService {

  // The values that are defined here are the default values that can
  // be overridden by env.js

  // API url
  public API_URL = 'https://37.191.92.157/kontoriNew';
  public OSMmapBoxUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  public SATELLITEMapBoxUrl: 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token='
  public SATELLITEMapAccessToken: 'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg'

  // Whether or not to enable debug mode
  public enableDebug = true;

}
