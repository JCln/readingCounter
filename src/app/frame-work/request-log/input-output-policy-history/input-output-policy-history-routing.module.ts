import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputOutputPolicyHistoryComponent } from './input-output-policy-history.component';

const routes: Routes = [
  { path: '', component: InputOutputPolicyHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputOutputPolicyHistoryRoutingModule { }
