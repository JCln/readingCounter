import { NgModule } from '@angular/core';

import { VillageRoutingModule } from './village-routing.module';
import { VillageComponent } from './village.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { VillageDgComponent } from './village-dg/village-dg.component';


@NgModule({
  declarations: [
    VillageComponent,
    VillageDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    VillageRoutingModule
  ]
})
export class VillageModule { }
