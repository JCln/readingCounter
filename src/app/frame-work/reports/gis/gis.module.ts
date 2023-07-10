import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { GisRoutingModule } from './gis-routing.module';
import { GisComponent } from './gis.component';

@NgModule({
  declarations: [GisComponent],
  imports: [
    SharedModule,
    SharedPrimeNgModule,
    SharedThreeModule,
    GisRoutingModule
  ]
})
export class GisModule { }
