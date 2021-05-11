import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetComponent } from './budget.component';


@NgModule({
  declarations: [BudgetComponent],
  imports: [
    CommonModule,
    BudgetRoutingModule
  ]
})
export class BudgetModule { }
