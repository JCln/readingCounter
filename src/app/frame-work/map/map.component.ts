import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IListManagerPDXY } from 'src/app/Interfaces/imanage';
import { Imap, IMapTrackDesc } from 'src/app/Interfaces/imap.js';
import { MapItemsService } from 'src/app/services/DI/map-items.service.js';
import { EnvService } from 'src/app/services/env.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';
import { UtilsService } from 'src/app/services/utils.service';

import { IReadingReportGISReq, IReadingReportGISResponse } from './../../Interfaces/imanage';
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
  private extrasNavigation: IReadingReportGISReq;
  extraDataSourceRes: IReadingReportGISResponse[] = [];

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
    public mapService: MapService,
    readonly mapItemsService: MapItemsService,
    private readonly interactionService: InteractionService,
    private readingReportManagerService: ReadingReportManagerService,
    public route: ActivatedRoute,
    private router: Router,
    private utilsService: UtilsService,
    private envService: EnvService
  ) {
    this.extrasNavigation = this.getRouterExtras();
  }
  private getMapItems = () => {
    this.mapItems = this.mapItemsService.getMapItems();
  }
  private initMap = () => {
    const OSM = this.mapItems[0];
    const SATELLITE = this.mapItems[1];
    // const Esri = this.mapItems[2];
    const
      streets = L.tileLayer(this.envService.OSMmapBoxUrl),
      satellite = L.tileLayer(this.envService.SATELLITEMapBoxUrl + this.envService.SATELLITEMapAccessToken)
    // esri = L.tileLayer(
    //   Esri.mapBoxUrl)

    // only one of base layers should be added to the map at instantiation
    this.map = L.map('map', {
      center: [32.669, 51.664],
      zoom: 15,
      minZoom: 4,
      layers: [streets, this.layerGroup]
    });

    const baseMaps = {
      "Satellite": satellite,
      "OSM": streets,
      // "ESRI": esri
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
    this.markersDataSourceXY = await this.getPointerMarks(a);
    this.mapConfigOptions(0);
  }
  private classWrapperWithExtras = async () => {
    this.extraDataSourceRes = await this.readingReportManagerService.postRRGISManager();
    if (!this.extraDataSourceRes.length) {
      this.utilsService.snackBarMessageFailed('مقداری وجود ندارد');
      return;
    }
    this.mapService.hasMarkerCluster(this.extrasNavigation) ? this.extrasConfigOptionsCluster(this.extraDataSourceRes) : this.extrasConfigOptions(this.extraDataSourceRes, 0);
  }
  ngOnInit(): void {
    this.getMapItems();
    this.initMap();
    if (this.extrasNavigation) {
      this.classWrapperWithExtras();
    }
    else {
      this.classWrapper();
    }
    this.addButtonsToLeaflet();
  }
  ngAfterViewInit(): void {
    this.subscription = this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr')
          this.ngOnInit();
      }
    })
  }
  private flyToDes = (lat: number, lag: number, zoom: number) => {
    this.map.flyTo([(lat), (lag)], zoom);
  }
  private addButtonsToLeaflet = () => {
    this.mapService.serviceInstantiate(this.map);
    this.mapService.addButtonsToLeaflet();
    this.removeLayerButtonLeaflet();
    this.myLocationButtonLeaflet();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.unsubscribe();
  }

  // get X Y positions
  private getXYPosition = (xyData: any, delay: number) => {
    xyData.map((items, i) => {
      setTimeout(() => {
        this.circleToLeaflet(parseFloat(items.y), parseFloat(items.x), items);
        this.flyToDes(parseFloat(items.y), parseFloat(items.x), 16);
      }, i * delay);
    })
  }
  private getXYPositionExtras = (xyData: any, delay: number) => {
    xyData.map((items, i) => {
      setTimeout(() => {
        this.circleToExtrasLeaflet(parseFloat(items.y), parseFloat(items.x), items);
        this.flyToDes(parseFloat(items.y), parseFloat(items.x), 16);
      }, i * delay);
    })
  }
  private getXYMarkerClusterPosition = (xyData: any) => {
    const markers = new L.markerClusterGroup();
    xyData.map((items) => {
      this.flyToDes(32.66, 51.66, 12);
      markers.addLayer(L.marker([parseFloat(items.y), parseFloat(items.x)]).bindPopup(
        `${items.info1} <br>` + `${items.info2} <br> ${items.info3}`
      ));
    })
    this.layerGroup.addLayer(markers);
  }
  // 

  mapConfigOptions = (delay: number) => {
    this.removeAllLayers();
    this.getXYPosition(this.markersDataSourceXY, delay + 20);
    this.leafletDrawPolylines(delay);
  }
  private extrasConfigOptions = (xyData: any, delay: number) => {
    this.removeAllLayers();
    this.getXYPositionExtras(xyData, delay + 20);
  }
  private extrasConfigOptionsCluster = (xyData: any) => {
    this.removeAllLayers();
    this.getXYMarkerClusterPosition(xyData);
  }
  showDashboard = (isShowMap: boolean) => {
    this.isShowMap = isShowMap;
    if (isShowMap) {
      this.router.navigate(['../wr']);
    }
    else {
      this.router.navigate(['wr/db']);
    }
  }
  private removeAllLayers = () => {
    this.layerGroup.clearLayers();
  }
  private removeLayerButtonLeaflet = () => {
    L.easyButton('fa-close', () => {
      this.removeAllLayers();
    }, 'بستن تمامی لایه ها').addTo(this.map);
  }
  private circleToLeaflet = (lat: number, lng: number, items) => {
    L.circleMarker([lat, lng], { weight: 4, radius: 3, color: "#3686c9" }).addTo(this.layerGroup)
      .bindPopup(
        `${items.firstName}` + `${items.sureName} <br> ${items.eshterak}`,
      );
  }
  private circleToExtrasLeaflet = (lat: number, lng: number, items) => {
    L.circleMarker([lat, lng], { weight: 4, radius: 3, color: "#3686c9" }).addTo(this.layerGroup)
      .bindPopup(
        `${items.info1} <br>` + `${items.info2} <br> ${items.info3}`
      );
  }
  private findMyLocationLeaflet = (e) => {
    const radius = e.accuracy;
    L.marker(e.latlng).addTo(this.layerGroup)
      .bindPopup("شما در حدود تقریبی " + radius + " متر از این مکان قرار دارید").openPopup();

    this.flyToDes(e.latlng.lat, e.latlng.lng, 16);
  }
  private onLocationError = (e) => {
    alert(e.message);
  }
  private myLocationButtonLeaflet = () => {
    L.easyButton('fa-map-marker', () => {
      this.map.locate({ setView: true, maxZoom: 14 });
      this.removeAllLayers();
      this.map.on('locationfound', this.findMyLocationLeaflet);
      this.map.on('locationerror', this.onLocationError);
    }, 'مکان من').addTo(this.map);
  }
  getRouterExtras = (): any => {
    try {
      return this.router.getCurrentNavigation().extras.state.test;
    } catch (error) {
      console.error(error);
    }
  }
}