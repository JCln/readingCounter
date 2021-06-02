import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { CounterReportRoutingModule } from './counter-report-routing.module';
import { CounterReportComponent } from './counter-report.component';
import { CrAddDgComponent } from './cr-add-dg/cr-add-dg.component';


@NgModule({
  declarations: [CounterReportComponent, CrAddDgComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    CounterReportRoutingModule
  ]
})
export class CounterReportModule { }
