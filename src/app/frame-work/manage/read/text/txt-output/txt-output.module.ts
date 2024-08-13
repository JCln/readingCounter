import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { TxtOutputRoutingModule } from './txt-output-routing.module';
import { TxtOutputComponent } from './txt-output.component';
import { TxtOutputDgComponent } from './txt-output-dg/txt-output-dg.component';


@NgModule({
  declarations: [TxtOutputComponent, TxtOutputDgComponent],
  imports: [
    SharedPrimeNgModule,
    TxtOutputRoutingModule
  ]
})
export class TxtOutputModule { }
