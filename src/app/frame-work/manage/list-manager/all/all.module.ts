import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { AllRoutingModule } from './all-routing.module';
import { AllComponent } from './all.component';


@NgModule({
  declarations: [AllComponent],
  imports: [
    SharedPrimeNgModule,
    AllRoutingModule
  ]
})
export class AllModule { }
