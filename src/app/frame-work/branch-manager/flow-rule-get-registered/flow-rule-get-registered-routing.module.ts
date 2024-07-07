import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowRuleGetRegisteredComponent } from './flow-rule-get-registered.component';

const routes: Routes = [
  { path: '', component: FlowRuleGetRegisteredComponent },
  { path: 'steps', loadChildren: () => import('./flow-rule-get-registered-dg/flow-rule-get-registered-dg.module').then(registeredStepperEdit => registeredStepperEdit.FlowRuleGetRegisteredDgModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowRuleGetRegisteredRoutingModule { }
