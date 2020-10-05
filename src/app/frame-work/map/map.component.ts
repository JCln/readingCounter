import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Imap } from 'src/app/Interfaces/imap.js';
import { MapItemsService } from 'src/app/services/DI/map-items.service.js';

import { MapService } from './../../services/map.service';

declare let L;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  isShowMap: boolean = true;
  private map;
  title: string = '';
  private readonly mapItems: Imap[];

  constructor(private mapService: MapService, readonly mapItemsService: MapItemsService) {
    this.mapItems = mapItemsService.getMapItems();
  }
  private initMap = () => {

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
    this.mapService.addMarkerCluster(this.map);
    this.mapService.buttons(this.map);
  }

}