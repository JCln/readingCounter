import { NgModule } from '@angular/core';

import { TariffManagerRoutingModule } from './tariff-manager-routing.module';
import { TariffManagerComponent } from './tariff-manager.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

@NgModule({
  declarations: [
    TariffManagerComponent
  ],
  imports: [
    SharedPrimeNgModule,
    TariffManagerRoutingModule
  ]
})
export class TariffManagerModule { }
