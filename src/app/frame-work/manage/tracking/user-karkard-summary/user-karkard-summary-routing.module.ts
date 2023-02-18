import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserKarkardSummaryComponent } from './user-karkard-summary.component';

const routes: Routes = [
  { path: '', component: UserKarkardSummaryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserKarkardSummaryRoutingModule { }
