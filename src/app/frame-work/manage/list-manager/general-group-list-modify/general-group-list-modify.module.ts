import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedCarouselModule } from 'src/app/shared/shared_carousel';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { GeneralGroupListModifyRoutingModule } from './general-group-list-modify-routing.module';
import { GeneralGroupListModifyComponent } from './general-group-list-modify.component';


@NgModule({
  declarations: [
    GeneralGroupListModifyComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedThreeModule,
    SharedModule,
    SharedCarouselModule,
    GeneralGroupListModifyRoutingModule
  ]
})
export class GeneralGroupListModifyModule { }
