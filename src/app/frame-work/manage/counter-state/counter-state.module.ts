import { NgModule } from '@angular/core';

import { SharedPrimeNgModule } from './../../../shared/shared-prime-ng.module';
import { CounterStateRoutingModule } from './counter-state-routing.module';
import { CounterStateComponent } from './counter-state.component';


@NgModule({
  declarations: [CounterStateComponent],
  imports: [
    SharedPrimeNgModule,
    CounterStateRoutingModule
  ]
})
export class CounterStateModule { }
