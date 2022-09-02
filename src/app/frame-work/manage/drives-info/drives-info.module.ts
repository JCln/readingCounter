import { NgModule } from '@angular/core';
import { SharedChartsModule } from 'src/app/shared/shared-charts.module';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';

import { DriveInfoPieComponent } from './drive-info-pie/drive-info-pie.component';
import { DrivesInfoRoutingModule } from './drives-info-routing.module';
import { DrivesInfoComponent } from './drives-info.component';


@NgModule({
  declarations: [
    DrivesInfoComponent,
    DriveInfoPieComponent,
  ],
  imports: [
    SharedTwoModule,
    SharedChartsModule,
    DrivesInfoRoutingModule
  ]
})
export class DrivesInfoModule { }
