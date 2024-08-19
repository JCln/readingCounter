import { NgModule } from '@angular/core';

import { ExcelToFillRoutingModule } from './excel-to-fill-routing.module';
import { ExcelToFillComponent } from './excel-to-fill.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { RatesDgComponent } from './rates-dg/rates-dg.component';


@NgModule({
  declarations: [ExcelToFillComponent, RatesDgComponent],
  imports: [
    SharedPrimeNgModule,
    ExcelToFillRoutingModule
  ]
})
export class ExcelToFillModule { }
