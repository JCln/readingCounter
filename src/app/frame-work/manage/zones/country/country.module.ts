import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { CountryAddDgComponent } from './country-add-dg/country-add-dg.component';
import { CountryEditDgComponent } from './country-edit-dg/country-edit-dg.component';
import { CountryRoutingModule } from './country-routing.module';
import { CountryComponent } from './country.component';


@NgModule({
  declarations: [CountryComponent, CountryAddDgComponent, CountryEditDgComponent],
  imports: [
    SharedModule,
    SharedPrimeNgModule,
    ReactiveFormsModule,
    CountryRoutingModule
  ]
})
export class CountryModule { }
