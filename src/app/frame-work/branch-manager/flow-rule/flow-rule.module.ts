import { NgModule } from '@angular/core';

import { FlowRuleRoutingModule } from './flow-rule-routing.module';
import { FlowRuleDgComponent } from './flow-rule-dg/flow-rule-dg.component';
import { FlowRuleComponent } from './flow-rule.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    FlowRuleComponent,
    FlowRuleDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    FlowRuleRoutingModule
  ]
})
export class FlowRuleModule { }
