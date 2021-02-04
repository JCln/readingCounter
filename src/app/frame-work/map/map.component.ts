import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Imap, IMapTrackDesc } from 'src/app/Interfaces/imap.js';
import { MapItemsService } from 'src/app/services/DI/map-items.service.js';
import { InteractionService } from 'src/app/services/interaction.service';

import { IListManagerPDXY } from './../../Interfaces/imanage';
import { MapService } from './../../services/map.service';
import { UtilsService } from './../../services/utils.service';

declare let L;
// import {Map} from 'leaflet'
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  private markersDataSourceXY: IListManagerPDXY[] = [];
  private map;
  private mapItems: Imap[];
  markerPlaces: any;
  isShowMap: boolean = true;
  subscription: Subscription;

  constructor(
    private mapService: MapService,
    readonly mapItemsService: MapItemsService,
    private router: Router,
    private route: ActivatedRoute,
    private readonly interactionService: InteractionService,
    private utilsService: UtilsService
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
      zoom: 12,
      minZoom: 4,
      layers: [streets]
    });

    const baseMaps = {
      "Satellite": satellite,
      "OSM": streets
    };
    const overlayMaps = {
      "places": this.markerPlaces
    }

    L.control.layers(baseMaps).addTo(this.map);
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
    L.polyline(lines, {
      color: 'red',
      weight: 3,
      smoothFactor: 1
    }).addTo(this.map);
  }
  private getXYPosition = () => {
    this.markersDataSourceXY.map(items => {
      L.marker([parseFloat(items.y), parseFloat(items.x)]).addTo(this.map);
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
    this.mapService.fullScreen(this.map);
    this.mapService.buttons(this.map);
    this.subscription = this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr')
          this.ngOnInit();
      }
    })
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.unsubscribe();
  }

}