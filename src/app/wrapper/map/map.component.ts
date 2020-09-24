import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

export interface mapBox {
  mapBoxUrl: URL;
  maxZoom: string;
  minZoom: string;
  tileSize: string;
  zoomOffset: string;
  attribution: string;
}
const MapBoxUrl = {
  OSM: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  // Satellite: 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
  Satellite: 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
}
const Attributions = {
  attr: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}
const DefaultTileLayerOptions = {
  id: 'mapID',
  maxZoom: 19,
  minZoom: 7,
  tileSize: 512,
  zoomOffset: -1,
  attribution: Attributions.attr
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  map: L.Map;
  private readonly mapBoxUrl = MapBoxUrl;
  private readonly defaultTileLayerOptions = DefaultTileLayerOptions;

  constructor() { }

  private initMap(): void {
    const
      streets = L.tileLayer(this.mapBoxUrl.OSM, this.defaultTileLayerOptions),
      satellite = L.tileLayer(this.mapBoxUrl.Satellite, { subdomains: ['otile1', 'otile2', 'otile3', 'otile4'] });

    const baseMaps = {
      "Satellite": satellite,
      "OSM": streets
    };

    // const overlayMaps = {
    //   "Cities": cities
    // };

    this.map = L.map('map', {
      center: [32.603461, 51.567615],
      zoom: 9,
      layers: [satellite, streets]
    })

    // tiles.addTo(this.map);
    this.map.locate({ setView: true, maxZoom: 16 });
    L.control.layers(baseMaps).addTo(this.map);
  }

  private overlays = () => {
    const littleton =
      L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
      denver = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
      aurora = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
      golden = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

    const cities = L.layerGroup([littleton, denver, aurora, golden]);
  }

  setLocation = () => {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmRxMzZkZDFzNW4zMW84NGlsdzNzeW0ifQ.K9Pozcn_shXxdNfFdUrlXA}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);

    this.map.locate({ setView: true, maxZoom: 16 });
  }
  ngOnInit(): void {
    // this.overlays();
  }
  ngAfterViewInit(): void {
    this.initMap();
    // this.setLocation();
  }

}

// function onMapClick(e) {
//   alert("You clicked the map at " + e.latlng);
// }

// function onLocationFound(e) {
//   var radius = e.accuracy;

//   L.marker(e.latlng).addTo(map)
//       .bindPopup("You are within " + radius + " meters from this point").openPopup();

//   L.circle(e.latlng, radius).addTo(map);
// }

// map.on('locationfound', onLocationFound);
// function onLocationError(e) {
//   alert(e.message);
// }

// map.on('locationerror', onLocationError);