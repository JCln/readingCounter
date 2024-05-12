import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterNumberChangeComponent } from './counter-number-change.component';

const routes: Routes = [
  { path: '', component: CounterNumberChangeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounterNumberChangeRoutingModule { }
