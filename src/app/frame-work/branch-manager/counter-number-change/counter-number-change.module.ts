import { NgModule } from '@angular/core';

import { CounterNumberChangeRoutingModule } from './counter-number-change-routing.module';
import { CounterNumberChangeDgComponent } from './counter-number-change-dg/counter-number-change-dg.component';
import { CounterNumberChangeComponent } from './counter-number-change.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    CounterNumberChangeComponent,
    CounterNumberChangeDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    CounterNumberChangeRoutingModule
  ]
})
export class CounterNumberChangeModule { }
