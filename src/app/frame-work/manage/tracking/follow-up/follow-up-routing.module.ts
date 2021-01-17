import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FollowUpComponent } from './follow-up.component';

const routes: Routes = [
  { path: '', component: FollowUpComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FollowUpRoutingModule { }
