import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IListManagerPDXY } from 'src/app/Interfaces/imanage';
import { Imap, IMapTrackDesc } from 'src/app/Interfaces/imap.js';
import { MapItemsService } from 'src/app/services/DI/map-items.service.js';
import { InteractionService } from 'src/app/services/interaction.service';
import { UtilsService } from 'src/app/services/utils.service';

import { MapService } from './../../services/map.service';

declare let L;

const iconRetinaUrl = 'assets/leaflet/images/marker-icon-2x.png';
const iconUrl = 'assets/leaflet/images/marker-icon.png';
const shadowUrl = 'assets/leaflet/images/marker-shadow.png';

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
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  private map: L.Map;
  private mapItems: Imap[];
  private layerGroup = new L.FeatureGroup();
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
      layers: [streets, this.layerGroup]
    });

    const baseMaps = {
      "Satellite": satellite,
      "OSM": streets
    };
    const overlays = {
      "لایه ها": this.layerGroup
    };

    L.control.layers(baseMaps, overlays).addTo(this.map);
  }
  getPointerMarks = (a: object): Promise<any> => {
    return new Promise((resolve) => {
      this.mapService.callPointerMarks(a).subscribe(res => {
        resolve(res);
      });
    });
  }
  private leafletDrawPolylines = (delay: number) => {
    const lines = [];
    this.markersDataSourceXY.forEach((items, i) => {
      setTimeout(() => {
        lines.push([parseFloat(items.y), parseFloat(items.x)]);
        L.polyline(lines, {
          color: '#0e4c92',
          weight: 3
        }).addTo(this.layerGroup);
      }, i * delay);
    })
  }
  private getXYPosition = (delay: number) => {
    this.markersDataSourceXY.map((items, i) => {
      setTimeout(() => {
        L.marker([parseFloat(items.y), parseFloat(items.x)]).addTo(this.layerGroup);
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
    this.canShowOptionsButton = true;
    this.mapService.serviceInstantiate(this.map);
    this.mapService.addButtonsToLeaflet();
    this.removeLayerButtonLeaflet();
    this.myLocationButtonLeaflet();
    this.markersDataSourceXY = await this.getPointerMarks(a);
  }
  ngOnInit(): void {
    this.getMapItems();
    this.initMap();
    this.classWrapper();
  }
  ngAfterViewInit(): void {
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
    this.removeAllLayers();
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
  removeAllLayers = () => {
    this.layerGroup.clearLayers();
  }
  removeLayerButtonLeaflet = () => {
    L.easyButton('fa-close', () => {
      this.removeAllLayers();
    }, 'بستن تمامی لایه ها').addTo(this.map);
  }
  findMyLocationLeaflet = (e) => {
    const radius = e.accuracy;
    L.marker(e.latlng).addTo(this.layerGroup)
      .bindPopup("شما در حدود تقریبی " + radius + " متر از این مکان قرار دارید").openPopup();

    L.circle(e.latlng, radius).addTo(this.layerGroup);
  }
  onLocationError = (e) => {
    alert(e.message);
  }
  myLocationButtonLeaflet = () => {
    L.easyButton('fa-map-marker', () => {
      this.map.locate({ setView: true, maxZoom: 16 });
      this.removeAllLayers();
      this.map.on('locationfound', this.findMyLocationLeaflet);
      this.map.on('locationerror', this.onLocationError);
    }, 'مکان من').addTo(this.map);
  }
}