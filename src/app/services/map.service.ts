import '../../../node_modules/leaflet.markercluster/dist/leaflet.markercluster.js';

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENLocalStorageNames } from 'interfaces/ioverall-config';
import { BrowserStorageService } from 'services/browser-storage.service';
import { EnvService } from 'services/env.service';
import { ListManagerService } from 'services/list-manager.service';

import { ENRandomNumbers } from './../Interfaces/ioverall-config';
import { map } from './DI/map';

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

  streets = L.tileLayer(this.envService.OSMmapBoxUrl);
  streetsDark = L.tileLayer(this.envService.OSMDarkmapBoxUrl);
  satellite = L.tileLayer(this.envService.SATELLITEMapBoxUrl + this.envService.SATELLITEMapAccessToken);

  constructor(
    private listManagerService: ListManagerService,
    private browserStorageService: BrowserStorageService,
    private _location: Location,
    private envService: EnvService
  ) { }

  getMapItems = () => {
    return map;
  }
  getBaseMap = (): object => {
    if (this.canUseMultiMapColors()) {
      return this.getDarkUrls();
    }
    else {
      return this.getLightUrls();
    }
  }
  private lastSelectedMapColor = (): boolean => {
    if (this.canUseMultiMapColors()) {
      return this.getFromLocalMapColorMode();
    }
    return false;
  }
  initMapColor = (): any => {
    if (this.lastSelectedMapColor()) {
      return this.getDarkStreetsUrl();
    }
    return this.getLightStreetsUrl();
  }

  getDarkStreetsUrl = (): any => {
    return L.tileLayer(this.envService.OSMDarkmapBoxUrl);
  }
  getLightStreetsUrl = (): any => {
    return L.tileLayer(this.envService.OSMmapBoxUrl);
  }
  getDarkUrls = (): object => {
    return {
      "OSMDark": this.streetsDark,
      "OSM": this.streets,
      "Satellite": this.satellite,
    }
  }
  getLightUrls = (): object => {
    return {
      "OSM": this.streets,
      "Satellite": this.satellite,
    }
  }
  canUseMultiMapColors = (): boolean => {
    if (this.envService.hasDarkOSMMap) {
      return true;
    }
    return false;
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
  getFromLocalMapColorMode = (): boolean => {
    const a = this.browserStorageService.get(ENLocalStorageNames.isDarkModeMap);
    if (a === null || a === 'undefined') {
      this.saveToLocalStorage(ENLocalStorageNames.isDarkModeMap, false);
      return false;
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
  backToPreviousPage = () => {
    this._location.back();
  }
  getPointerMarks = (a: object): Promise<any> => {
    return this.listManagerService.postBodyDataSource(ENInterfaces.ListPerDayXY, a);
  }
  getXY = (a: string): Promise<any> => {
    return this.listManagerService.postById(ENInterfaces.ListXY, parseInt(a));
  }
  validateGISAccuracy = (temp: any[]): boolean => {
    let bol: boolean = false;
    temp.find(item => {
      return bol = parseInt(item.gisAccuracy) > 0 ? true : false
    })

    return bol;
  }
}
