import '../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import '../../../node_modules/leaflet.markercluster/dist/leaflet.markercluster.js';

import { Injectable } from '@angular/core';

declare let L;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor() { }

  private overlays = () => {
    const littleton =
      L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
      denver = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
      aurora = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
      golden = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

    const cities = L.layerGroup([littleton, denver, aurora, golden]);
  }

  getRandomLatLng(map) {
    const bounds = map.getBounds(),
      southWest = bounds.getSouthWest(),
      northEast = bounds.getNorthEast(),
      lngSpan = northEast.lng - southWest.lng,
      latSpan = northEast.lat - southWest.lat;
    return new L.LatLng(
      southWest.lat + latSpan * Math.random(),
      southWest.lng + lngSpan * Math.random());
  }
  addMarkerCluster = (map: L.Map) => {
    const markers = L.markerClusterGroup();
    markers.addLayer(L.marker(this.getRandomLatLng(map)));
    map.addLayer(markers);
  }

  routingControl = (map: L.Map) => {
    L.Routing.control({
      waypoints: [
        L.latLng(57.74, 11.94),
        L.latLng(57.6792, 11.949),
      ]
    }).addTo(map);
  }

  fullScreen = (map: L.Map) => {
    map.addControl(new L.Control.Fullscreen());
  }


  ///////// buttons
  buttons = (map: L.Map) => {
    const onLocationFound = (e) => {
      console.log(e);
      var radius = e.accuracy;

      L.circle([e.latlng, 1000], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 1000
      }).addTo(map);


      L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();
    }

    const addInvalidateMap = (map: L.Map) => {
      map.invalidateSize();
    }
    const removeAllLayers = (map, window) => {
      map.eachLayer(function (layer) {
        map.removeLayer(layer);
      }, window)
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
      removeAllLayers(map, window);
    }, 'بستن تمامی لایه ها').addTo(map);

  }
  ///////////
}