import { NgModule } from '@angular/core';

import { InputOutputPolicyRoutingModule } from './input-output-policy-routing.module';
import { InputOutputPolicyComponent } from './input-output-policy.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [InputOutputPolicyComponent],
  imports: [
    SharedPrimeNgModule,
    InputOutputPolicyRoutingModule
  ]
})
export class InputOutputPolicyModule { }
