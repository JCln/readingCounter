import { Component, OnInit } from '@angular/core';
import { Imap } from 'interfaces/imap';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EnvService } from 'services/env.service';
import { MapService } from 'services/map.service';

declare let L;

@Component({
  selector: 'app-map-dg',
  templateUrl: './map-dg.component.html',
  styleUrls: ['./map-dg.component.scss']
})
export class MapDgComponent implements OnInit {
  private layerGroup = new L.FeatureGroup();
  private map: L.Map;

  private mapItems: Imap[];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private envService: EnvService,
    private mapService: MapService
  ) { }

  private flyToDes = (lat: number, lag: number, zoom: number) => {
    if (lat === 0 || lag === 0)
      return;
    lat = parseFloat(lat.toString().substring(0, 6));
    lag = parseFloat(lag.toString().substring(0, 6));

    this.map.flyTo([(lat), (lag)], zoom);
  }

  private markSingle = (items: any) => {
    this.flyToDes(items.y, items.x, 12);
    L.circleMarker([items.y, items.x], { weight: 4, radius: 3, color: '#116fff' }).addTo(this.layerGroup)
      .bindPopup(
        `${items.firstName} <br>` + `${items.sureName} <br> ${items.eshterak} <br> ${'ش.پ :' + items.trackNumber}`
      );
  }
  private simpleMarkSingleLocation = (x: string, y: string) => {
    this.markSingle({ x: x, y: y, firstName: this.config.data.firstName, sureName: this.config.data.sureName, eshterak: this.config.data.eshterak, trackNumber: this.config.data.trackNumber });
  }
  private getOverlays = () => {
    return {
      "لایه ها": this.layerGroup
    };
  }
  initMap = () => {
    this.map = L.map('map', {
      center: this.envService.mapCenter,
      zoom: 15,
      minZoom: 4,
      layers: [this.mapService.initMapColor(), this.layerGroup]
    });

    L.control.layers(this.mapService.getBaseMap(), this.getOverlays()).addTo(this.map);
  }
  private getMapItems = () => {
    this.mapItems = this.mapService.getMapItems();
  }
  ngOnInit(): void {
    this.getMapItems();
    this.initMap();
    const x = this.config.data.x;
    const y = this.config.data.y;
    this.simpleMarkSingleLocation(x, y);
  }
  close() {
    this.ref.close();
  }

}
