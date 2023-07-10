import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { ExcelFileRoutingModule } from './excel-file-routing.module';
import { ExcelFileComponent } from './excel-file.component';


@NgModule({
  declarations: [
    ExcelFileComponent
  ],
  imports: [
    SharedModule,
    SharedPrimeNgModule,
    SharedThreeModule,
    ExcelFileRoutingModule
  ]
})
export class ExcelFileModule { }
