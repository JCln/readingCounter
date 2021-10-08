import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedChartsModule } from 'src/app/shared/shared-charts.module';
import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';

import { AnalyzeComponent } from './analyze/analyze.component';
import { BarAnlzPrfmComponent } from './bar-anlz-prfm/bar-anlz-prfm.component';
import { CountInStatesComponent } from './count-in-states/count-in-states.component';
import { DashEditCountComponent } from './dash-edit-count/dash-edit-count.component';
import { DashKarkardTableComponent } from './dash-karkard/dash-karkard-table/dash-karkard-table.component';
import { DashKarkardComponent } from './dash-karkard/dash-karkard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BarDispersalrateComponent } from './dispersal-rate/bar-dispersalrate/bar-dispersalrate.component';
import { DispersalRateComponent } from './dispersal-rate/dispersal-rate.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LineReadDailyComponent } from './line-read-daily/line-read-daily.component';
import { MediaComponent } from './media/media.component';
import { ReadTimeComponent } from './read-time/read-time.component';
import { RrTimeComponent } from './rr-time/rr-time.component';
import { TrvTimeComponent } from './trv-time/trv-time.component';
import { UserOverallComponent } from './user-overall/user-overall.component';
import { DashDateDifferenceComponent } from './dash-date-difference/dash-date-difference.component';
import { DashUnreadCountComponent } from './dash-unread-count/dash-unread-count.component';
import { DashMoshtarakCountComponent } from './dash-moshtarak-count/dash-moshtarak-count.component';


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
    DispersalRateComponent,
    BarDispersalrateComponent,
    UserOverallComponent,
    DashKarkardComponent,
    DashKarkardTableComponent,
    DashEditCountComponent,
    DashDateDifferenceComponent,
    DashUnreadCountComponent,
    DashMoshtarakCountComponent,
  ],
  imports: [
    CommonModule,
    SharedCollapseModule,
    SharedChartsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
