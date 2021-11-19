import { NgModule } from '@angular/core';
import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';

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
    SharedTwoModule,
    SharedCollapseModule,
    AllImagesRoutingModule
  ]
})
export class AllImagesModule { }
