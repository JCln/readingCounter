import { NgModule } from '@angular/core';

import { TariffAllLazyRoutingModule } from './tariff-all-lazy-routing.module';
import { TariffAllLazyComponent } from './tariff-all-lazy.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { TariffAllLazyDgComponent } from './tariff-all-lazy/tariff-all-lazy-dg/tariff-all-lazy-dg.component';


@NgModule({
  declarations: [
    TariffAllLazyComponent,
    TariffAllLazyDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    TariffAllLazyRoutingModule
  ]
})
export class TariffAllLazyModule { }
