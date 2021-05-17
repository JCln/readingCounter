import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BudgetComponent } from './budget.component';

const routes: Routes = [
  { path: '', component: BudgetComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
