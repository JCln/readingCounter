import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LatestReadsComponent } from './latest-reads.component';

const routes: Routes = [
  { path: '', component: LatestReadsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LatestReadsRoutingModule { }
