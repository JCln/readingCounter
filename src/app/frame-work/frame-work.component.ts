import '../../../node_modules/leaflet-easyprint';
import '../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import '../../../src/assets/L.EasyButton/src/easy-button.js';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { InteractionService } from '../services/interaction.service';

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
export class FrameWorkComponent implements OnInit {
  @Input() pageTitle: string = '';
  orderId;

  constructor(private interactionService: InteractionService, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('isShowMap');
  }
  ngOnChanges(): void {


  }
  ngAfterViewInit(): void {
    // const navigation = this.router.getCurrentNavigation();
    // console.log(navigation);

    // this.orderId = navigation.extras.state ? navigation.extras.state.orderId : 0;

  }

}