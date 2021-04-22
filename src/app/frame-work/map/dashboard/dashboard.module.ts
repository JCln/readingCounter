import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedChartsModule } from 'src/app/shared/shared-charts.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AnalyzeComponent } from './analyze/analyze.component';
import { BarAnlzPrfmComponent } from './bar-anlz-prfm/bar-anlz-prfm.component';
import { ReadTimeComponent } from './read-time/read-time.component';
import { RrTimeComponent } from './rr-time/rr-time.component';
import { MediaComponent } from './media/media.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';


@NgModule({
  declarations: [DashboardComponent, AnalyzeComponent, BarAnlzPrfmComponent, ReadTimeComponent, RrTimeComponent, MediaComponent, ForbiddenComponent],
  imports: [
    CommonModule,
    SharedChartsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
