import { NgModule } from '@angular/core';

import { ZoneConstantRoutingModule } from './zone-constant-routing.module';
import { ZoneConstantComponent } from './zone-constant.component';
import { ZoneConstantDgComponent } from './zone-constant-dg/zone-constant-dg.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    ZoneConstantComponent,
    ZoneConstantDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    ZoneConstantRoutingModule
  ]
})
export class ZoneConstantModule { }
