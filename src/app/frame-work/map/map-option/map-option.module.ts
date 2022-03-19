import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LocationsComponent } from './locations/locations.component';
import { MapOptionRoutingModule } from './map-option-routing.module';


@NgModule({
  declarations: [
    LocationsComponent
  ],
  imports: [
    CommonModule,
    MapOptionRoutingModule
  ],
  exports: [LocationsComponent]
})
export class MapOptionModule { }
