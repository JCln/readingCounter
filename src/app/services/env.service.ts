import { IENV } from 'interfaces/build';

import { ActivatedProvince } from '../classes/activated-province';

export class EnvService implements IENV {

  temp = ActivatedProvince.REY;

  headerProvinceTitle = this.temp.headerProvinceTitle;
  API_URL = this.temp.API_URL;
  mapUrls = this.temp.mapUrls;
  hasNextBazdid = this.temp.hasNextBazdid;
  mapCenter = this.temp.mapCenter;
  browserVersions = this.temp.browserVersions;
  years = this.temp.years;
  getDeleteDictionary = this.temp.getDeleteDictionary;
  hasCanclableSpinner = this.temp.hasCanclableSpinner;
  timeout = this.temp.timeout;
  reOrderableTable = this.temp.reOrderableTable;
  defaultAggregateTracks = this.temp.defaultAggregateTracks;
  simafaImportStatus = this.temp.simafaImportStatus;
  version = this.temp.version;
  aboutUs = this.temp.aboutUs;

  // Whether or not to enable debug mode
  public enableDebug = true;

}
