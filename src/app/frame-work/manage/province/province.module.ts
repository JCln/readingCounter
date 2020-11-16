import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProvinceRoutingModule } from './province-routing.module';
import { ProvinceComponent } from './province.component';
import { ProvinceAddDgComponent } from './province-add-dg/province-add-dg.component';


@NgModule({
  declarations: [ProvinceComponent, ProvinceAddDgComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ProvinceRoutingModule
  ]
})
export class ProvinceModule { }
