import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedCarouselModule } from 'src/app/shared/shared_carousel';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { AllRoutingModule } from './all-routing.module';
import { AllComponent } from './all.component';

@NgModule({
  declarations: [
    AllComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedThreeModule,
    SharedModule,
    SharedCarouselModule,
    AllRoutingModule
  ]
})
export class AllModule { }
