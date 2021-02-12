import '../../../node_modules/leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet-easyprint';

import { Injectable } from '@angular/core';
import * as Leaflet from 'leaflet';
import { ListManagerService } from 'src/app/services/list-manager.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: Leaflet.Map;

  constructor(
    private listManagerService: ListManagerService
  ) { }

  addToMapWrapper = (val: any) => {
    Leaflet.control.layers(val).addTo(this.map);
  }
  overlays = (lat: any, lan: any): any => {
    Leaflet.marker([lat, lan]).addTo(this.map);
  }
  // addMarkerCluster = (map: L.Map) => {
  //   const markers = Leaflet.markerClusterGroup();
  //   map.addLayer(markers);
  // }

  removeAllLayers = (window) => {
    this.map.eachLayer(function (layer) {
      this.map.removeLayer(layer);
    }, window)
  }
  onLocationFound = (e) => {
    this.overlays(e._lastCenter.lat, e._lastCenter.lng);
  }
  addInvalidateMap = () => {
    this.map.invalidateSize();
  }
  ///////////
  callPointerMarks = (data: object) => {
    return this.listManagerService.postLMPDXY(data);
  }
  // LeafletPrinter = () => {
  //   Leaflet.easyPrint({
  //     position: 'bottomleft',
  //     sizeModes: ['A4Portrait', 'A4Landscape']
  //   }).addTo(this.map);
  // }

  leafletRefresh = () => {
    Leaflet.easyButton('fa-refresh', function (btn, map) {
      this.addInvalidateMap();
    }, 'بارگیری مجدد نقشه').addTo(this.map);
  }
  leafletMyPosition = () => {
    Leaflet.easyButton('fa-map-marker', function (btn, map) {
      map.locate({ setView: true, maxZoom: 16 })
      map.on('locationfound', this.onLocationFound(map));
    }, 'مکان من').addTo(this.map);
  }

  leafletCloseAllOverlays = () => {
    Leaflet.easyButton('fa-close', function (btn) {
      this.removeAllLayers(window);
    }, 'بستن تمامی لایه ها').addTo(this.map);
  }

}