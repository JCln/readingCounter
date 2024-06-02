import { NgModule } from '@angular/core';

import { ScheduledPaymentMethodRoutingModule } from './scheduled-payment-method-routing.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { ScheduledPaymentMethodComponent } from './scheduled-payment-method.component';


@NgModule({
  declarations: [
    ScheduledPaymentMethodComponent
  ],
  imports: [
    SharedPrimeNgModule,
    ScheduledPaymentMethodRoutingModule
  ]
})
export class ScheduledPaymentMethodModule { }
