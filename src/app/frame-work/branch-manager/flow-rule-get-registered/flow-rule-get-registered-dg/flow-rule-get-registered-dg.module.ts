import { NgModule } from '@angular/core';

import { FlowRuleGetRegisteredDgRoutingModule } from './flow-rule-get-registered-dg-routing.module';
import { FlowRuleGetRegisteredDgComponent } from './flow-rule-get-registered-dg.component';
import { RegisteredCalculatedComponent } from './registered-calculated/registered-calculated.component';
import { RegisteredConfirmationComponent } from './registered-confirmation/registered-confirmation.component';
import { RegisteredEditComponent } from './registered-edit/registered-edit.component';
import { RegisteredExtrasComponent } from './registered-extras/registered-extras.component';
import { RegisteredInstallmentComponent } from './registered-installment/registered-installment.component';
import { RegisteredRecalcComponent } from './registered-recalc/registered-recalc.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    FlowRuleGetRegisteredDgComponent,
    RegisteredEditComponent,
    RegisteredCalculatedComponent,
    RegisteredExtrasComponent,
    RegisteredInstallmentComponent,
    RegisteredRecalcComponent,
    RegisteredConfirmationComponent
  ],
  imports: [
    SharedPrimeNgModule,
    FlowRuleGetRegisteredDgRoutingModule
  ]
})
export class FlowRuleGetRegisteredDgModule { }
