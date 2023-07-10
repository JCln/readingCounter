import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { CountryAddDgComponent } from './country-add-dg/country-add-dg.component';
import { CountryRoutingModule } from './country-routing.module';
import { CountryComponent } from './country.component';


@NgModule({
  declarations: [CountryComponent, CountryAddDgComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    CountryRoutingModule
  ]
})
export class CountryModule { }
