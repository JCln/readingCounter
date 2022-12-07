import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { RrFragmentRoutingModule } from './rr-fragment-routing.module';
import { RrFragmentComponent } from './rr-fragment.component';


@NgModule({
  declarations: [
    RrFragmentComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedThreeModule,
    RrFragmentRoutingModule
  ]
})
export class RrFragmentModule { }
