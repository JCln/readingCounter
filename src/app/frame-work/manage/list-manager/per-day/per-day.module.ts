import { NgModule } from '@angular/core';

import { SharedPrimeNgModule } from './../../../../shared/shared-prime-ng.module';
import { PerDayRoutingModule } from './per-day-routing.module';
import { PerDayComponent } from './per-day.component';


@NgModule({
  declarations: [PerDayComponent],
  imports: [
    SharedPrimeNgModule,
    PerDayRoutingModule
  ]
})
export class PerDayModule { }
