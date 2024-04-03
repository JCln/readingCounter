import { NgModule } from '@angular/core';

import { TariffParameterRoutingModule } from './tariff-parameter-routing.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { TariffParameterComponent } from './tariff-parameter.component';
import { TariffParameterAddDgComponent } from './tariff-parameter-add-dg/tariff-parameter-add-dg.component';
import { TariffParameterEditDgComponent } from './tariff-parameter-edit-dg/tariff-parameter-edit-dg.component';


@NgModule({
  declarations: [
    TariffParameterComponent,
    TariffParameterAddDgComponent,
    TariffParameterEditDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    TariffParameterRoutingModule
  ]
})
export class TariffParameterModule { }
