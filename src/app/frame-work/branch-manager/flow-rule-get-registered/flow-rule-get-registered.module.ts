import { NgModule } from '@angular/core';

import { FlowRuleGetRegisteredRoutingModule } from './flow-rule-get-registered-routing.module';
import { FlowRuleGetRegisteredComponent } from './flow-rule-get-registered.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    FlowRuleGetRegisteredComponent
  ],
  imports: [
    SharedPrimeNgModule,
    FlowRuleGetRegisteredRoutingModule
  ]
})
export class FlowRuleGetRegisteredModule { }
