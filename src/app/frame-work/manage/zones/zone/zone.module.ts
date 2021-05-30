import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ZoneAddDgComponent } from './zone-add-dg/zone-add-dg.component';
import { ZoneRoutingModule } from './zone-routing.module';
import { ZoneComponent } from './zone.component';


@NgModule({
  declarations: [ZoneComponent, ZoneAddDgComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    ZoneRoutingModule
  ]
})
export class ZoneModule { }
