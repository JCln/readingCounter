import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { NgModule } from '@angular/core';

import { PolicyHistoryRoutingModule } from './policy-history-routing.module';
import { PolicyHistoryComponent } from './policy-history.component';


@NgModule({
  declarations: [
    PolicyHistoryComponent
  ],
  imports: [
    SharedPrimeNgModule,
    PolicyHistoryRoutingModule
  ]
})
export class PolicyHistoryModule { }
