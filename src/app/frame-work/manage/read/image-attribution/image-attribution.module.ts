import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { ImageAttributionRoutingModule } from './image-attribution-routing.module';
import { ImageAttributionComponent } from './image-attribution.component';


@NgModule({
  declarations: [
    ImageAttributionComponent
  ],
  imports: [
    SharedPrimeNgModule,
    ImageAttributionRoutingModule
  ]
})
export class ImageAttributionModule { }
