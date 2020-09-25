import '../../../node_modules/leaflet.fullscreen/Control.FullScreen.js';
import 'leaflet-draw';

import { Injectable } from '@angular/core';
import * as L from 'leaflet';

import { Imap } from './../Interfaces/imap';
import { MapItemsService } from './DI/map-items.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private readonly mapItems: Imap[];

  constructor(private readonly mapItemsService: MapItemsService) {
    this.mapItems = mapItemsService.getMapItems();
  }


  initMap(): void {
    const
      satellite = L.tileLayer(
        this.mapItems[1].style + this.mapItems[1].accessToken, {
        tileSize: this.mapItems[1].tileSize,
        zoomOffset: this.mapItems[1].zoomOffset,
        attribution: this.mapItems[1].attribution
      }),
      streets = L.tileLayer(
        this.mapItems[0].mapBoxUrl, {
        id: this.mapItems[0].id,
        maxZoom: this.mapItems[0].maxZoom,
        minZoom: this.mapItems[0].minZoom,
        tileSize: this.mapItems[0].tileSize,
        zoomOffset: this.mapItems[0].zoomOffset,
        attribution: this.mapItems[0].attribution
      })

    const map = L.map('map').setView([32.603461, 51.567615], 11);

    const baseMaps = {
      "Satellite": satellite,
      "OSM": streets
    };

    L.control.layers(baseMaps).addTo(map);

    // const msap = new L.Map('map', {
    //   fullscreenControl: true,
      // OR
      // fullscreenControl: {
      //     pseudoFullscreen: false // if true, fullscreen to page width and height
      // }
  // });
    // map.addControl(new L.Control.FullScreen());
    L.control.fullscreen().addTo(map);
  }

  private overlays = () => {
    const littleton =
      L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
      denver = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
      aurora = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
      golden = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

    const cities = L.layerGroup([littleton, denver, aurora, golden]);
  }
  // locateTheUser = (e) => {
  //   var radius = e.accuracy;

  //   L.marker(e.latlng).addTo(map)
  //     .bindPopup("You are within " + radius + " meters from this point").openPopup();

  //   L.circle(e.latlng, radius).addTo(map);
  // }
  

}


function onLocationFound(e) {
  const map = L.map('map').setView([32.603461, 51.567615], 11);
  var radius = e.accuracy;

  L.marker(e.latlng).addTo(map)
    .bindPopup("You are within " + radius + " meters from this point").openPopup();

  L.circle(e.latlng, radius).addTo(map);
}

// map.on('locationfound', onLocationFound);