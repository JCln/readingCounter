import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { FragmentDetailsRoutingModule } from './fragment-details-routing.module';
import { FragmentDetailsComponent } from './fragment-details.component';


@NgModule({
  declarations: [FragmentDetailsComponent],
  imports: [
    SharedPrimeNgModule,
    FragmentDetailsRoutingModule
  ]
})
export class FragmentDetailsModule { }
