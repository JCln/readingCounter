import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { NgModule } from '@angular/core';
import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';

import { AllImagesRoutingModule } from './all-images-routing.module';
import { AllImagesComponent } from './all-images.component';
import { GalleryAllDetailsComponent } from './gallery-carousel/gallery-all-details/gallery-all-details.component';
import { GalleryCarouselComponent } from './gallery-carousel/gallery-carousel.component';


@NgModule({
  declarations: [
    AllImagesComponent,
    GalleryCarouselComponent,
    GalleryAllDetailsComponent
  ],
  imports: [
    SharedCollapseModule,
    SharedPrimeNgModule,
    AllImagesRoutingModule
  ]
})
export class AllImagesModule { }
