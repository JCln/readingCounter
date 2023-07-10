import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OffloadedGroupComponent } from './offloaded-group.component';

const routes: Routes = [
  { path: '', component: OffloadedGroupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffloadedGroupRoutingModule { }
