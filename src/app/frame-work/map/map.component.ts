import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENCompanyName, ENLocalStorageNames, ENRandomNumbers, EN_messages } from 'interfaces/enums.enum';
import { IReadingReportGISReq, IReadingReportGISResponse } from 'interfaces/ireports';
import { IListManagerPDXY } from 'interfaces/itrackings';
import { filter } from 'rxjs/internal/operators/filter';
import { Subscription } from 'rxjs/internal/Subscription';
import { DateJalaliService } from 'services/date-jalali.service';
import { MapService } from 'services/map.service';
import { UtilsService } from 'services/utils.service';
import { MathS } from 'src/app/classes/math-s';
import { IGisXYResponse } from 'interfaces/idashboard-map';
import { EN_Routes } from 'interfaces/routes.enum';
import { ITHV } from 'interfaces/ioverall-config';


declare let L;

const iconRetinaUrl = 'assets/imgs/leaflet/marker-icon-2x.png';
const iconUrl = 'assets/imgs/leaflet/marker-icon.png';
const shadowUrl = 'assets/imgs/leaflet/marker-shadow.png';

const simpleIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const defaultIcon = L.Icon.extend({
  options: {
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
  }
})
const myIcon = L.Icon.extend({
  options: {
    shadowUrl,
    iconSize: [25, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  }
});
const iconSimple = new myIcon({ iconUrl: 'assets/imgs/leaflet/marker-icon.png' });
L.Marker.prototype.options.icon = simpleIcon;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  extraDataSourceRes: IReadingReportGISResponse[] = [];
  private map: L.Map;
  private layerGroup = new L.FeatureGroup();
  private markersDataSourceXY: IListManagerPDXY[] = [];
  private routeParams: object = {};

  polyline_configs: number = null;
  isShowMap: boolean = true;
  canShowOptionsButton: boolean = false;
  isShowMapConfig: boolean = false;
  _isCluster: boolean;
  _isSingle: boolean;
  _currentColorMode: boolean;
  subscription: Subscription[] = [];
  _isOrderInAsc: boolean = false;
  _selectedOrderId: number = 0;
  private readonly color_normal: string = '#0045cb';
  private readonly color_mane: string = '#f44336';
  private readonly color_polyline: string = '#0e4c92';

  orderGroup: ITHV[] = [
    {
      title: 'eshterak',
      header: 'اشتراک',
      value: 0
    },
    {
      title: 'time',
      header: 'زمان',
      value: 1
    }
  ]

  onShowCounterReader = {
    trackNumber: '', day: '', distance: null, isPerday: null
  }

  constructor(
    public mapService: MapService,
    public route: ActivatedRoute,
    private router: Router,
    public utilsService: UtilsService,
    private dateJalaliService: DateJalaliService
  ) { }

  private getOverlays = () => {
    return {
      "لایه ها": this.layerGroup
    };
  }
  initMap = () => {
    // only one of base layers should be added to the map at instantiation
    this.map = L.map('map', {
      center: this.mapService.envService.mapCenter,
      zoom: ENRandomNumbers.fifteen,
      minZoom: ENRandomNumbers.four,
      maxZoom: ENRandomNumbers.eighteen,
      layers: [this.mapService.getFirstItemUrl(), this.layerGroup],
    });

    this.map.attributionControl.setPrefix(ENCompanyName.title);
    L.control.layers(this.mapService.getBaseMap(), this.getOverlays()).addTo(this.map);
  }
  private leafletDrawPolylines = (delay: number) => {
    const lines = [];
    this.markersDataSourceXY.forEach((items, i) => {
      setTimeout(() => {
        if (parseFloat(items.y) === 0)
          return;
        lines.push([parseFloat(items.y), parseFloat(items.x)]);
        L.polyline(lines, {
          color: this.color_polyline,
          weight: 1
        }).addTo(this.layerGroup);
      }, i * delay);
    })
  }
  private classWrapper = async () => {
    this.onShowCounterReader.trackNumber = this.routeParams['trackNumber'];
    this.onShowCounterReader.day = this.routeParams['day'];
    this.onShowCounterReader.isPerday = this.routeParams['isPerday'];
    this.canShowOptionsButton = true;

    if (this.onShowCounterReader.isPerday)
      this.markersDataSourceXY = await this.mapService.getXY(this.onShowCounterReader.trackNumber);
    else
      this.markersDataSourceXY = await this.mapService.getPointerMarks(this.onShowCounterReader);

    if (!this.mapService.validateGISAccuracy(this.markersDataSourceXY)) {
      this.utilsService.snackBarMessageWarn(EN_messages.notFound);
      return;
    }
    this.polyline_configs = this.mapService.getFromLocalStorage();
    this.mapConfigOptions(this.mapService.getFromLocalStorage(), true);
  }
  private makeClusterRouteObject = (): IReadingReportGISReq => {
    let numberOfFragmentMasterIds = [];
    const fragmentMaster = this.routeParams['fragmentMasterIds'];
    if (fragmentMaster.length) {
      for (let index = 0; index < this.routeParams['fragmentMasterIds'].split(',').length; index++) {
        numberOfFragmentMasterIds.push(this.routeParams['fragmentMasterIds'].split(',')[index])
      }
    }

    return {
      zoneId: parseInt(this.routeParams['zoneId']),
      isCounterState: this.routeParams['isCounterState'] === 'true' ? true : false,
      counterStateId: parseInt(this.routeParams['counterStateId']),
      isKarbariChange: this.routeParams['isKarbariChange'] === 'true' ? true : false,
      fragmentMasterIds: numberOfFragmentMasterIds,
      isAhadChange: this.routeParams['isAhadChange'] === 'true' ? true : false,
      isForbidden: this.routeParams['isForbidden'] === 'true' ? true : false,
      readingPeriodId: parseInt(this.routeParams['readingPeriodId']),
      year: parseInt(this.routeParams['year']),
      fromDate: this.routeParams['fromDate'],
      toDate: this.routeParams['toDate'],
      isCluster: this.routeParams['isCluster'] === 'true' ? true : false
    }
  }
  private classWrapperCluster = async () => {
    this.extraDataSourceRes = await this.mapService.postDataSourceGisSpecial(ENInterfaces.ListToGis, this.makeClusterRouteObject());

    if (this.extraDataSourceRes.length === 0) {
      this.utilsService.snackBarMessageWarn(EN_messages.notFound);
      return;
    }
    this._isCluster ? this.extrasConfigOptionsCluster(this.extraDataSourceRes) : this.extrasConfigOptions(this.extraDataSourceRes);
  }
  private forbiddenMarkSingleLocation = (x: string, y: string) => {
    this.markSingleForbidden({
      x: x,
      y: y,
      description: this.routeParams['description'],
      displayName: this.routeParams['displayName'],
      insertDateJalali: this.routeParams['insertDateJalali'],
      zone: this.routeParams['zoneId'],
      gisAccuracy: this.routeParams['gisAccuracy'],
      tedadVahed: this.routeParams['tedadVahed'],
      preEshterak: this.routeParams['preEshterak'],
      nextEshterak: this.routeParams['nextEshterak'],
      postalCode: this.routeParams['postalCode']
    });
  }
  private simpleMarkSingleLocation = (x: string, y: string) => {
    this.markSingle({
      x: x,
      y: y,
      firstName: this.routeParams['firstName'],
      sureName: this.routeParams['sureName'],
      eshterak: this.routeParams['eshterak'],
      trackNumber: this.routeParams['trackNumber']
    });
  }
  private getRouteParams = () => {
    // get all route params
    this.routeParams = this.route.snapshot.params;

    if (!MathS.isNull(this.routeParams['distance'])) {
      this.onShowCounterReader.distance = this.routeParams['distance'];
      this.classWrapper();
      return;
    }
    // ToDo: should manage by clustering    
    if (this.routeParams['isSingle'] == 'true' ? true : false) {
      const _isForbidden = this.routeParams['isForbidden'] == 'true' ? true : false;
      const x = this.routeParams['x'];
      const y = this.routeParams['y'];
      if (_isForbidden) {
        this.forbiddenMarkSingleLocation(x, y);
      }
      else {
        this.simpleMarkSingleLocation(x, y);
      }
    } else {
      this._isCluster = this.routeParams['isCluster'] == 'true' ? true : this.routeParams['isCluster'] == 'false' ? false : null;
      if (this._isCluster == false || this._isCluster == true)
        this.classWrapperCluster();
    }
  }
  ngOnInit(): void {
    this.initMap();
    this.getRouteParams();
    this.mapService.serviceInstantiate(this.map);
    this.mapService.addButtonsToLeaflet();
    this.removeLayerButtonLeaflet();
    this.myLocationButtonLeaflet();
  }
  private flyToDes = (lat: number, lag: number, zoom: number) => {
    if (lat != 0 || lag != 0) {

      lat = parseFloat(lat.toString().substring(0, 6));
      lag = parseFloat(lag.toString().substring(0, 6));

      this.map.flyTo([(lat), (lag)], zoom);
    }
  }
  private panInsideItems = (lat: number, lag: number) => {
    if (lat != 0 || lag != 0) {
      this.map.panInside([(lat), (lag)]);
    }
  }
  private panToDes = (lat: number, lag: number) => {
    if (lat != 0 || lag != 0) {
      this.map.panTo([(lat), (lag)]);
    }
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    // this.removeAllLayers();
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  // get X Y positions
  private getXYPosition = (method: string, xyData: any, delay?: number) => {
    this.panToDes(xyData[0].y, xyData[0].x);
    xyData.map((items, i) => {
      setTimeout(() => {
        this[method](parseFloat(items.y), parseFloat(items.x), items);
        this.panInsideItems(items.y, items.x);
      }, i * delay);
    })
  }
  private drawXYPosition = (method: string, xyData: any) => {
    this.panToDes(parseFloat(xyData[0].y), parseFloat(xyData[0].x));
    xyData.map((items) => {
      this[method](parseFloat(items.y), parseFloat(items.x), items);
    })
  }
  private markingOnMapNClusterNDelay = (method: string, xyData: any) => {
    this.flyToDes(this.mapService.envService.mapCenter[0], this.mapService.envService.mapCenter[1], 12);
    xyData.map((items) => {
      this[method](parseFloat(items.y), parseFloat(items.x), items);
    })
  }
  private markWithoutClusterColorized = (lat: number, lng: number, items) => {
    if (lat === 0)
      return;
    L.marker([lat, lng]).addTo(this.layerGroup)
      .bindPopup(
        `${items.info1} <br>` + `${items.info2} <br> ${items.info3}`
      );
  }
  private markWithoutCluster = (lat: number, lng: number, items) => {
    if (lat === 0)
      return;
    L.circleMarker([lat, lng], { weight: 4, radius: 3, color: this.color_normal }).addTo(this.layerGroup)
      .bindPopup(
        `${items.info1} <br>` + `${items.info2} <br> ${items.info3}`
      );
  }
  private getXYMarkerClusterPosition = (xyData: any) => {
    const markers = new L.markerClusterGroup();
    xyData.map((items) => {
      this.flyToDes(this.mapService.envService.mapCenter[0], this.mapService.envService.mapCenter[1], 11);
      markers.addLayer(L.marker([parseFloat(items.y), parseFloat(items.x)])
        .bindPopup(`اشتراک${items.info1} <br>` + `${items.info2} <br> ${items.info3}`
        ));
    })
    this.layerGroup.addLayer(markers);
  }
  private getXYMarkerClusterCounterReader = (xyData: any) => {
    const markers = new L.markerClusterGroup();
    xyData.map((items) => {
      this.flyToDes(this.mapService.envService.mapCenter[0], this.mapService.envService.mapCenter[1], 11);
      markers.addLayer(L.marker([parseFloat(items.y), parseFloat(items.x)])
        .bindPopup(`موبایل: ${items.info1} <br>` + `${items.info2} <br> ${items.info3}`
        ));
    })
    this.layerGroup.addLayer(markers);
  }
  private getXYMarkerClusterForForbidden = (xyData: any) => {
    const markers = new L.markerClusterGroup();
    xyData.map((items) => {
      this.flyToDes(this.mapService.envService.mapCenter[0], this.mapService.envService.mapCenter[1], 11);
      markers.addLayer(L.marker([parseFloat(items.y), parseFloat(items.x)])
        .bindPopup(`${items.info1} <br>` + `اشتراک قبلی:${items.info2} <br> اشتراک بعدی:${items.info3}`
        ));
    })
    this.layerGroup.addLayer(markers);
  }
  private getXYMarkerCluster = (xyData: any) => {
    const markers = new L.markerClusterGroup();
    xyData.map((items) => {
      this.flyToDes(this.mapService.envService.mapCenter[0], this.mapService.envService.mapCenter[1], 11);
      markers.addLayer(L.marker([parseFloat(items.y), parseFloat(items.x)])
        .bindPopup(`${items.info1} <br>` + `${items.info2} <br> ${items.info3}`
        ));
    })
    this.layerGroup.addLayer(markers);
  }
  private extrasConfigOptionsCluster = (xyData: any) => {
    this.removeAllLayers();
    // to have better ux show titles and we implement bottom codes to separate different titles
    if (this.routeParams['isForbidden'] === 'true' ? true : false) {
      this.getXYMarkerClusterForForbidden(xyData);
    }
    else {
      this.getXYMarkerClusterPosition(xyData);
    }
  }
  showCounterReadersLocations = (dataSource: IGisXYResponse[]) => {
    this.markingOnMapNClusterNDelay('markWithoutClusterColorized', dataSource);
  }
  showCounterReadersLocationsByCluster = (dataSource: IGisXYResponse[]) => {
    this.getXYMarkerClusterCounterReader(dataSource);
  }
  showCounterReaders = (dataSource: IGisXYResponse[], showCluster: boolean) => {
    this.utilsService.routeTo(EN_Routes.wr);
    this.removeAllLayers();
    showCluster ? this.showCounterReadersLocationsByCluster(dataSource) : this.showCounterReadersLocations(dataSource)
  }
  mapConfigOptions = (delay: number, isFirstTime: boolean) => {
    this.removeAllLayers();
    if (this.polyline_configs)
      this.mapService.saveToLocalStorage(ENLocalStorageNames.mapAnimationStartFrom, this.polyline_configs);
    if (this.polyline_configs == 0)
      this.mapService.saveToLocalStorage(ENLocalStorageNames.mapAnimationStartFrom, ENRandomNumbers.zero);

    if (this._selectedOrderId === 0) {
      this._isOrderInAsc ? this.markersDataSourceXY.sort(this.dateJalaliService.sortByEshterak) : this.markersDataSourceXY.sort(this.dateJalaliService.sortByEshterakDESC)
    }
    else {
      this._isOrderInAsc ? this.markersDataSourceXY.sort(this.dateJalaliService.sortByDatePersian) : this.markersDataSourceXY.sort(this.dateJalaliService.sortByDateDESCPersian)
    }
    if (isFirstTime) {
      this.drawXYPosition('circleToLeaflet', this.markersDataSourceXY);
    }
    else {
      this.getXYPosition('circleToLeaflet', this.markersDataSourceXY, delay);
      this.leafletDrawPolylines(delay);
    }
  }
  private extrasConfigOptions = (xyData: any) => {
    this.removeAllLayers();
    this.markingOnMapNClusterNDelay('markWithoutCluster', xyData);
  }
  showDashboard = (isShowMap: boolean) => {
    this.isShowMap = isShowMap;
    if (isShowMap) {
      this.utilsService.routeTo(EN_Routes.wr);
    }
    else {
      this.utilsService.routeTo(EN_Routes.wrdb);
    }
    this.changeRouteDetected();
  }
  changeRouteDetected = () => {
    this.subscription.push(this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(res => {
        if (!res)
          return;
        if (this.router.url == EN_Routes.wr)
          this.isShowMap = true;
      })
    )
  }
  private removeAllLayers = () => {
    this.layerGroup.clearLayers();
  }
  private removeLayerButtonLeaflet = () => {
    L.easyButton('fa-close', () => {
      this.removeAllLayers();
    }, 'بستن تمامی لایه ها').addTo(this.map);
  }
  //  circleToLeaflet is for perday counter reader (normal and is Mane!)
  private circleToLeaflet = (lat: number, lng: number, items) => {
    if (lat === 0)
      return;
    items.hasAlert ?
      L.circleMarker([lat, lng], { weight: 4, radius: 3, color: this.color_mane }).addTo(this.layerGroup)
        .bindPopup(`${items.firstName}` + `${items.sureName} <br> اشتراک: ${items.eshterak} <br> ${items.time}`)
      :
      L.circleMarker([lat, lng], { weight: 4, radius: 3, color: this.color_normal }).addTo(this.layerGroup)
        .bindPopup(`${items.firstName}` + `${items.sureName} <br> اشتراک: ${items.eshterak} <br> ${items.time}`)
  }
  private markSingle = (items: any) => {
    this.flyToDes(items.y, items.x, 12);
    L.circleMarker([items.y, items.x], { weight: 4, radius: 3, color: this.color_normal }).addTo(this.layerGroup)
      .bindPopup(
        `${items.firstName} <br>` + `${items.sureName} <br> اشتراک:${items.eshterak} <br> ${'ش.پیگیری :' + items.trackNumber}`
      );
  }
  private markSingleForbidden = (item: any) => {
    this.flyToDes(item.y, item.x, 12);

    L.circleMarker([item.y, item.x], { weight: 4, radius: parseInt(item.gisAccuracy), color: this.color_normal }).addTo(this.layerGroup)
      .bindPopup(
        `${'ناحیه :' + item.zone} <br>` +
        `${'تاریخ :' + item.insertDateJalali} <br>` +
        `${'قرائت کننده :' + item.displayName} <br>` +
        `${'اشتراک قبلی :' + item.preEshterak} <br>` +
        `${'اشتراک بعدی :' + item.nextEshterak} <br>` +
        `${'تعداد واحد :' + item.tedadVahed} <br>` +
        `${item.postalCode} :کد پستی <br>` +
        `${'توضیحات :' + item.description} <br>`
      );
  }
  private findMyLocationLeaflet = (e) => {
    const radius = parseFloat(MathS.getRange(e.accuracy));
    L.marker(e.latlng, { icon: iconSimple }).addTo(this.layerGroup)
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

}