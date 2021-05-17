import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { TxtOutputRoutingModule } from './txt-output-routing.module';
import { TxtOutputComponent } from './txt-output.component';


@NgModule({
  declarations: [TxtOutputComponent],
  imports: [
    SharedPrimeNgModule,
    TxtOutputRoutingModule
  ]
})
export class TxtOutputModule { }
