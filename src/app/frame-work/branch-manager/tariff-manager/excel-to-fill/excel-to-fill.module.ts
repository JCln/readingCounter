import { NgModule } from '@angular/core';

import { ExcelToFillRoutingModule } from './excel-to-fill-routing.module';
import { ExcelToFillComponent } from './excel-to-fill.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [ExcelToFillComponent],
  imports: [
    SharedPrimeNgModule,
    ExcelToFillRoutingModule
  ]
})
export class ExcelToFillModule { }
