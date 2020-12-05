import '../../../node_modules/leaflet.markercluster/dist/leaflet.markercluster.js';

import { Injectable } from '@angular/core';

declare let L;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map;
  
  constructor() { }

  private overlays = (lat: any, lan: any, map: L.Map): any => {
    L.marker([lat, lan]).addTo(map);
  }

  addMarkerCluster = (map: L.Map) => {
    const markers = L.markerClusterGroup();
    map.addLayer(markers);
  }

  fullScreen = (map: L.Map) => {
    map.addControl(new L.Control.Fullscreen());
  }
  removeAllLayers = (map, window) => {
    map.eachLayer(function (layer) {
      map.removeLayer(layer);
    }, window)
  }
  ///////// buttons
  buttons = (map: L.Map) => {
    const onLocationFound = (e) => {
      this.overlays(e._lastCenter.lat, e._lastCenter.lng, map);
    }

    const addInvalidateMap = (map: L.Map) => {
      map.invalidateSize();
    }
    L.easyPrint({
      position: 'bottomleft',
      sizeModes: ['A4Portrait', 'A4Landscape']
    }).addTo(map);

    L.easyButton('fa-refresh', function (btn, map) {
      addInvalidateMap;
    }, 'بارگزاری مجدد نقشه').addTo(map);

    L.easyButton('fa-map-marker', function (btn, map) {
      map.locate({ setView: true, maxZoom: 16 })
      map.on('locationfound', onLocationFound(map));
    }, 'مکان من').addTo(map);

    L.easyButton('fa-close', function (btn) {
      this.removeAllLayers(map, window);
    }, 'بستن تمامی لایه ها').addTo(map);

  }
  ///////////
}