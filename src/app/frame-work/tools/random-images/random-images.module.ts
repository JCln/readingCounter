import { NgModule } from '@angular/core';
import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import {
    RandomImageCarouselDetailsComponent,
} from './random-image-carousel/random-image-carousel-details/random-image-carousel-details.component';
import { RandomImageCarouselComponent } from './random-image-carousel/random-image-carousel.component';
import { RandomImagesRoutingModule } from './random-images-routing.module';
import { RandomImagesComponent } from './random-images.component';


@NgModule({
  declarations: [
    RandomImagesComponent,
    RandomImageCarouselComponent,
    RandomImageCarouselDetailsComponent
  ],
  imports: [
    SharedCollapseModule,
    SharedPrimeNgModule,
    SharedThreeModule,
    RandomImagesRoutingModule
  ]
})
export class RandomImagesModule { }
