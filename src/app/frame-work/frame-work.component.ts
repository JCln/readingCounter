import '../../../node_modules/leaflet-easyprint';
import '../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import '../../../src/assets/L.EasyButton/src/easy-button.js';

import { Component, OnInit } from '@angular/core';

import { InteractionService } from '../services/interaction.service';

// import 'leaflet-easyprint';
declare let L;

@Component({
  selector: 'app-frame-work',
  templateUrl: './frame-work.component.html',
  styleUrls: ['./frame-work.component.scss']
})
export class FrameWorkComponent implements OnInit {


  title: string = '';

  constructor(private interactionService: InteractionService) { }

  ngOnInit(): void {
    const map = L.map('map').setView([51.505, -0.09], 13);
    this.interactionService.getPageTitle().subscribe(title => this.title = title);


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

    L.easyButton('fa-globe', function (btn, map) {
      this.helloPopup.setLatLng(map.getCenter()).openOn(map);
    }).addTo(map);

    L.easyPrint({
      position: 'bottomleft',
      sizeModes: ['A4Portrait', 'A4Landscape']
    }).addTo(map);

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

    L.easyButton('fa-map-marker', function (btn, map) {
      map.locate({ setView: true, maxZoom: 16 })
      map.on('locationfound', onLocationFound(map));
    }).addTo(map);

  }

}