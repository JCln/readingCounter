import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { SimafaSingleRoutingModule } from './simafa-single-routing.module';
import { SimafaSingleComponent } from './simafa-single.component';


@NgModule({
  declarations: [SimafaSingleComponent],
  imports: [
    SharedPrimeNgModule,
    SimafaSingleRoutingModule
  ]
})
export class SimafaSingleModule { }
