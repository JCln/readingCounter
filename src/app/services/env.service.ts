import { IENV } from 'interfaces/build';

import { ActivatedProvince } from '../classes/activated-province';

export class EnvService implements IENV {

  temp = ActivatedProvince.DEFAULT;
  headerProvinceTitle = this.temp.headerProvinceTitle;
  API_URL = this.temp.API_URL;
  OSMmapBoxUrl = this.temp.OSMmapBoxUrl;
  OSMDarkmapBoxUrl = this.temp.OSMDarkmapBoxUrl;
  SATELLITEMapBoxUrl = this.temp.SATELLITEMapBoxUrl;
  SATELLITEMapAccessToken = this.temp.SATELLITEMapAccessToken;
  hasNextBazdid = this.temp.hasNextBazdid;
  mapCenter = this.temp.mapCenter;
  browserVersions = this.temp.browserVersions;
  hasDarkOSMMap = this.temp.hasDarkOSMMap;

  // Whether or not to enable debug mode
  public enableDebug = true;

}
