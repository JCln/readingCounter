import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProvinceRoutingModule } from './province-routing.module';
import { ProvinceComponent } from './province.component';
import { ProvinceAddDgComponent } from './province-add-dg/province-add-dg.component';
import { ProvinceEditDgComponent } from './province-edit-dg/province-edit-dg.component';


@NgModule({
  declarations: [ProvinceComponent, ProvinceAddDgComponent, ProvinceEditDgComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ProvinceRoutingModule
  ]
})
export class ProvinceModule { }
