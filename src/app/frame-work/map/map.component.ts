import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Imap } from 'src/app/Interfaces/imap.js';
import { MapItemsService } from 'src/app/services/DI/map-items.service.js';
import { InteractionService } from 'src/app/services/interaction.service';

import { MapService } from './../../services/map.service';

declare let L;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map;
  private mapItems: Imap[];
  isShowMap: boolean = true;
  title: string = '';

  constructor(
    private mapService: MapService,
    readonly mapItemsService: MapItemsService,
    private router: Router,
    private readonly interactionService: InteractionService
  ) {
  }
  private getMapItems = () => {
    this.mapItems = this.mapItemsService.getMapItems();
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
      center: [32.669, 51.664],
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
  showDashboard = (isShowMap: boolean) => {
    this.isShowMap = isShowMap;
    if (isShowMap) {
      this.router.navigateByUrl('/wr/db');
    }
    else {
      this.router.navigateByUrl('/db');
    }
  }

  ngOnInit(): void {
    this.getMapItems();
    this.initMap();
  }

  ngAfterViewInit(): void {
    this.mapService.fullScreen(this.map);
    this.mapService.addMarkerCluster(this.map);
    this.mapService.buttons(this.map);
    this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res && res.length !== 0) {
        if (res === this.router.url)
          this.ngOnInit();
      }
    })
  }

}