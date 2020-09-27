import '../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';

import { Component, OnInit } from '@angular/core';

import { InteractionService } from '../services/interaction.service';

declare let L;
@Component({
  selector: 'app-frame-work',
  templateUrl: './frame-work.component.html',
  styleUrls: ['./frame-work.component.scss']
})
export class FrameWorkComponent implements OnInit {
  title: string = '';

  constructor(private interactionService: InteractionService) { }

  ngOnInit(): void {
    this.interactionService.getPageTitle().subscribe(title => this.title = title);

    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.Routing.control({
      waypoints: [
        L.latLng(57.74, 11.94),
        L.latLng(57.6792, 11.949)
      ]
    }).addTo(map);

    map.addControl(new L.Control.Fullscreen());
  }

}
