import '../../../node_modules/leaflet-easyprint';
import '../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import '../../../src/assets/L.EasyButton/src/easy-button.js';

import { AfterViewInit, Component, OnInit } from '@angular/core';

import { Imap } from '../Interfaces/imap';
import { MapItemsService } from '../services/DI/map-items.service';
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
export class FrameWorkComponent implements OnInit, AfterViewInit {
  private map;
  title: string = '';
  private readonly mapItems: Imap[];

  constructor(private interactionService: InteractionService, private mapService: MapService, readonly mapItemsService: MapItemsService) {
    this.mapItems = mapItemsService.getMapItems();
  }
  private initMap = () => {
    this.interactionService.getPageTitle().subscribe(title => this.title = title);

    const
      streets = L.tileLayer(
        this.mapItems[0].mapBoxUrl, {
        id: this.mapItems[0].id,
        maxZoom: this.mapItems[0].maxZoom,
        minZoom: this.mapItems[0].minZoom,
        tileSize: this.mapItems[0].tileSize,
        zoomOffset: this.mapItems[0].zoomOffset
      }),
      satellite = L.tileLayer(
        this.mapItems[1].style + this.mapItems[1].accessToken, {
        tileSize: this.mapItems[1].tileSize,
        zoomOffset: this.mapItems[1].zoomOffset
      })

    // only one of base layers should be added to the map at instantiation
    this.map = L.map('map', {
      center: [51.505, -0.09],
      zoom: 13,
      minZoom: 4,
      layers: [streets]
    });

    const baseMaps = {
      "Satellite": satellite,
      "OSM": streets
    };

    L.control.layers(baseMaps).addTo(this.map);
  }
  ngOnInit(): void {
    this.initMap();
  }

  ngAfterViewInit(): void {
    this.mapService.routingControl(this.map);
    this.mapService.fullScreen(this.map);
    this.mapService.buttons(this.map);
  }

}