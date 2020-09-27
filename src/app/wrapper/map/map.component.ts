import '../../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';

import { AfterViewInit, Component, OnInit } from '@angular/core';

import { MapService } from './../../services/map.service';

declare let L;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  constructor(private mapService: MapService) {
  }

  ngOnInit(): void {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.Routing.control({
      waypoints: [
        L.latLng(57.74, 11.94),
        L.latLng(57.6792, 11.949)
      ]
    }).addTo(map);


    map.addControl(new L.Control.Fullscreen());
  }
  ngAfterViewInit(): void {
    // this.mapService.initMap();
  }

}