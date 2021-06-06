import { NgModule } from '@angular/core';
import { SharedChartsModule } from 'src/app/shared/shared-charts.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { AnalyzeComponent } from './analyze/analyze.component';
import { BarAnlzPrfmComponent } from './bar-anlz-prfm/bar-anlz-prfm.component';
import { CountInStatesComponent } from './count-in-states/count-in-states.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { KarkardGridComponent } from './karkard-grid/karkard-grid.component';
import { LineReadDailyComponent } from './line-read-daily/line-read-daily.component';
import { MediaComponent } from './media/media.component';
import { ReadTimeComponent } from './read-time/read-time.component';
import { RrTimeComponent } from './rr-time/rr-time.component';
import { TrvTimeComponent } from './trv-time/trv-time.component';
import { DispersalRateComponent } from './dispersal-rate/dispersal-rate.component';
import { BarDispersalrateComponent } from './dispersal-rate/bar-dispersalrate/bar-dispersalrate.component';


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
    KarkardGridComponent,
    DispersalRateComponent,
    BarDispersalrateComponent,
  ],
  imports: [
    SharedPrimeNgModule,
    SharedChartsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
