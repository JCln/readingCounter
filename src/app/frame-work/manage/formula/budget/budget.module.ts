import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetComponent } from './budget.component';


@NgModule({
  declarations: [BudgetComponent],
  imports: [
    SharedPrimeNgModule,
    BudgetRoutingModule
  ]
})
export class BudgetModule { }
