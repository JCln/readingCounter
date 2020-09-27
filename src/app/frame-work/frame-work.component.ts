import '../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';

import { Component, OnInit } from '@angular/core';

import { InteractionService } from '../services/interaction.service';

declare let L;
@Component({
  selector: 'app-frame-work',
  templateUrl: './frame-work.component.html',
  styleUrls: ['./frame-work.component.scss']
})
export class FrameWorkComponent implements OnInit {
  // icon = {
  //   icon: L.icon({
  //     iconSize: [25, 41],
  //     iconAnchor: [13, 0],
  //     iconUrl: './src/assets/leaflet/images/marker-icon.png',
  //     shadowUrl: './src/assets/leaflet/images/marker-shadow.png'
  //   })
  // };

  title: string = '';

  constructor(private interactionService: InteractionService) { }

  ngOnInit(): void {
    this.interactionService.getPageTitle().subscribe(title => this.title = title);

    const map = L.map('map').setView([51.505, -0.09], 13);

    const
      satellite =
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }),
      streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });

    const baseMaps = {
      "Satellite": satellite,
      "OSM": streets
    };
    L.control.layers(baseMaps).addTo(map);

    L.Routing.control({
      waypoints: [
        L.latLng(57.74, 11.94),
        L.latLng(57.6792, 11.949)
      ]
    }).addTo(map);

    map.addControl(new L.Control.Fullscreen());
  }

}
