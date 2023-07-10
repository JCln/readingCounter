import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { RrInstateRoutingModule } from './rr-instate-routing.module';
import { RrInstateComponent } from './rr-instate.component';


@NgModule({
  declarations: [
    RrInstateComponent
  ],
  imports: [
    SharedThreeModule,
    SharedPrimeNgModule,
    RrInstateRoutingModule
  ]
})
export class RrInstateModule { }
