import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { PrfmResRoutingModule } from './prfm-res-routing.module';
import { PrfmResComponent } from './prfm-res.component';


@NgModule({
  declarations: [PrfmResComponent],
  imports: [
    SharedPrimeNgModule,
    PrfmResRoutingModule
  ]
})
export class PrfmResModule { }
