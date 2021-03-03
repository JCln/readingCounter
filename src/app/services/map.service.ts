import '../../../node_modules/leaflet.markercluster/dist/leaflet.markercluster.js';

import { Injectable } from '@angular/core';
import { ListManagerService } from 'src/app/services/list-manager.service';

declare let L;

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
@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: L.Map;
  private layerGroup = new L.FeatureGroup();

  constructor(
    private listManagerService: ListManagerService
  ) { }

  addMarkerCluster = () => {
    const markers = L.markerClusterGroup();
    this.map.addLayer(markers);
  }
  addInvalidateMap = () => {
    this.map.invalidateSize();
  }
  fullScreen = () => {
    this.map.addControl(new L.Control.Fullscreen());
  }
  refreshMapButtonLeaflet = () => {
    L.easyButton('fa-refresh', () => {
      this.addInvalidateMap();
    }, 'بارگزاری مجدد نقشه').addTo(this.map);
  }
  findMyLocationLeaflet = (e) => {
    const radius = e.accuracy;
    L.marker(e.latlng).addTo(this.map)
      .bindPopup("شما در حدود تقریبی " + radius + " متر از این مکان قرار دارید").openPopup();

    L.circle(e.latlng, radius).addTo(this.map);
  }
  onLocationError = (e) => {
    alert(e.message);
  }
  myLocationButtonLeaflet = () => {
    L.easyButton('fa-map-marker', () => {
      this.map.locate({ setView: true, maxZoom: 16 });
      this.map.on('locationfound', this.findMyLocationLeaflet);
      this.map.on('locationerror', this.onLocationError);
    }, 'مکان من').addTo(this.map);
  }
  easyprintButtonLeaflet = () => {
    L.easyPrint({
      position: 'bottomleft',
      sizeModes: ['A4Portrait', 'A4Landscape']
    }).addTo(this.map);
  }
  addButtonsToLeaflet = () => {
    this.fullScreen();
    this.refreshMapButtonLeaflet();
    this.myLocationButtonLeaflet();
    this.easyprintButtonLeaflet();
  }
  callPointerMarks = (data: object) => {
    return this.listManagerService.postLMPDXY(data);
  }
  serviceInstantiate = (map: L.Map) => {
    this.map = map;
  }
}
