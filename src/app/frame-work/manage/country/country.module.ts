import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../../../shared/shared.module';
import { CountryRoutingModule } from './country-routing.module';
import { CountryComponent } from './country.component';


@NgModule({
  declarations: [CountryComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CountryRoutingModule
  ]
})
export class CountryModule { }
