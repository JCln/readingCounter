import { NgModule } from '@angular/core';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';

import { PerDayRoutingModule } from './per-day-routing.module';
import { PerDayComponent } from './per-day.component';


@NgModule({
  declarations: [PerDayComponent],
  imports: [
    SharedTwoModule,
    PerDayRoutingModule
  ]
})
export class PerDayModule { }
