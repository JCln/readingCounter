import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IOPolicyHistoryCompareComponent } from './io-policy-history-compare/io-policy-history-compare.component';

const routes: Routes = [
  { path: '', component: IOPolicyHistoryCompareComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputOutputPolicyHistoryRoutingModule { }
