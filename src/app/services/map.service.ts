import '../../../node_modules/leaflet.markercluster/dist/leaflet.markercluster.js';

import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENLocalStorageNames, ENRandomNumbers } from 'interfaces/ioverall-config';
import { Injectable } from '@angular/core';
import { BrowserStorageService } from 'services/browser-storage.service';
import { EnvService } from 'services/env.service';
import { AjaxReqWrapperService } from './ajax-req-wrapper.service.js';

declare let L;

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

const defaultIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})
L.Marker.prototype.options.icon = defaultIcon;
@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: L.Map;
  public gisReqAux = {
    zoneId: null,
    isCounterState: false,
    counterStateId: null,
    isKarbariChange: false,
    isAhadChange: false,
    isForbidden: false,
    readingPeriodId: null,
    year: null,
    fromDate: '',
    toDate: '',
    fragmentMasterIds: []
  };
  public responseGisAux = {
    value: null
  }

  constructor(
    public browserStorageService: BrowserStorageService,
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public envService: EnvService
  ) { }

  getFirstItemUrl = (): any => {
    return L.tileLayer(this.envService.mapUrls[0].url);
  }
  getLightUrls = (): object => {
    return (this.getMapUrls().reduce((obj, item) => (obj[item.title] = L.tileLayer(item.url), obj), {}));
  }
  getMapUrls = (): any[] => {
    return this.envService.mapUrls;
  }
  getBaseMap = (): object => {
    return this.getLightUrls();
  }
  addMarkerCluster = (map: L.Map, latlng: any) => {
    const markers = L.markerClusterGroup();
    markers.addLayer(L.marker(latlng));
    map.addLayer(markers);
  }
  addInvalidateMap = () => {
    this.map.invalidateSize();
  }
  fullScreen = () => {
    this.map.addControl(new L.Control.Fullscreen());
  }
  refreshMapButtonLeaflet = () => {
    L.easyButton('fa-refresh', () => {
      this.addInvalidateMap();
    }, 'بارگزاری مجدد نقشه').addTo(this.map);
  }
  saveToLocalStorage = (localStorageName: ENLocalStorageNames, numberLen: any) => {
    this.browserStorageService.set(localStorageName, numberLen);
  }
  isAnimationExistsInLocal = (): boolean => {
    return this.browserStorageService.isExists(ENLocalStorageNames.mapAnimationStartFrom);
  }
  getFromLocalStorage = (): ENRandomNumbers => {
    const a = this.browserStorageService.get(ENLocalStorageNames.mapAnimationStartFrom);
    if (a === null || a === 'undefined') {
      this.saveToLocalStorage(ENLocalStorageNames.mapAnimationStartFrom, ENRandomNumbers.twoHundred);
      return ENRandomNumbers.twoHundred;
    }
    return a;
  }
  easyprintButtonLeaflet = () => {
    L.easyPrint({
      position: 'bottomleft',
      sizeModes: ['A4Portrait', 'A4Landscape']
    }).addTo(this.map);
  }
  addButtonsToLeaflet = () => {
    this.fullScreen();
    this.refreshMapButtonLeaflet();
    this.easyprintButtonLeaflet();
  }
  serviceInstantiate = (map: L.Map) => {
    this.map = map;
  }
  validateGISAccuracy = (temp: any[]): boolean => {
    let bol: boolean = false;
    temp.find(item => {
      return bol = parseInt(item.gisAccuracy) > 0 ? true : false
    })

    return bol;
  }
  postDataSourceGisSpecial = async (method: ENInterfaces, val: any): Promise<any> => {
    if (
      this.responseGisAux.value &&
      this.gisReqAux.zoneId == val.zoneId &&
      this.gisReqAux.counterStateId == val.counterStateId &&
      this.gisReqAux.fromDate == val.fromDate &&
      this.gisReqAux.toDate == val.toDate &&
      this.gisReqAux.isKarbariChange == val.isKarbariChange &&
      this.gisReqAux.isForbidden == val.isForbidden &&
      this.gisReqAux.isAhadChange == val.isAhadChange
    ) {
      return this.responseGisAux.value;
    }
    const res = await this.ajaxReqWrapperService.postDataSourceByObject(method, val);
    this.responseGisAux.value = res;
    return res;
  }
  getPointerMarks = (a: object): Promise<any> => {
    return this.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ListPerDayXY, a);
  }
  getXY = (a: string): Promise<any> => {
    return this.ajaxReqWrapperService.postDataSourceById(ENInterfaces.ListXY, parseInt(a));
  }
}
