import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedSortByModule } from 'src/app/shared/shared-sort-by';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedCarouselModule } from 'src/app/shared/shared_carousel';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { RrLockedRoutingModule } from './rr-locked-routing.module';
import { RrLockedComponent } from './rr-locked.component';


@NgModule({
  declarations: [
    RrLockedComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedThreeModule,
    SharedCarouselModule,
    SharedSortByModule,
    RrLockedRoutingModule
  ]
})
export class RrLockedModule { }
