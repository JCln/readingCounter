import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { FragmentDetailsRoutingModule } from './fragment-details-routing.module';
import { FragmentDetailsComponent } from './fragment-details.component';
import { FdDgComponent } from './fd-dg/fd-dg.component';


@NgModule({
  declarations: [FragmentDetailsComponent, FdDgComponent],
  imports: [
    SharedPrimeNgModule,
    FragmentDetailsRoutingModule
  ]
})
export class FragmentDetailsModule { }
