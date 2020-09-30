import '../../../node_modules/leaflet-easyprint';
import '../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import '../../../src/assets/L.EasyButton/src/easy-button.js';

import { AfterViewInit, Component, OnInit } from '@angular/core';

import { InteractionService } from '../services/interaction.service';
import { MapService } from './../services/map.service';

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

@Component({
  selector: 'app-frame-work',
  templateUrl: './frame-work.component.html',
  styleUrls: ['./frame-work.component.scss']
})
export class FrameWorkComponent implements OnInit, AfterViewInit {
  title: string = '';

  constructor(private interactionService: InteractionService, private mapService: MapService) {

  }
  private initMap = () => {
    this.interactionService.getPageTitle().subscribe(title => this.title = title);

  }
  ngOnInit(): void {
    this.initMap();
  }

  ngAfterViewInit(): void {
  }

}