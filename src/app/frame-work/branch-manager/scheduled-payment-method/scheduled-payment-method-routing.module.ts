import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduledPaymentMethodComponent } from './scheduled-payment-method.component';

const routes: Routes = [
  { path: '', component: ScheduledPaymentMethodComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduledPaymentMethodRoutingModule { }
