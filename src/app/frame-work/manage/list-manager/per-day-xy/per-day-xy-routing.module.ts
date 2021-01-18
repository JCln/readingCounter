import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PerDayXyComponent } from './per-day-xy.component';

const routes: Routes = [
  { path: '', component: PerDayXyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerDayXYRoutingModule { }
