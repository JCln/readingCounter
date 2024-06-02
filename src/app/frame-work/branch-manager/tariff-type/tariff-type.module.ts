import { NgModule } from '@angular/core';

import { TariffTypeRoutingModule } from './tariff-type-routing.module';
import { TariffTypeComponent } from './tariff-type.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [TariffTypeComponent],
  imports: [
    SharedPrimeNgModule,
    TariffTypeRoutingModule
  ]
})
export class TariffTypeModule { }
