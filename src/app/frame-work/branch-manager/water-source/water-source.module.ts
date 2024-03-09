import { NgModule } from '@angular/core';

import { WaterSourceRoutingModule } from './water-source-routing.module';
import { WaterSourceComponent } from './water-source.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    WaterSourceComponent
  ],
  imports: [
    SharedPrimeNgModule,
    WaterSourceRoutingModule
  ]
})
export class WaterSourceModule { }
