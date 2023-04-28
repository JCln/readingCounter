import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ENLocalStorageNames, ENRandomNumbers, ITHV } from 'interfaces/ioverall-config';
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
const markerGreen = new defaultIcon({ iconUrl: 'assets/imgs/leaflet/marker_blue.png' });
const markerRed = new defaultIcon({ iconUrl: 'assets/imgs/leaflet/marker_red.png' });
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

    this.map.attributionControl.setPrefix('TarnamaSepCo');
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
          color: '#0e4c92',
          weight: 1
        }).addTo(this.layerGroup);
      }, i * delay);
    })
  }
  private classWrapper = async () => {
    this.onShowCounterReader.trackNumber = this.route.snapshot.paramMap.get('trackNumber');
    this.onShowCounterReader.day = this.route.snapshot.paramMap.get('day');
    this.onShowCounterReader.isPerday = this.route.snapshot.paramMap.get('isPerday');
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
    const fragmentMaster = this.route.snapshot.paramMap.get('fragmentMasterIds');
    if (fragmentMaster.length) {
      for (let index = 0; index < this.route.snapshot.paramMap.get('fragmentMasterIds').split(',').length; index++) {
        numberOfFragmentMasterIds.push(this.route.snapshot.paramMap.get('fragmentMasterIds').split(',')[index])
      }
    }

    return {
      zoneId: parseInt(this.route.snapshot.paramMap.get('zoneId')),
      isCounterState: this.route.snapshot.paramMap.get('isCounterState') === 'true' ? true : false,
      counterStateId: parseInt(this.route.snapshot.paramMap.get('counterStateId')),
      isKarbariChange: this.route.snapshot.paramMap.get('isKarbariChange') === 'true' ? true : false,
      fragmentMasterIds: numberOfFragmentMasterIds,
      isAhadChange: this.route.snapshot.paramMap.get('isAhadChange') === 'true' ? true : false,
      isForbidden: this.route.snapshot.paramMap.get('isForbidden') === 'true' ? true : false,
      readingPeriodId: parseInt(this.route.snapshot.paramMap.get('readingPeriodId')),
      year: parseInt(this.route.snapshot.paramMap.get('year')),
      fromDate: this.route.snapshot.paramMap.get('fromDate'),
      toDate: this.route.snapshot.paramMap.get('toDate'),
      isCluster: this.route.snapshot.paramMap.get('isCluster') === 'true' ? true : false
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
    const postalCode = this.route.snapshot.paramMap.get('postalCode');
    const nextEshterak = this.route.snapshot.paramMap.get('nextEshterak');
    const preEshterak = this.route.snapshot.paramMap.get('preEshterak');
    this.markSingleForbidden({ x: x, y: y, postalCode: postalCode, preEshterak: preEshterak, nextEshterak: nextEshterak });
  }
  private simpleMarkSingleLocation = (x: string, y: string) => {
    const trackNumber = this.route.snapshot.paramMap.get('trackNumber');
    const sureName = this.route.snapshot.paramMap.get('sureName');
    const eshterak = this.route.snapshot.paramMap.get('eshterak');
    const firstName = this.route.snapshot.paramMap.get('firstName');
    this.markSingle({ x: x, y: y, firstName: firstName, sureName: sureName, eshterak: eshterak, trackNumber: trackNumber });
  }
  private singleMarksManager = () => {
    const _isForbidden = this.route.snapshot.paramMap.get('isForbidden') == 'true' ? true : false;
    const x = this.route.snapshot.paramMap.get('x');
    const y = this.route.snapshot.paramMap.get('y');

    if (_isForbidden) {
      this.forbiddenMarkSingleLocation(x, y);
    } else {
      this.simpleMarkSingleLocation(x, y);
    }
  }
  private clusterManager = () => {
    this._isCluster = this.route.snapshot.paramMap.get('isCluster') == 'true' ? true :
      this.route.snapshot.paramMap.get('isCluster') == 'false' ? false : null;
    if (this._isCluster == false || this._isCluster == true)
      this.classWrapperCluster();
  }
  private getRouteParams = () => {
    this.onShowCounterReader.distance = this.route.snapshot.paramMap.get('distance');

    if (!MathS.isNull(this.onShowCounterReader.distance)) {
      this.classWrapper();
      return;
    }
    this._isSingle = this.route.snapshot.paramMap.get('isSingle') == 'true' ? true : false;
    if (this._isSingle) {
      this.singleMarksManager();
    }
    else {
      this.clusterManager();
    }
  }
  ngOnInit(): void {
    // this.getMapItems();
    this.initMap();
    this.getRouteParams();
    this.mapService.serviceInstantiate(this.map);
    this.mapService.addButtonsToLeaflet();
    this.removeLayerButtonLeaflet();
    this.myLocationButtonLeaflet();
    // this.toggleMapView();
  }
  private flyToDes = (lat: number, lag: number, zoom: number) => {
    if (lat != 0 || lag != 0) {

      lat = parseFloat(lat.toString().substring(0, 6));
      lag = parseFloat(lag.toString().substring(0, 6));

      this.map.flyTo([(lat), (lag)], zoom);
    }
  }
  private panToDes = (lat: number, lag: number) => {
    if (lat != 0 || lag != 0) {

      lat = parseFloat(lat.toString().substring(0, 6));
      lag = parseFloat(lag.toString().substring(0, 6));

      this.map.panTo([(lat), (lag)]);
    }
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  // get X Y positions
  private getXYPosition = (method: string, xyData: any, delay?: number) => {
    xyData.map((items, i) => {
      setTimeout(() => {
        this[method](parseFloat(items.y), parseFloat(items.x), items);
        this.panToDes(items.y, items.x);
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
  private getXYMarkerClusterPosition = (xyData: any) => {
    const markers = new L.markerClusterGroup();
    xyData.map((items) => {
      this.flyToDes(this.mapService.envService.mapCenter[0], this.mapService.envService.mapCenter[1], 11);
      markers.addLayer(L.marker([parseFloat(items.y), parseFloat(items.x)])
        .bindPopup(`${items.info1} <br>` + `${items.info2} <br> ${items.info3}`
        ));
    })
    this.layerGroup.addLayer(markers);
  }
  showCounterReadersLocations = (dataSource: IGisXYResponse[]) => {
    this.utilsService.routeTo(EN_Routes.wr);
    this.removeAllLayers();
    this.markingOnMapNClusterNDelay('markWithoutClusterColorized', dataSource);
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
  private extrasConfigOptionsCluster = (xyData: any) => {
    this.removeAllLayers();
    this.getXYMarkerClusterPosition(xyData);
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
  private circleToLeaflet = (lat: number, lng: number, items) => {
    if (lat === 0)
      return;
    L.marker([lat, lng], { weight: 4, radius: 3, icon: items.counterStateTitle === 'بسته' ? markerRed : markerGreen }).addTo(this.layerGroup)
      .bindPopup(`${items.firstName}` + `${items.sureName} <br> ${items.eshterak} <br> ${items.time}`);
  }
  private markWithoutCluster = (lat: number, lng: number, items) => {
    if (lat === 0)
      return;
    L.circleMarker([lat, lng], { weight: 4, radius: 3, color: '#116fff' }).addTo(this.layerGroup)
      .bindPopup(
        `${items.info1} <br>` + `${items.info2} <br> ${items.info3}`
      );
  }
  private markWithoutClusterColorized = (lat: number, lng: number, items) => {
    if (lat === 0)
      return;
    L.marker([lat, lng]).addTo(this.layerGroup)
      .bindPopup(
        `${items.info1} <br>` + `${items.info2} <br> ${items.info3}`
      );
  }
  private markSingle = (items: any) => {
    this.flyToDes(items.y, items.x, 12);
    L.circleMarker([items.y, items.x], { weight: 4, radius: 3, color: '#116fff' }).addTo(this.layerGroup)
      .bindPopup(
        `${items.firstName} <br>` + `${items.sureName} <br> ${items.eshterak} <br> ${'ش.پ :' + items.trackNumber}`
      );
  }
  private markSingleForbidden = (items: any) => {
    this.flyToDes(items.y, items.x, 12);
    L.circleMarker([items.y, items.x], { weight: 4, radius: 3, color: '#116fff' }).addTo(this.layerGroup)
      .bindPopup(
        `${'کد پستی :' + items.postalCode} <br>` + `${'اشتراک قبلی :' + items.preEshterak} <br> ${'اشتراک بعدی :' + items.nextEshterak}`
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