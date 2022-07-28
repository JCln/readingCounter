import { IENV } from 'interfaces/build';

import { ActivatedProvince } from '../classes/activated-province';

export class EnvService implements IENV {

  temp = ActivatedProvince.DEFAULT;

  headerProvinceTitle = this.temp.headerProvinceTitle;
  API_URL = this.temp.API_URL;
  OSMmapBoxUrl = this.temp.OSMmapBoxUrl;
  mapUrls = this.temp.mapUrls;
  hasNextBazdid = this.temp.hasNextBazdid;
  mapCenter = this.temp.mapCenter;
  browserVersions = this.temp.browserVersions;
  years = this.temp.years;
  getDeleteDictionary = this.temp.getDeleteDictionary;

  // Whether or not to enable debug mode
  public enableDebug = true;

}
