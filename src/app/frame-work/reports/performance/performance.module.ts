import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { PerformanceRoutingModule } from './performance-routing.module';
import { PerformanceComponent } from './performance.component';


@NgModule({
  declarations: [PerformanceComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedThreeModule,
    PerformanceRoutingModule
  ]
})
export class PerformanceModule { }
