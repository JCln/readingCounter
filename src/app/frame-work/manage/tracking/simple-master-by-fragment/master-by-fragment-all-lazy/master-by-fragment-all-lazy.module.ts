import { NgModule } from '@angular/core';

import { MasterByFragmentAllLazyRoutingModule } from './master-by-fragment-all-lazy-routing.module';
import { MasterByFragmentAllLazyComponent } from './master-by-fragment-all-lazy.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    MasterByFragmentAllLazyComponent
  ],
  imports: [
    SharedPrimeNgModule,
    MasterByFragmentAllLazyRoutingModule
  ]
})
export class MasterByFragmentAllLazyModule { }
