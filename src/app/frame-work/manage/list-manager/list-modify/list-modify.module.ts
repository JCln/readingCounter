import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { CarouselComponent } from './carousel/carousel.component';
import { OffloadComponent } from './carousel/offload/offload.component';
import { ListModifyRoutingModule } from './list-modify-routing.module';
import { ListModifyComponent } from './list-modify.component';


@NgModule({
  declarations: [
    ListModifyComponent,
    CarouselComponent,
    OffloadComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedThreeModule,
    SharedModule,
    ListModifyRoutingModule
  ],
})
export class ListModifyModule { }
