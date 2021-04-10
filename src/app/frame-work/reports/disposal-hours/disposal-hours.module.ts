import { NgModule } from '@angular/core';
import { SharedChartsModule } from 'src/app/shared/shared-charts.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { DisperseChartComponent } from './disperse-chart/disperse-chart.component';
import { DisposalHoursResComponent } from './disposal-hours-res/disposal-hours-res.component';
import { DisposalHoursRoutingModule } from './disposal-hours-routing.module';
import { DisposalHoursComponent } from './disposal-hours.component';


@NgModule({
  declarations: [DisposalHoursComponent, DisposalHoursResComponent, DisperseChartComponent],
  imports: [
    SharedPrimeNgModule,
    SharedThreeModule,
    SharedModule,
    SharedChartsModule,
    DisposalHoursRoutingModule
  ]
})
export class DisposalHoursModule { }
