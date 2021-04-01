import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DisposalHoursComponent } from './disposal-hours.component';

const routes: Routes = [
  { path: '', component: DisposalHoursComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisposalHoursRoutingModule { }
