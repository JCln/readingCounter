import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { CounterStateRoutingModule } from './counter-state-routing.module';
import { CounterStateComponent } from './counter-state.component';
import { CounterStateAddDgComponent } from './counter-state-add-dg/counter-state-add-dg.component';
import { CounterStateEditDgComponent } from './counter-state-edit-dg/counter-state-edit-dg.component';


@NgModule({
  declarations: [CounterStateComponent, CounterStateAddDgComponent, CounterStateEditDgComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CounterStateRoutingModule
  ]
})
export class CounterStateModule { }
