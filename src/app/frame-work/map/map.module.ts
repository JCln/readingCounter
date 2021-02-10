import { NgModule } from '@angular/core';
import { NgxLeafletFullscreenModule } from '@runette/ngx-leaflet-fullscreen';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';


@NgModule({
  declarations: [MapComponent],
  imports: [
    SharedPrimeNgModule,
    NgxLeafletFullscreenModule,
    MapRoutingModule
  ]
})
export class MapModule { }
