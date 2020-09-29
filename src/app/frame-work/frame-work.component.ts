import '../../../node_modules/leaflet-easyprint';
import '../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import '../../../src/assets/L.EasyButton/src/easy-button.js';

import { Component, OnInit } from '@angular/core';

import { InteractionService } from '../services/interaction.service';
import { MapService } from './../services/map.service';

declare let L;

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

const defaultIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})
L.Marker.prototype.options.icon = defaultIcon;

@Component({
  selector: 'app-frame-work',
  templateUrl: './frame-work.component.html',
  styleUrls: ['./frame-work.component.scss']
})
export class FrameWorkComponent implements OnInit {
  title: string = '';

  constructor(private interactionService: InteractionService, private mapService: MapService) { }

  // overlays = (map: L.Map, overlays: string) => {
  //   var overlayMaps = {
  //     "Cities": cities
  //   };
  // }
  ngOnInit(): void {
    this.interactionService.getPageTitle().subscribe(title => this.title = title);

    const
      satellite =
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg', {
          minZoom: 4
        }),
      streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 4
      });

    // only one of base layers should be added to the map at instantiation
    const map = L.map('map', {
      center: [51.505, -0.09],
      zoom: 13,
      minZoom: 4,
      layers: [streets]
    });

    const baseMaps = {
      "Satellite": satellite,
      "OSM": streets
    };

    L.control.layers(baseMaps).addTo(map);

    L.Routing.control({
      waypoints: [
        L.latLng(57.74, 11.94),
        L.latLng(57.6792, 11.949),
      ]
    }).addTo(map);

    map.addControl(new L.Control.Fullscreen());

    ///////// buttons
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

    const addInvalidateMap = () => {
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
      addInvalidateMap();
    }).addTo(map);

    L.easyButton('fa-map-marker', function (btn, map) {
      map.locate({ setView: true, maxZoom: 16 })
      map.on('locationfound', onLocationFound(map));
    }).addTo(map);

    L.easyButton('fa-close', function (btn, map) {
      removeAllLayers(map, window);
    }).addTo(map);

    //////////////////    

  }

}