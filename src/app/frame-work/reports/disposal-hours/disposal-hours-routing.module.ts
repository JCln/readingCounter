import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DisposalHoursResComponent } from './disposal-hours-res/disposal-hours-res.component';
import { DisposalHoursComponent } from './disposal-hours.component';

const routes: Routes = [
  {
    path: '', component: DisposalHoursComponent, children: [
      { path: 'res', component: DisposalHoursResComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisposalHoursRoutingModule { }
