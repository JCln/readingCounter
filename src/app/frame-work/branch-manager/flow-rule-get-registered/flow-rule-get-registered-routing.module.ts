import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowRuleGetRegisteredComponent } from './flow-rule-get-registered.component';

const routes: Routes = [
  { path: '', component: FlowRuleGetRegisteredComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowRuleGetRegisteredRoutingModule { }
