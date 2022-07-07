import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { WaterRoutingModule } from './water-routing.module';
import { WaterComponent } from './water.component';
import { WaterBatchAddDgComponent } from './water-batch-add-dg/water-batch-add-dg.component';


@NgModule({
  declarations: [WaterComponent, WaterBatchAddDgComponent],
  imports: [
    SharedPrimeNgModule,
    WaterRoutingModule
  ]
})
export class WaterModule { }
