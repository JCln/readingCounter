import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { PerDayRoutingModule } from './per-day-routing.module';
import { PerDayComponent } from './per-day.component';


@NgModule({
  declarations: [PerDayComponent],
  imports: [
    SharedModule,
    PerDayRoutingModule
  ]
})
export class PerDayModule { }
