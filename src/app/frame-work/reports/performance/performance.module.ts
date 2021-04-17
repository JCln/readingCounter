import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { PerformanceRoutingModule } from './performance-routing.module';
import { PerformanceComponent } from './performance.component';


@NgModule({
  declarations: [PerformanceComponent],
  imports: [
    SharedModule,
    SharedThreeModule,
    PerformanceRoutingModule
  ]
})
export class PerformanceModule { }
