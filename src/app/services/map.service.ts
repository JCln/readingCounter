import { InterfaceManagerService } from 'services/interface-manager.service';
import '../../../node_modules/leaflet.markercluster/dist/leaflet.markercluster.js';

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENLocalStorageNames, ENRandomNumbers } from 'interfaces/ioverall-config';
import { BrowserStorageService } from 'services/browser-storage.service';
import { EnvService } from 'services/env.service';

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

  constructor(
    private browserStorageService: BrowserStorageService,
    private _location: Location,
    private interfaceManagerService: InterfaceManagerService,
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
  backToPreviousPage = () => {
    this._location.back();
  }
  validateGISAccuracy = (temp: any[]): boolean => {
    let bol: boolean = false;
    temp.find(item => {
      return bol = parseInt(item.gisAccuracy) > 0 ? true : false
    })

    return bol;
  }
  postDataSource = (method: ENInterfaces, val: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(method, val).toPromise().then((res) => {
        resolve(res)
      })
    });
  }
  postById = (method: ENInterfaces, id?: number): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTById(method, id).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  getPointerMarks = (a: object): Promise<any> => {
    return this.postDataSource(ENInterfaces.ListPerDayXY, a);
  }
  getXY = (a: string): Promise<any> => {
    return this.postById(ENInterfaces.ListXY, parseInt(a));
  }
}
