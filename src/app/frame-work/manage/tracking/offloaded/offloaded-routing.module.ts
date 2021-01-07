import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OffloadedComponent } from './offloaded.component';

const routes: Routes = [
  { path: '', component: OffloadedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffloadedRoutingModule { }
