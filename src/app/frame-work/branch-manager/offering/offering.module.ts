import { NgModule } from '@angular/core';

import { OfferingRoutingModule } from './offering-routing.module';
import { OfferingComponent } from './offering.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { OfferingAddDgComponent } from './offering-add-dg/offering-add-dg.component';
import { OfferingEditDgComponent } from './offering-edit-dg/offering-edit-dg.component';


@NgModule({
  declarations: [
    OfferingComponent,
    OfferingAddDgComponent,
    OfferingEditDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    OfferingRoutingModule
  ]
})
export class OfferingModule { }
