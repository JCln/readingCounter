import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedCarouselModule } from 'src/app/shared/shared_carousel';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { GeneralListModifyRoutingModule } from './general-list-modify-routing.module';
import { GeneralListModifyComponent } from './general-list-modify.component';


@NgModule({
  declarations: [
    GeneralListModifyComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedThreeModule,
    SharedModule,
    SharedCarouselModule,
    GeneralListModifyRoutingModule
  ]
})
export class GeneralListModifyModule { }
