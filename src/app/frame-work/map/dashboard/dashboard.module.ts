import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedChartsModule } from 'src/app/shared/shared-charts.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AnalyzeComponent } from './analyze/analyze.component';


@NgModule({
  declarations: [DashboardComponent, AnalyzeComponent],
  imports: [
    CommonModule,
    SharedChartsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
