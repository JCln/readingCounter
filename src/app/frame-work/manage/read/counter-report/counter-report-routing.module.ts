import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CounterReportComponent } from './counter-report.component';

const routes: Routes = [
  { path: '', component: CounterReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounterReportRoutingModule { }
