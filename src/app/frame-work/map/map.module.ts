import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';


@NgModule({
  declarations: [MapComponent],
  imports: [
    SharedPrimeNgModule,
    MapRoutingModule
  ]
})
export class MapModule { }
