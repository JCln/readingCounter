import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RrDynamicReportComponent } from './rr-dynamic-report.component';

const routes: Routes = [
  { path: '', component: RrDynamicReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RrDynamicReportRoutingModule { }
