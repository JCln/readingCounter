import { IENV } from 'interfaces/build';

import { ActivatedProvince } from '../classes/activated-province';

export class EnvService implements IENV {

  temp = ActivatedProvince.RDPServer;

  headerProvinceTitle = this.temp.headerProvinceTitle;
  API_URL = this.temp.API_URL;
  mapUrls = this.temp.mapUrls;
  hasNextBazdid = this.temp.hasNextBazdid;
  mapCenter = this.temp.mapCenter;
  browserVersions = this.temp.browserVersions;
  years = this.temp.years;
  getDeleteDictionary = this.temp.getDeleteDictionary;
  hasCancelableSpinner = this.temp.hasCancelableSpinner;
  timeout = this.temp.timeout;
  reOrderableTable = this.temp.reOrderableTable;
  defaultAggregateTracks = this.temp.defaultAggregateTracks;
  simafaImportStatus = this.temp.simafaImportStatus;
  version = this.temp.version;
  aboutUs = this.temp.aboutUs;
  NotificationAlertTypesList = this.temp.NotificationAlertTypesList;
  NotificationMediaTypeList = this.temp.NotificationMediaTypeList;
  NotificationMediaTypeIds = this.temp.NotificationMediaTypeIds;
  NotificationAlertTypesIds = this.temp.NotificationAlertTypesIds;
  getLogoutReasonDictionary = this.temp.getLogoutReasonDictionary;
  getInvalidLoginReasonDictionary = this.temp.getInvalidLoginReasonDictionary;
  shouldSaveTokensInLocal = this.temp.shouldSaveTokensInLocal;
  getMasrafStateDictionary = this.temp.getMasrafStateDictionary;
  getHighLowStateId = this.temp.getHighLowStateId;
  getTarrifCalculationModeDictionary = this.temp.getTarrifCalculationModeDictionary;
  getRequestDraftIds = this.temp.getRequestDraftIds;
  getOfferingIds = this.temp.getOfferingIds;
  getTarrifInsertModeDictionary = this.temp.getTarrifInsertModeDictionary;
  isAfta = this.temp.isAfta;

  // Whether or not to enable debug mode
  public enableDebug = true;

}
