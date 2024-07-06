import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisteredCalculatedComponent } from './registered-calculated/registered-calculated.component';
import { RegisteredEditComponent } from './registered-edit/registered-edit.component';
import { RegisteredExtrasComponent } from './registered-extras/registered-extras.component';
import { RegisteredInstallmentComponent } from './registered-installment/registered-installment.component';
import { RegisteredRecalcComponent } from './registered-recalc/registered-recalc.component';
import { RegisteredConfirmationComponent } from './registered-confirmation/registered-confirmation.component';
import { FlowRuleGetRegisteredDgComponent } from './flow-rule-get-registered-dg.component';

const routes: Routes = [
  {
    path: '', component: FlowRuleGetRegisteredDgComponent
  },
  // , children: [
  //   { path: '', component: RegisteredEditComponent, pathMatch: 'full' },
  //   { path: 'edit', component: RegisteredEditComponent },
  //   { path: 'calculated', component: RegisteredCalculatedComponent },
  //   { path: 'extras', component: RegisteredExtrasComponent },
  //   { path: 'installment', component: RegisteredInstallmentComponent },
  //   { path: 'reCalc', component: RegisteredRecalcComponent },
  //   { path: 'confirmation', component: RegisteredConfirmationComponent },
  // ]
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowRuleGetRegisteredDgRoutingModule { }
