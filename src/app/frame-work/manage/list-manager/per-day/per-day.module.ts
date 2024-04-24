import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { PerDayRoutingModule } from './per-day-routing.module';
import { PerDayComponent } from './per-day.component';
import { PerDayPieComponent } from './per-day-pie/per-day-pie.component';
import { SharedChartsModule } from 'src/app/shared/shared-charts.module';


@NgModule({
  declarations: [PerDayComponent, PerDayPieComponent],
  imports: [
    SharedModule,
    SharedChartsModule,
    PerDayRoutingModule
  ]
})
export class PerDayModule { }
