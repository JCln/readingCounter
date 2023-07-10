import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SharedChartsModule } from 'src/app/shared/shared-charts.module';
import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';

import { AnalyzeComponent } from './analyze/analyze.component';
import { BarAnlzPrfmComponent } from './bar-anlz-prfm/bar-anlz-prfm.component';
import { CountInStatesComponent } from './count-in-states/count-in-states.component';
import { DashAttemptComponent } from './dash-attempt/dash-attempt.component';
import { DashDateDiffUncloseComponent } from './dash-date-diff-unclose/dash-date-diff-unclose.component';
import { DashDateDifferenceComponent } from './dash-date-difference/dash-date-difference.component';
import { DashEditCountComponent } from './dash-edit-count/dash-edit-count.component';
import { DashErrorCountComponent } from './dash-error-count/dash-error-count.component';
import { DashKarkardTableComponent } from './dash-karkard/dash-karkard-table/dash-karkard-table.component';
import { DashKarkardComponent } from './dash-karkard/dash-karkard.component';
import { DashLockedComponent } from './dash-locked/dash-locked.component';
import { DashMoshtarakCountComponent } from './dash-moshtarak-count/dash-moshtarak-count.component';
import { DashNotReaderComponent } from './dash-not-reader/dash-not-reader.component';
import { DashPackAverageComponent } from './dash-pack-average/dash-pack-average.component';
import { DashShownReadingsComponent } from './dash-shown-readings/dash-shown-readings.component';
import { DashUnreadCountComponent } from './dash-unread-count/dash-unread-count.component';
import { DashXyComponent } from './dash-xy/dash-xy.component';
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
import { DashRequestLogCountComponent } from './dash-request-log-count/dash-request-log-count.component';
import { DashRequestRateComponent } from './dash-request-rate/dash-request-rate.component';
import { DashQueryRateComponent } from './dash-query-rate/dash-query-rate.component';
import { DashQueryCountComponent } from './dash-query-count/dash-query-count.component';


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
    DashShownReadingsComponent,
    DashNotReaderComponent,
    DashErrorCountComponent,
    DashLockedComponent,
    DashPackAverageComponent,
    DashAttemptComponent,
    DashXyComponent,
    DashDateDiffUncloseComponent,
    DashRequestLogCountComponent,
    DashRequestRateComponent,
    DashQueryRateComponent,
    DashQueryCountComponent,
  ],
  imports: [
    CommonModule,
    SharedCollapseModule,
    SharedChartsModule,
    DropdownModule,
    FormsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
