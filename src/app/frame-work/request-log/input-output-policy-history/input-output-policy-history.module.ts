import { NgModule } from '@angular/core';
import { InputOutputPolicyHistoryRoutingModule } from './input-output-policy-history-routing.module';
import { IOPolicyHistoryCompareComponent } from './io-policy-history-compare/io-policy-history-compare.component';
import { InputOutputPolicyHistoryComponent } from './input-output-policy-history.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    InputOutputPolicyHistoryComponent,
    IOPolicyHistoryCompareComponent
  ],
  imports: [
    SharedPrimeNgModule,
    InputOutputPolicyHistoryRoutingModule
  ]
})
export class InputOutputPolicyHistoryModule { }
