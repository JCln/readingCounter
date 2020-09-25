import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import mapboxgl from 'mapbox-gl';

import { MapService } from './../../services/map.service';

export interface mapBox {
  maxZoom: number;
  minZoom: number;
  tileSize: number;
  zoomOffset: number;
  attribution: string;
  mapBoxUrl?: URL;
  accessToken?: string;
  id?: string;
}
const MapBoxUrl = {
  OSM: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  Satellite: 'https://api.mapbox.com/styles/v1/mapbox/streets_v11/tiles/{z}/{x}/{y}?access_token='
}
const Attributions = {
  attr: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}
const DefaultTileLayerOptions: mapBox = {
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
  map2: mapboxgl.Map;
  
  constructor(private mapService: MapService) { }

  setLocation = () => {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmRxMzZkZDFzNW4zMW84NGlsdzNzeW0ifQ.K9Pozcn_shXxdNfFdUrlXA}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);

    this.map.locate({ setView: true, maxZoom: 16 });
  }
  mapBoxGl = () => {
    this.map2 = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-v9',
      maxZoom: 18,
      zoom: 11,
      center: [32.603461, 51.567615],
      accessToken: 'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmRxMzZkZDFzNW4zMW84NGlsdzNzeW0ifQ.K9Pozcn_shXxdNfFdUrlXA'
    });
    this.map2.addControl(new mapboxgl.NavigationControl());
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.mapService.initMap();
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