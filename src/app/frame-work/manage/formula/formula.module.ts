import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SharedThreeModule } from './../../../shared/shared_three.module';
import { AddExcelFileComponent } from './add-excel-file/add-excel-file.component';
import { BudgetAddDgComponent } from './budget/budget-add-dg/budget-add-dg.component';
import { FormulaRoutingModule } from './formula-routing.module';
import { Tabsare2AddDgComponent } from './tabsare2/tabsare2-add-dg/tabsare2-add-dg.component';
import { Tabsare3AddDgComponent } from './tabsare3/tabsare3-add-dg/tabsare3-add-dg.component';
import { WaterAddDgComponent } from './water/water-add-dg/water-add-dg.component';


@NgModule({
  declarations: [
    AddExcelFileComponent,
    BudgetAddDgComponent,
    Tabsare2AddDgComponent,
    Tabsare3AddDgComponent,
    WaterAddDgComponent
  ],
  imports: [
    SharedModule,
    SharedTwoModule,
    SharedThreeModule,
    ReactiveFormsModule,
    FormulaRoutingModule
  ]
})
export class FormulaModule { }
