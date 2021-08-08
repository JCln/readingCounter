import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SimafaBatchRoutingModule } from './simafa-batch-routing.module';
import { SimafaBatchComponent } from './simafa-batch.component';


@NgModule({
  declarations: [SimafaBatchComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SimafaBatchRoutingModule
  ]
})
export class SimafaBatchModule { }
