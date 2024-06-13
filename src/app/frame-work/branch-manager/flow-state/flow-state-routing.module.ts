import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowStateComponent } from './flow-state.component';

const routes: Routes = [
  { path: '', component: FlowStateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowStateRoutingModule { }
