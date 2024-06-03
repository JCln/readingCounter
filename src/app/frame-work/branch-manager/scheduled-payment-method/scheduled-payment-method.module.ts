import { NgModule } from '@angular/core';

import { ScheduledPaymentMethodRoutingModule } from './scheduled-payment-method-routing.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { ScheduledPaymentMethodComponent } from './scheduled-payment-method.component';
import { ScheduledPaymentMethodDgComponent } from './scheduled-payment-method-dg/scheduled-payment-method-dg.component';


@NgModule({
  declarations: [
    ScheduledPaymentMethodComponent,
    ScheduledPaymentMethodDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    ScheduledPaymentMethodRoutingModule
  ]
})
export class ScheduledPaymentMethodModule { }
