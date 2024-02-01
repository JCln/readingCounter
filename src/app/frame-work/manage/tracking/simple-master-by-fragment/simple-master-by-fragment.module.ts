import { NgModule } from '@angular/core';

import { SimpleMasterByFragmentRoutingModule } from './simple-master-by-fragment-routing.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SimpleMasterByFragmentComponent } from './simple-master-by-fragment.component';


@NgModule({
  declarations: [
    SimpleMasterByFragmentComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SimpleMasterByFragmentRoutingModule
  ]
})
export class SimpleMasterByFragmentModule { }
