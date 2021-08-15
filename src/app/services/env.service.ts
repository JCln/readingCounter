import { IENV } from 'interfaces/ioverall-config';

import { ActivatedProvince } from '../classes/activated-province';

export class EnvService implements IENV {

  temp = ActivatedProvince.DEFAULT;

  headerProvinceTitle = this.temp.headerProvinceTitle;
  API_URL = this.temp.API_URL;
  OSMmapBoxUrl = this.temp.OSMmapBoxUrl;
  SATELLITEMapBoxUrl = this.temp.SATELLITEMapBoxUrl;
  SATELLITEMapAccessToken = this.temp.SATELLITEMapAccessToken;
  hasNextBazdid = this.temp.hasNextBazdid;
  mapCenter = this.temp.mapCenter;

  // Whether or not to enable debug mode
  public enableDebug = true;

}
