import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExcelToFillRoutingModule } from './excel-to-fill-routing.module';
import { ExcelToFillComponent } from './excel-to-fill.component';


@NgModule({
  declarations: [ExcelToFillComponent],
  imports: [
    CommonModule,
    ExcelToFillRoutingModule
  ]
})
export class ExcelToFillModule { }
