import 'src/assets/L.EasyButton/src/easy-button';

import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Leaflet from 'leaflet';
import { Imap, IMapTrackDesc } from 'src/app/Interfaces/imap.js';
import { MapItemsService } from 'src/app/services/DI/map-items.service.js';

import { IListManagerPDXY } from './../../Interfaces/imanage';
import { MapService } from './../../services/map.service';
import { UtilsService } from './../../services/utils.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

const defaultIcon = Leaflet.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})
Leaflet.Marker.prototype.options.icon = defaultIcon;


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
  isShowMap: boolean = true;
  canShowOptionsButton: boolean = false;
  isShowMapConfig: boolean = false;

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
  addToMapWrapper = (val: any) => {
    Leaflet.control.layers(val).addTo(this.map);
  }
  leafletRefresh = () => {
    Leaflet.easyButton('fa fa-refresh', function (btn) {
      this.addInvalidateMap();
    }, 'بارگیری مجدد نقشه').addTo(this.map);
  }
  leafletMyPosition = () => {
    Leaflet.easyButton('fa-map-marker', function (btn, map) {
      map.locate({ setView: true, maxZoom: 16 })
      map.on('locationfound', this.onLocationFound(map));
    }, 'مکان من').addTo(this.map);
  }

  private initMap = () => {

    const satellite = this.mapItems[1];
    const OSM = this.mapItems[0];

    const OSMVW = Leaflet.tileLayer(
      OSM.mapBoxUrl, {
      attribution: OSM.attribution
    }),
      satelliteVW = Leaflet.tileLayer(
        satellite.mapBoxUrl + satellite.accessToken, {
        attribution: satellite.attribution
      });

    const baseMaps = {
      "OSM": OSMVW,
      "Satellite": satelliteVW
    };

    this.map = Leaflet.map('map', {
      center: [32.669, 51.664],
      zoom: 9,
      layers: [OSMVW]
    });

    this.addToMapWrapper(baseMaps);

  }
  private leafletDrawPolylines = (delay: number) => {
    let lines = [];
    this.markersDataSourceXY.forEach((items, i) => {
      setTimeout(() => {
        lines.push([parseFloat(items.y), parseFloat(items.x)]);
        Leaflet.polyline(lines, {
          color: 'red',
          weight: 3
        }).addTo(this.map);
      }, i * delay);
    })
  }
  private getXYPosition = (delay: number) => {
    this.markersDataSourceXY.map((items, i) => {
      setTimeout(() => {
        Leaflet.marker([parseFloat(items.y), parseFloat(items.x)]).addTo(this.map);
      }, i * delay);
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
  mapConfigOptions = (delay: number) => {
    this.getXYPosition(delay + 20);
    this.leafletDrawPolylines(delay);
  }
  classWrapper = async () => {
    const a: IMapTrackDesc = this.getRouteParams();
    this.getMapItems();
    this.initMap();
    if (this.utilsService.isNull(a.trackNumber))
      return;
    this.canShowOptionsButton = true;
    this.markersDataSourceXY = await this.getPointerMarks(a);
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
  ngOnInit(): void {
    this.classWrapper();
  }

  ngAfterViewInit(): void {
    this.leafletMyPosition();
    this.leafletRefresh();
    // this.mapService.buttons(this.map);
  }
  ngOnDestroy(): void {
  }
}



// private otherLayers = () => {
  //   const satellite = this.mapItems[1];
  //   const OSM = this.mapItems[0];

  //   const OSMVW = Leaflet.tileLayer(
  //     OSM.mapBoxUrl, {
  //     id: OSM.id,
  //     maxZoom: OSM.maxZoom,
  //     minZoom: OSM.minZoom,
  //     tileSize: OSM.tileSize,
  //     zoomOffset: OSM.zoomOffset
  //   }),
  //     satelliteVW = Leaflet.tileLayer(
  //       satellite.mapBoxUrl + satellite.accessToken, {
  //       tileSize: satellite.tileSize,
  //       zoomOffset: satellite.zoomOffset
  //     });
  //   return [OSMVW, satellite]
  // }



// const satellite = this.mapItems[1];
// const OSM = this.mapItems[0];

// const OSMVW = Leaflet.tileLayer(
//   OSM.mapBoxUrl, {
//   id: OSM.id,
//   maxZoom: OSM.maxZoom,
//   minZoom: OSM.minZoom,
//   tileSize: OSM.tileSize,
//   zoomOffset: OSM.zoomOffset,
//   attribution: OSM.attribution
// }),
//   satelliteVW = Leaflet.tileLayer(
//     satellite.mapBoxUrl + satellite.accessToken, {
//     tileSize: satellite.tileSize,
//     zoomOffset: satellite.zoomOffset,
//     attribution: satellite.attribution
//   });

// const baseMaps = {
//   "OSM": OSMVW,
//   // "Satellite": satelliteVW
// };
// this.map = Leaflet.map('map').setView([32.669, 51.664], 9);

// this.map = Leaflet.map('map', {
//   center: [32.669, 51.664],
//   zoom: 9,
//   // layers: [OSMVW]
// });

// // Leaflet.tileLayer(OSM.mapBoxUrl, {
// //   attribution: OSM.attribution,
// // }).addTo(this.map);
// Leaflet.control.layers(baseMaps).addTo(this.map);
