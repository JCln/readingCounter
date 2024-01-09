import { NgModule } from '@angular/core';

import { AllLazyRoutingModule } from './all-lazy-routing.module';
import { AllLazyComponent } from './all-lazy.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    AllLazyComponent
  ],
  imports: [
    SharedPrimeNgModule,
    AllLazyRoutingModule
  ]
})
export class AllLazyModule { }
