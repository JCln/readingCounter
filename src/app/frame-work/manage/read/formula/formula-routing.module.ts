import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'ab', loadChildren: () => import('./water/water.module').then(water => water.WaterModule) },
  { path: 'budget', loadChildren: () => import('./budget/budget.module').then(budget => budget.BudgetModule) },
  { path: 'tabsare2', loadChildren: () => import('./tabsare2/tabsare2.module').then(tabsare2 => tabsare2.Tabsare2Module) },
  { path: 'tabsare3', loadChildren: () => import('./tabsare3/tabsare3.module').then(tabsare3 => tabsare3.Tabsare3Module) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormulaRoutingModule { }
