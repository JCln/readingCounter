import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { RrDynamicReportRoutingModule } from './rr-dynamic-report-routing.module';
import { RrDynamicReportComponent } from './rr-dynamic-report.component';


@NgModule({
  declarations: [
    RrDynamicReportComponent
  ],
  imports: [
    SharedPrimeNgModule,
    RrDynamicReportRoutingModule
  ]
})
export class RrDynamicReportModule { }
