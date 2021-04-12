import { NgModule } from '@angular/core';
import { SharedChartsModule } from 'src/app/shared/shared-charts.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { TraverseDifferentialRoutingModule } from './traverse-differential-routing.module';
import { TraverseDifferentialComponent } from './traverse-differential.component';
import { TrvchResComponent } from './trvch-res/trvch-res.component';
import { TrvchChartComponent } from './trvch-chart/trvch-chart.component';


@NgModule({
  declarations: [TraverseDifferentialComponent, TrvchResComponent, TrvchChartComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedThreeModule,
    SharedChartsModule,
    TraverseDifferentialRoutingModule
  ]
})
export class TraverseDifferentialModule { }
