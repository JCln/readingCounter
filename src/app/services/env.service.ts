import { ActivatedProvince } from '../classes/activated-province';

export class EnvService {
  temp = ActivatedProvince.TEH;

  headerProvinceTitle = this.temp.headerProvinceTitle;
  API_URL = this.temp.API_URL;
  OSMmapBoxUrl = this.temp.OSMmapBoxUrl;
  SATELLITEMapBoxUrl = this.temp.SATELLITEMapBoxUrl;
  SATELLITEMapAccessToken = this.temp.SATELLITEMapAccessToken;


  // API url          

  // Whether or not to enable debug mode
  public enableDebug = true;

}
