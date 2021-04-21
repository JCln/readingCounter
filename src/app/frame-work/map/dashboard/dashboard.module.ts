import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedChartsModule } from 'src/app/shared/shared-charts.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AnalyzeComponent } from './analyze/analyze.component';
import { BarAnlzPrfmComponent } from './bar-anlz-prfm/bar-anlz-prfm.component';


@NgModule({
  declarations: [DashboardComponent, AnalyzeComponent, BarAnlzPrfmComponent],
  imports: [
    CommonModule,
    SharedChartsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
