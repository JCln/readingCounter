import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { AllRoutingModule } from './all-routing.module';
import { AllComponent } from './all.component';
import { CarouselComponent } from './carousel/carousel.component';
import { OffloadComponent } from './carousel/offload/offload.component';

@NgModule({
  declarations: [AllComponent, CarouselComponent, OffloadComponent],
  imports: [
    SharedPrimeNgModule,
    SharedThreeModule,
    SharedModule,
    AllRoutingModule
  ]
})
export class AllModule { }
