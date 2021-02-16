import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IListManagerPDXY } from 'src/app/Interfaces/imanage';
import { Imap, IMapTrackDesc } from 'src/app/Interfaces/imap.js';
import { MapItemsService } from 'src/app/services/DI/map-items.service.js';
import { InteractionService } from 'src/app/services/interaction.service';
import { UtilsService } from 'src/app/services/utils.service';

import { MapService } from './../../services/map.service';


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

declare let L;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  private map;
  private mapItems: Imap[];

  private markersDataSourceXY: IListManagerPDXY[] = [];
  polyline_configs: number;
  isShowMap: boolean = true;
  canShowOptionsButton: boolean = false;
  isShowMapConfig: boolean = false;

  title: string = '';
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private mapService: MapService,
    readonly mapItemsService: MapItemsService,
    private router: Router,
    private readonly interactionService: InteractionService,
    private utilsService: UtilsService
  ) {
  }
  private getMapItems = () => {
    this.mapItems = this.mapItemsService.getMapItems();
  }
  private initMap = () => {
    const OSM = this.mapItems[0];
    const SATELLITE = this.mapItems[1];
    const
      streets = L.tileLayer(
        OSM.mapBoxUrl),
      satellite = L.tileLayer(
        SATELLITE.mapBoxUrl + SATELLITE.accessToken)

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

  getPointerMarks = (a: object): Promise<any> => {
    return new Promise((resolve) => {
      this.mapService.callPointerMarks(a).subscribe(res => {
        resolve(res);
      });
    });
  }

  private leafletDrawPolylines = (delay: number) => {
    let lines = [];
    this.markersDataSourceXY.forEach((items, i) => {
      setTimeout(() => {
        lines.push([parseFloat(items.y), parseFloat(items.x)]);
        L.polyline(lines, {
          color: 'red',
          weight: 3
        }).addTo(this.map);
      }, i * delay);
    })
  }
  private getXYPosition = (delay: number) => {
    this.markersDataSourceXY.map((items, i) => {
      setTimeout(() => {
        L.marker([parseFloat(items.y), parseFloat(items.x)]).addTo(this.map);
      }, i * delay);
    })
  }

  private getRouteParams = (): IMapTrackDesc => {
    const a = this.route.snapshot.paramMap.get('trackNumber');
    const b = this.route.snapshot.paramMap.get('day');
    return { trackNumber: a, day: b };
  }
  private classWrapper = async () => {
    const a: IMapTrackDesc = this.getRouteParams();
    if (this.utilsService.isNull(a.trackNumber))
      return;
    console.log(1);

    this.canShowOptionsButton = true;
    this.markersDataSourceXY = await this.getPointerMarks(a);
  }
  ngOnInit(): void {
    this.getMapItems();
    this.initMap();
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
  mapConfigOptions = (delay: number) => {
    this.getXYPosition(delay + 20);
    this.leafletDrawPolylines(delay);
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

}