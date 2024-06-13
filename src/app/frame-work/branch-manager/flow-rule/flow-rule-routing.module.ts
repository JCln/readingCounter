import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowRuleComponent } from './flow-rule.component';

const routes: Routes = [
  { path: '', component: FlowRuleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowRuleRoutingModule { }
