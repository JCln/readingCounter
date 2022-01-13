import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { ExcelBuilderRoutingModule } from './excel-builder-routing.module';
import { ExcelBuilderComponent } from './excel-builder.component';


@NgModule({
  declarations: [
    ExcelBuilderComponent
  ],
  imports: [
    SharedPrimeNgModule,
    ExcelBuilderRoutingModule
  ]
})
export class ExcelBuilderModule { }
