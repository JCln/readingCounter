import { NgModule } from '@angular/core';
import { MasterByFragmentAllInGroupLazyRoutingModule } from './master-by-fragment-all-in-group-lazy-routing.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { MasterByFragmentAllInGroupLazyComponent } from './master-by-fragment-all-in-group-lazy.component';


@NgModule({
  declarations: [
    MasterByFragmentAllInGroupLazyComponent
  ],
  imports: [
    SharedPrimeNgModule,
    MasterByFragmentAllInGroupLazyRoutingModule
  ]
})
export class MasterByFragmentAllInGroupLazyModule { }
