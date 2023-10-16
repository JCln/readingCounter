import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputOutputPolicyComponent } from './input-output-policy.component';

const routes: Routes = [
  { path: '', component: InputOutputPolicyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputOutputPolicyRoutingModule { }
