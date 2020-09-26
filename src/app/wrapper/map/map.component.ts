import { AfterViewInit, Component, OnInit } from '@angular/core';

import { test1 } from '../../../test1';
import { MapService } from './../../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  constructor(private mapService: MapService) { 
    console.log(test1());
    
  }

  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this.mapService.initMap();
  }

}