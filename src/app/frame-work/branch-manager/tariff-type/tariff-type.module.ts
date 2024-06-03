import { NgModule } from '@angular/core';

import { TariffTypeRoutingModule } from './tariff-type-routing.module';
import { TariffTypeComponent } from './tariff-type.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { TariffTypeDgComponent } from './tariff-type-dg/tariff-type-dg.component';


@NgModule({
  declarations: [TariffTypeComponent, TariffTypeDgComponent],
  imports: [
    SharedPrimeNgModule,
    TariffTypeRoutingModule
  ]
})
export class TariffTypeModule { }
