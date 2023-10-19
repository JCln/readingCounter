import { NgModule } from '@angular/core';

import { LogMemoryStatusRoutingModule } from './log-memory-status-routing.module';
import { LogMemoryStatusComponent } from './log-memory-status.component';
import { LogMemoryStatusPieComponent } from './log-memory-status-pie/log-memory-status-pie.component';
import { SharedChartsModule } from 'src/app/shared/shared-charts.module';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';


@NgModule({
  declarations: [
    LogMemoryStatusComponent,
    LogMemoryStatusPieComponent
  ],
  imports: [
    SharedTwoModule,
    SharedChartsModule,
    LogMemoryStatusRoutingModule
  ]
})
export class LogMemoryStatusModule { }
