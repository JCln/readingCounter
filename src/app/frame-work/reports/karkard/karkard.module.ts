import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { RouteReuseStrategyService } from 'src/app/services/route-reuse-strategy.service';
import { SharedChartsModule } from 'src/app/shared/shared-charts.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { KarkardChartComponent } from './karkard-chart/karkard-chart.component';
import { KarkardResComponent } from './karkard-res/karkard-res.component';
import { KarkardRoutingModule } from './karkard-routing.module';
import { KarkardComponent } from './karkard.component';

@NgModule({
  declarations: [KarkardComponent, KarkardResComponent, KarkardChartComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedThreeModule,
    SharedChartsModule,
    KarkardRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: RouteReuseStrategyService }
  ]
})
export class KarkardModule { }
