import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedChartsModule } from 'src/app/shared/shared-charts.module';

import { AnalyzeComponent } from './analyze/analyze.component';
import { BarAnlzPrfmComponent } from './bar-anlz-prfm/bar-anlz-prfm.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LineReadDailyComponent } from './line-read-daily/line-read-daily.component';
import { MediaComponent } from './media/media.component';
import { ReadTimeComponent } from './read-time/read-time.component';
import { RrTimeComponent } from './rr-time/rr-time.component';
import { TrvTimeComponent } from './trv-time/trv-time.component';
import { CountInStatesComponent } from './count-in-states/count-in-states.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AnalyzeComponent,
    BarAnlzPrfmComponent,
    ReadTimeComponent,
    RrTimeComponent,
    MediaComponent,
    ForbiddenComponent,
    LineReadDailyComponent,
    TrvTimeComponent,
    CountInStatesComponent,
  ],
  imports: [
    CommonModule,
    SharedChartsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
