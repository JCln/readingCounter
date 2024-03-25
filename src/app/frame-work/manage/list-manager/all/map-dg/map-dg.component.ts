import { Component, OnInit } from '@angular/core';
import { ENRandomNumbers, ENCompanyName } from 'interfaces/enums.enum';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EnvService } from 'services/env.service';
import { MapService } from 'services/map.service';

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
L.Marker.prototype.options.icon = simpleIcon;
const MAX_LENGTH = 1;
let _markerValue = [];

@Component({
  selector: 'app-map-dg',
  templateUrl: './map-dg.component.html',
  styleUrls: ['./map-dg.component.scss']
})
export class MapDgComponent implements OnInit {
  private layerGroup3 = new L.FeatureGroup();
  private map3: L.Map;

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

    this.map3.flyTo([(lat), (lag)], zoom);
  }

  private markSingle = (items: any) => {
    this.flyToDes(items.y, items.x, 12);
    L.circleMarker([items.y, items.x], { weight: 4, radius: 3, color: '#116fff' }).addTo(this.layerGroup3)
      .bindPopup(
        `${items.firstName} <br>` + `${items.sureName} <br> اشتراک: ${items.eshterak} <br> ${items.trackNumber ? 'ش.پ :' + items.trackNumber : ''}`
      );
  }
  private simpleMarkSingleLocation = (x: string, y: string) => {
    this.markSingle({ x: x, y: y, firstName: this.config.data.firstName, sureName: this.config.data.sureName, eshterak: this.config.data.eshterak, trackNumber: this.config.data.trackNumber });
  }
  private getOverlays = () => {
    return {
      "لایه ها": this.layerGroup3
    };
  }
  initMap = () => {
    this.map3 = L.map('map3', {
      center: this.envService.mapCenter,
      zoom: ENRandomNumbers.fifteen,
      minZoom: ENRandomNumbers.four,
      maxZoom: ENRandomNumbers.eighteen,
      layers: [this.mapService.getFirstItemUrl(), this.layerGroup3]
    });
    this.map3.attributionControl.setPrefix(ENCompanyName.title);
    L.control.layers(this.mapService.getBaseMap(), this.getOverlays()).addTo(this.map3);
  }
  initMapNewMarker = () => {
    this.map3 = L.map('map3', {
      center: this.envService.mapCenter,
      zoom: ENRandomNumbers.fifteen,
      minZoom: ENRandomNumbers.four,
      maxZoom: ENRandomNumbers.eighteen,
      layers: [this.mapService.getFirstItemUrl(), this.layerGroup3]
    });

    this.map3.attributionControl.setPrefix(ENCompanyName.title);
    var markersGroup = L.layerGroup();
    this.map3.addLayer(markersGroup);

    this.map3.on('mouseup', function (e) {
      // get the count of currently displayed markers
      var markersCount = markersGroup.getLayers().length;

      if (markersCount < MAX_LENGTH) {
        // var marker = L.marker(e.latlng).addTo(markersGroup);
        L.marker([e.latlng.lat, e.latlng.lng]).addTo(markersGroup);
        _markerValue = [e.latlng.lat, e.latlng.lng];
        return;
      }
      // remove the markers when MARKERS_MAX is reached
      _markerValue = [];
      markersGroup.clearLayers();
    });
  }
  ngOnInit(): void {
    if (this.config.data.newMarker) {
      this.initMapNewMarker();
    }
    else {
      this.initMap();
      const x = this.config.data.x;
      const y = this.config.data.y;
      this.simpleMarkSingleLocation(x, y);
    }
  }
  close() {
    this.ref.close();
  }
  closeWithMarkerValue() {
    this.ref.close(_markerValue);
  }

}
