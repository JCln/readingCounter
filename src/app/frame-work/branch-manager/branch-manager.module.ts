import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchManagerRoutingModule } from './branch-manager-routing.module';
import { TariffTypeDgComponent } from './tariff-type/tariff-type-dg/tariff-type-dg.component';
import { ScheduledPaymentMethodDgComponent } from './scheduled-payment-method/scheduled-payment-method-dg/scheduled-payment-method-dg.component';
@NgModule({
  declarations: [
    TariffTypeDgComponent,
    ScheduledPaymentMethodDgComponent
  ],
  imports: [
    CommonModule,
    BranchManagerRoutingModule
  ]
})
export class BranchManagerModule { }
