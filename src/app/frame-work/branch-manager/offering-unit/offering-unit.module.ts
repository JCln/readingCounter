import { NgModule } from '@angular/core';

import { OfferingUnitRoutingModule } from './offering-unit-routing.module';
import { OfferingUnitComponent } from './offering-unit.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { OfferingUnitAddDgComponent } from './offering-unit-add-dg/offering-unit-add-dg.component';
import { OfferingUnitEditDgComponent } from './offering-unit-edit-dg/offering-unit-edit-dg.component';


@NgModule({
  declarations: [
    OfferingUnitComponent,
    OfferingUnitAddDgComponent,
    OfferingUnitEditDgComponent,
  ],
  imports: [
    SharedPrimeNgModule,
    OfferingUnitRoutingModule
  ]
})
export class OfferingUnitModule { }
