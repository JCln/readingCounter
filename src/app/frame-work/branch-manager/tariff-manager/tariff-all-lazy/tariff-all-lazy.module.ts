import { NgModule } from '@angular/core';

import { TariffAllLazyRoutingModule } from './tariff-all-lazy-routing.module';
import { TariffAllLazyComponent } from './tariff-all-lazy.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    TariffAllLazyComponent
  ],
  imports: [
    SharedPrimeNgModule,
    TariffAllLazyRoutingModule
  ]
})
export class TariffAllLazyModule { }
