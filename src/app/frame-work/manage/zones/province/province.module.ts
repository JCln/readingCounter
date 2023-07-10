import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProvinceAddDgComponent } from './province-add-dg/province-add-dg.component';
import { ProvinceRoutingModule } from './province-routing.module';
import { ProvinceComponent } from './province.component';


@NgModule({
  declarations: [ProvinceComponent, ProvinceAddDgComponent],
  imports: [
    SharedModule,
    SharedPrimeNgModule,
    ProvinceRoutingModule
  ]
})
export class ProvinceModule { }
