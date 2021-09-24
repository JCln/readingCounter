import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DmAnalysisComponent } from './dm-analysis.component';

const routes: Routes = [
  { path: '', component: DmAnalysisComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DmAnalysisRoutingModule { }
