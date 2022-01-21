import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { CarouselWoumComponent } from './carousel-woum/carousel-woum.component';
import { WoumComponent } from './carousel-woum/woum/woum.component';
import { RrLockedRoutingModule } from './rr-locked-routing.module';
import { RrLockedComponent } from './rr-locked.component';


@NgModule({
  declarations: [
    RrLockedComponent,
    CarouselWoumComponent,
    WoumComponent,
  ],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedThreeModule,
    RrLockedRoutingModule
  ]
})
export class RrLockedModule { }
