import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CounterStateComponent } from './counter-state.component';

const routes: Routes = [
  { path: '', component: CounterStateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounterStateRoutingModule { }
