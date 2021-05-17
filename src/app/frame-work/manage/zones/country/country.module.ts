import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../../../shared/shared.module';
import { CountryRoutingModule } from './country-routing.module';
import { CountryComponent } from './country.component';
import { CountryAddDgComponent } from './country-add-dg/country-add-dg.component';
import { CountryEditDgComponent } from './country-edit-dg/country-edit-dg.component';


@NgModule({
  declarations: [CountryComponent, CountryAddDgComponent, CountryEditDgComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CountryRoutingModule
  ]
})
export class CountryModule { }
