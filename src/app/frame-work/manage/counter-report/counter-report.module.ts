import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { CounterReportRoutingModule } from './counter-report-routing.module';
import { CounterReportComponent } from './counter-report.component';
import { CrAddDgComponent } from './cr-add-dg/cr-add-dg.component';
import { CrEditDgComponent } from './cr-edit-dg/cr-edit-dg.component';


@NgModule({
  declarations: [CounterReportComponent, CrAddDgComponent, CrEditDgComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CounterReportRoutingModule
  ]
})
export class CounterReportModule { }
