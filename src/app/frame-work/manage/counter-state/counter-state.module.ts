import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { CounterStateRoutingModule } from './counter-state-routing.module';
import { CounterStateComponent } from './counter-state.component';


@NgModule({
  declarations: [CounterStateComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CounterStateRoutingModule
  ]
})
export class CounterStateModule { }
