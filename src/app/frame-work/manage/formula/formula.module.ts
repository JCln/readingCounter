import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { AddExcelFileComponent } from './add-excel-file/add-excel-file.component';
import { FormulaRoutingModule } from './formula-routing.module';
import { WaterAddDgComponent } from './water/water-add-dg/water-add-dg.component';


@NgModule({
  declarations: [AddExcelFileComponent, WaterAddDgComponent],
  imports: [
    SharedModule,
    SharedTwoModule,
    SharedThreeModule,
    ReactiveFormsModule,
    FormulaRoutingModule
  ]
})
export class FormulaModule { }
