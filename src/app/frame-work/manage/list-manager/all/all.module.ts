import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { AllRoutingModule } from './all-routing.module';
import { AllComponent } from './all.component';
import { CarouselWoumComponent } from './carousel-woum/carousel-woum.component';
import { WoumComponent } from './carousel-woum/woum/woum.component';
import { CarouselComponent } from './carousel/carousel.component';
import { OffloadComponent } from './carousel/offload/offload.component';
import { MapDgComponent } from './map-dg/map-dg.component';

@NgModule({
  declarations: [
    AllComponent,
    CarouselComponent,
    OffloadComponent,
    WoumComponent,
    CarouselWoumComponent,
    MapDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedThreeModule,
    SharedModule,
    AllRoutingModule
  ]
})
export class AllModule { }
