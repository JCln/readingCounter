import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { WaterRoutingModule } from './water-routing.module';
import { WaterComponent } from './water.component';


@NgModule({
  declarations: [WaterComponent],
  imports: [
    SharedPrimeNgModule,
    WaterRoutingModule
  ]
})
export class WaterModule { }
