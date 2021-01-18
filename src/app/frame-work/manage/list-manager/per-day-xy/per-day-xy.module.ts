import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerDayXYRoutingModule } from './per-day-xy-routing.module';
import { PerDayXyComponent } from './per-day-xy.component';


@NgModule({
  declarations: [PerDayXyComponent],
  imports: [
    CommonModule,
    PerDayXYRoutingModule
  ]
})
export class PerDayXYModule { }
