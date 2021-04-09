import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PerDayComponent } from './per-day.component';

const routes: Routes = [
  { path: '', component: PerDayComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerDayRoutingModule { }
