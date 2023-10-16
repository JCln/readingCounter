import { NgModule } from '@angular/core';

import { InputOutputPolicyRoutingModule } from './input-output-policy-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputOutputPolicyComponent } from './input-output-policy.component';


@NgModule({
  declarations: [InputOutputPolicyComponent],
  imports: [
    SharedModule,
    InputOutputPolicyRoutingModule
  ]
})
export class InputOutputPolicyModule { }
