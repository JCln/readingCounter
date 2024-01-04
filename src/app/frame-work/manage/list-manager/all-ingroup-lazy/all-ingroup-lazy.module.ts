import { NgModule } from '@angular/core';

import { AllIngroupLazyRoutingModule } from './all-ingroup-lazy-routing.module';
import { AllIngroupLazyComponent } from './all-ingroup-lazy.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    AllIngroupLazyComponent
  ],
  imports: [
    SharedPrimeNgModule,
    AllIngroupLazyRoutingModule
  ]
})
export class AllIngroupLazyModule { }
