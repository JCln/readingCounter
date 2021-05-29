import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProvinceAddDgComponent } from './province-add-dg/province-add-dg.component';
import { ProvinceEditDgComponent } from './province-edit-dg/province-edit-dg.component';
import { ProvinceRoutingModule } from './province-routing.module';
import { ProvinceComponent } from './province.component';


@NgModule({
  declarations: [ProvinceComponent, ProvinceAddDgComponent, ProvinceEditDgComponent],
  imports: [
    SharedModule,
    SharedPrimeNgModule,
    ReactiveFormsModule,
    ProvinceRoutingModule
  ]
})
export class ProvinceModule { }
