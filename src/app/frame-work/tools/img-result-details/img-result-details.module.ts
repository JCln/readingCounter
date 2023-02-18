import { NgModule } from '@angular/core';
import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { ImgResultDetailsRoutingModule } from './img-result-details-routing.module';
import { ImgResultDetailsComponent } from './img-result-details.component';
import { ImgResultCarouselComponent } from './img-result-carousel/img-result-carousel.component';
import { ImgResultDetailsCarouselComponent } from './img-result-carousel/img-result-details-carousel/img-result-details-carousel.component';


@NgModule({
  declarations: [
    ImgResultDetailsComponent,
    ImgResultCarouselComponent,
    ImgResultDetailsCarouselComponent
  ],
  imports: [
    SharedCollapseModule,
    SharedPrimeNgModule,
    SharedThreeModule,
    ImgResultDetailsRoutingModule
  ]
})
export class ImgResultDetailsModule { }
