import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  map: L.Map;
  
  constructor() { }

  private initMap(): void {
    this.map = L.map('map').setView([32.603461, 51.567615], 9);
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 7,
      tileSize: 512,
      zoomOffset: -1,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.initMap();
  }

}

// function onMapClick(e) {
//   alert("You clicked the map at " + e.latlng);
// }