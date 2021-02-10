import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Leaflet from 'leaflet';
import { Imap, IMapTrackDesc } from 'src/app/Interfaces/imap.js';
import { MapItemsService } from 'src/app/services/DI/map-items.service.js';

import { IListManagerPDXY } from './../../Interfaces/imanage';
import { MapService } from './../../services/map.service';
import { UtilsService } from './../../services/utils.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  private markersDataSourceXY: IListManagerPDXY[] = [];
  map: Leaflet.Map;
  private mapItems: Imap[];

  polyline_configs: number;
  markerPlaces: any;
  isShowMap: boolean = true;

  constructor(
    private mapService: MapService,
    private mapItemsService: MapItemsService,
    private router: Router,
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) {
  }
  private getMapItems = () => {
    this.mapItems = this.mapItemsService.getMapItems();
  }

  private initMap = () => {
    const OSM = this.mapItems[0];

    this.map = Leaflet.map('map').setView([32.669, 51.664], 9);
    Leaflet.tileLayer(OSM.mapBoxUrl, {
      attribution: OSM.attribution,
    }).addTo(this.map);
  }
  showDashboard = (isShowMap: boolean) => {
    this.isShowMap = isShowMap;
    if (isShowMap) {
      this.router.navigate(['../wr']);
    }
    else {
      this.router.navigate(['../wr/db']);
    }
  }
  private leafletDrawPolylines = () => {
    let lines = [];
    this.markersDataSourceXY.map(items => {
      lines.push([parseFloat(items.y), parseFloat(items.x)]);
    })
    Leaflet.polyline(lines, {
      color: 'red',
      weight: 3,
      smoothFactor: 1
    }).addTo(this.map);
  }
  private getXYPosition = () => {
    this.markersDataSourceXY.map(items => {
      Leaflet.marker([parseFloat(items.y), parseFloat(items.x)]).addTo(this.map);
    })
  }
  getRouteParams = (): IMapTrackDesc => {
    const a = this.route.snapshot.paramMap.get('trackNumber');
    const b = this.route.snapshot.paramMap.get('day');
    return { trackNumber: a, day: b };
  }
  getPointerMarks = (a: object): Promise<any> => {
    return new Promise((resolve) => {
      this.mapService.callPointerMarks(a).subscribe(res => {
        resolve(res);
      });
    });
  }
  classWrapper = async () => {
    const a: IMapTrackDesc = this.getRouteParams();
    this.getMapItems();
    this.initMap();
    if (this.utilsService.isNull(a.trackNumber))
      return;
    this.markersDataSourceXY = await this.getPointerMarks(a);
    this.getXYPosition();
    this.leafletDrawPolylines();

  }
  ngOnInit(): void {
    this.classWrapper();
  }

  ngAfterViewInit(): void {
    this.mapService.fullScreen();
    // this.mapService.buttons(this.map);
  }
  ngOnDestroy(): void {
  }

}